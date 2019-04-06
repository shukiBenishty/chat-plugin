import MongooseModels from "../../mongooseModels";
import { userLoader, chatRoomLoader } from "../dataLoader";

const Message = MongooseModels('Message');
const ChatRoom = MongooseModels('ChatRoom');

export default {
    __isTypeOf: (obj) => {
      if( obj.subscribers )
        return "ChatRoom";
      return null;
    },
    messages: (paerent ,args, {session}) => {
        return Message.find({
          destination: paerent.id
        }) 
    },
    subscribers: async(paerent ,args, {session}) => {
      try {
        let chatRoom = await chatRoomLoader.load(paerent.id.toString() )
        return userLoader.loadMany( chatRoom.subscribers.map( s => s._id.toString() ))
      } catch (error) {
        return new Error(error)
      }
    }
  }