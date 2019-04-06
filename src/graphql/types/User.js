import { userLoader, chatRoomLoader } from "../dataLoader";
import MongooseModels from "../../mongooseModels";


const User = MongooseModels('User');

export default {
  contacts: async(paerent ,args, {session}) => {
      try {
        let user = await userLoader.load(paerent.id.toString());
        return userLoader.loadMany( user.contacts.map( c => c._id.toString() ))
      } catch (error) {
        return new Error(error)
      }
    },
    chatRooms: async(paerent ,args, {session}) => {
      try {
        let user = await userLoader.load(paerent.id.toString());
        return chatRoomLoader.loadMany( user.chatRooms.map( c => c._id.toString() ))        
      } catch (error) {
        return new Error(error)
      }
    }
  }