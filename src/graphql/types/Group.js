import MongooseModels from "../../mongooseModels";
import { userLoader, groupLoader } from "../dataLoader";

const Message = MongooseModels('Message');
const Group = MongooseModels('Group');

export default {
    __isTypeOf: (obj) => {
      if( obj.subscribers )
        return "Group";
      return null;
    },
    messages: (paerent ,args, {session}) => {
        return Message.find({
          destination: paerent.id
        }) 
    },
    subscribers: async(paerent ,args, {session}) => {
      try {
        let group = await groupLoader.load(paerent.id.toString() )
        return userLoader.loadMany( group.subscribers.map( s => s._id.toString() ))
      } catch (error) {
        return new Error(error)
      }
    }
  }