import { userLoader, messageLoader } from "./dataLoader";
import MongooseModels from "../mongooseModels";
import { forEach } from "iterall";

const User = MongooseModels('User');
const Message = MongooseModels('Message');

export default {
    me: (_,args, {session}) => {
      return userLoader.load(session.userId);
    },
    message: (_,args) => {
      return messageLoader.load(args.messageId);
    },
    contact: (_,{contactId}, {session}) => {
      return userLoader.load(contactId);
    },
    group: (_,{groupId}, {session}) => {
      return groupLoader.load(groupId);
    },
    contacts: async (_,args, {session}) => {
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