import MongooseModels from "../mongooseModels";
import { pubsub } from "./Subscription";
import subscribers from "./subscribers";

const User = MongooseModels('User');
const Message = MongooseModels('Message');
const Group = MongooseModels('Group')



const sendMessage =  async (parent, args, {session, groupLoader, messageLoader}) => {

  let group = await groupLoader.load(args.destination);
  let destModel = group ? "Group" : "User";
  let message = new Message({
    author: session.userId,
    data: args.message,
    destination: args.destination,
    destinationModel: destModel
  });

  if(subscribers.getItem(args.destination)){
    message.received = true;
  }

  message = await message.save();
  message = await messageLoader.load( message.id.toString() );
  
  let dest = [];
  if (destModel === "User") {
    dest.push(args.destination);
  } else {
    let _id = '';
    group.subscribers.forEach(s => {
      _id = `${s.id}`;
      if (_id  !== session.userId) {
        dest.push(_id)    
      }
    });
  }
  let publish = { generalInfo: { newMessage: message, destination: dest }};
  pubsub.publish(args.destination, publish);

  return message;
}


const addContact = async (parent, args, {session, userLoader}) => {
  let user = await User.findOne({ _id: session.userId, contacts: args.contactId });

  if (!user) {
    user =  await userLoader.load(session.userId);
    user.contacts.push(args.contactId);
    user = await user.save();
    userLoader.prime(`${user.id}`, user);
    let contact =  await userLoader.load(args.contactId);
    contact.contacts.push(session.userId);
    contact = await contact.save();
    userLoader.prime(`${contact.id}`, contact);
    pubsub.publish(args.contactId, { generalInfo: { newContact: user, destination: args.contactId }});
    pubsub.publish(session.userId, { generalInfo: { newContact: contact, destination: session.userId }});
  }

  return userLoader.load(args.contactId);;
} 

const createGroup = async (parent, {name, picture, subscribers}, {session, userLoader, groupLoader}) => {
  let user = await userLoader.load(session.userId);
  if (!user.admin) {
    return;
  }
  subscribers = (subscribers && subscribers.push(session.userId) && subscribers) || [session.userId]
  let group = new Group({name, picture, subscribers});
  await group.save();
  groupLoader.prime(`${group.id}`, group);

  await User.updateMany( {_id: { $in: subscribers }}, { 
    $push: { groups: group.id }
  });
 
  subscribers.forEach(s => {
      pubsub.publish(s, { generalInfo: { newGroup: group, destination: s }});
  })

  let users = await User.find({_id: { $in: subscribers }})
  users.forEach(user => {
    userLoader.prime(`${user.id}`, user)
  });

  return group;
} 

const editGroup = async (parent, args, {session, userLoader, groupLoader}) => {
  try {
    let user = await userLoader.load(session.userId);
    if (!user.admin) {
      return;
    }
    let group = await groupLoader.load(args.groupId);
    if (!group) {
      return;
    }
    let updatedUsers = [];
    let users;
    if (args.unsubscribers && args.unsubscribers.length) {
      console.log("unsubscribers", args.unsubscribers);
      await Group.updateOne( {_id: group.id}, { 
        $pull: { subscribers: { $in: args.unsubscribers } }
      })
      await User.updateMany( {_id: { $in: args.unsubscribers }}, { 
        $pull: { groups: group.id }
      })
      users = await User.find({_id: { $in: args.unsubscribers }})
      console.log("users", users);
      updatedUsers = updatedUsers.concat(users);
      console.log("updatedUsers", updatedUsers);
    }
    if (args.subscribers && args.subscribers.length) {
      console.log("subscribers", args.subscribers);
      await Group.updateOne( {_id: group.id}, { 
        $push: { subscribers: {$each : args.subscribers} }
      })
      await User.updateMany( {_id: { $in: args.subscribers }}, { 
        $push: { groups: group.id }
      })
      args.subscribers.forEach(s => {
        pubsub.publish(s, { generalInfo: { newGroup: group, destination: s }});
      })
  
      users = await User.find({_id: { $in: args.subscribers }})
      console.log("users2", users);

      updatedUsers = updatedUsers.concat(users);
      console.log("updatedUsers", updatedUsers);
    }
    updatedUsers.forEach(user => {
      userLoader.prime(`${user.id}`, user)
    });

    group =  Group.findById(group.id).populate('subscribers');
    groupLoader.prime(`${group.id}`, group);
    return groupLoader.load(args.groupId);
  } catch (err) {
    console.error(err);
  }
} 

const readMassage = async (parent, args, {session, messageLoader}) => {
  let message = await messageLoader.load(args.messageId);
  if (message.destination.id !== session.userId) {
    return null;  
  }
  message.readed = true;
  message = await message.save();

  pubsub.publish(`${message.author.id}`, {generalInfo: { readed: message, destination: message.author.id}});
  
  return message;
}

const typing = async (parent, args, {session, userLoader}) => {
  let user =  await userLoader.load(session.userId)

  //you cnot join this pubsub.publish because the subscription filter not send מeither to client
  pubsub.publish(`${session.userId}`, { generalInfo: { typing: user, destination: args.destination} });
  pubsub.publish(`${session.userId}`, { generalInfo: { typingForMe: user,  destination: args.destination} });
  return true;
}

const online = async (parent, args, {session, userLoader}) => {
  let user = await userLoader.load(session.userId);
  pubsub.publish(`${session.userId}`, { generalInfo: { online: user } });
  return true;
}

export default {
    sendMessageText: sendMessage,
    sendMessageEmoji: sendMessage,
    sendMessageFile: sendMessage,
    createGroup: createGroup,
    addContact: addContact,
    editGroup: editGroup,
    readMassage: readMassage,
    typing:  typing,
    online: online
  }