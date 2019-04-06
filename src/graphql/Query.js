import { userLoader, messageLoader } from "./dataLoader";
import MongooseModels from "../mongooseModels";

const User = MongooseModels('User');
const Message = MongooseModels('Message');

export default {
    me: async (_,args, {session}) => {
      return userLoader.load(session.userId);
    },
    message: (_,args) => {
      return messageLoader.load(args.messageId);
    },
    contact: (_,{contactId}, {session}) => {
      return userLoader.load(contactId);
    },
    // messages: async (_,args) => {
    //   try {
    //     let messages = await Message.find({}).populate("author").populate("destination");
    //     messages.forEach(messages => {
    //       messageLoader.prime(`${messages.id}`, messages)
    //     })
    //     return messages;
    //   } catch (error) {
    //     return new Error(error)
    //   }
    // },
    
  }


  const getEdges = (messages, startCursor, endCursor) => {
    return 
    // return [];
  }