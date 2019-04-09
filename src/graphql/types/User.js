import { userLoader, chatRoomLoader } from "../dataLoader";
import MongooseModels from "../../mongooseModels";


const User = MongooseModels('User');

export default {
  contacts: async(paerent ,args, {session}) => {
      try {
        let user = await userLoader.load(paerent.id.toString());
        let users = await userLoader.loadMany( user.contacts.map( c => c._id.toString() ))

        let startCursor = '';
        let endCursor = '';
        let edges = users.map(contact => {
          startCursor = startCursor || `${contact.id}`;
          endCursor = `${endCursor.id}`;
          return {
            cursor: `${contact.id}`,
            node: contact
          }
        });
        return {
          edges: edges,
          totalCount: edges.length,
          pageInfo: {
            startCursor: startCursor,
            endCursor: endCursor,
            hasNextPage: false
          }
        }
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