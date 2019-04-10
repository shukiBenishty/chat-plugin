import MongooseModels from "../mongooseModels";
import { pubsub } from "./Subscription";
import subscribers from "./subscribers";
import { userLoader, groupLoader, messageLoader } from "./dataLoader";

const User = MongooseModels('User');
const Message = MongooseModels('Message');
const Group = MongooseModels('Group')



const sendMessage =  async (parent, args, {session}) => {

  let publish = {};

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
  
  if (destModel === "User") {
    let user = await userLoader.load(session.userId);
    publish.generalInfo = { newMessage: message, destination: args.destination}
  }
  publish.personalMessageSent = message;

  pubsub.publish(args.destination, publish);
  

  return message;
}


const addContact = async (parent, args, {session}) => {
  let user = await User.findById(session.userId).findOne({contact: args.contactId});

  if (!user) {
    user =  await userLoader.load(session.userId);
    user.contacts.push(args.contactId);
    user = await user.save();
  }

  return user;
} 

const readMassage = async (parent, args, {session}) => {
  let message = await messageLoader.load(args.messageId);
  if (message.destination.id !== session.userId) {
    return null;  
  }
  message.readed = true;
  message = await message.save();

  pubsub.publish(`${message.author.id}`, {generalInfo: { readed: message, destination: message.author.id}});
  
  return message;
}

const typing = async (parent, args, {session}) => {
  let user =  await userLoader.load(session.userId)

  //you cnot join this pubsub.publish because the subscription filter not send מeither to client
  pubsub.publish(`${session.userId}`, { generalInfo: { typing: user, destination: args.destination} });
  pubsub.publish(`${session.userId}`, { generalInfo: { typingForMe: user,  destination: args.destination} });
  return true;
}

const online = async (parent, args, {session}) => {
  let user = await userLoader.load(session.userId);
  pubsub.publish(`${session.userId}`, { generalInfo: { online: user } });
  return true;
}

export default {
    sendMessageText: sendMessage,
    sendMessageEmoji: sendMessage,
    sendMessageFile: sendMessage,
    addContact: addContact,
    readMassage: readMassage,
    typing:  typing,
    online: online
  }