
import MongooseModels from "../mongooseModels";


const User = MongooseModels('User');
const Message = MongooseModels('Message');

export default {
    me: (_,args, {session, userLoader}) => {
      return userLoader.load(session.userId);
    },
    message: (_,args, {messageLoader}) => {
      return messageLoader.load(args.messageId);
    },
    contact: (_,{contactId}, {session, userLoader}) => {
      return userLoader.load(contactId);
    },
    group: (_,{groupId}, {session, groupLoader}) => {
      return groupLoader.load(groupId);
    },
    contacts: async (_,{all}, {session, userLoader}) => {
      if (all) {
        let users = await User.find({ _id: { $nin: [`${session.userId}`] } })
        users.forEach(u => {
          userLoader.prime(`${u.id}`, u);
        });
        return users;
      }
      let user = await userLoader.load(session.userId.toString());
      let myContacts = await userLoader.loadMany( user.contacts.map( c => c._id.toString() ))
      let userIds = myContacts.map(u => `${u.id}`)
      userIds.push(`${session.userId}`)
      let users = await User.find({ _id: { $nin: userIds } })
      users.forEach(u => {
        userLoader.prime(`${u.id}`, u);
      });
      return users;
    } 
  }