import MongooseModels from "../../mongooseModels";


const Message = MongooseModels('Message');
const ChatRoom = MongooseModels('ChatRoom')


export default { 
    // author: async(paerent ,args, {session}) => {
    //   try {
    //     let message = await Message.findById(paerent.id).populate("author"); 
    //     return message.author;
    //   } catch (error) {
    //     return new Error(error)
    //   }
    // },
    // destination: async(paerent ,args, {session}) => {
    //     try {
    //         let message = await Message.findById(paerent.id).populate("destination"); 
    //         return message.destination;
    //       } catch (error) {
    //         return new Error(error)
    //       }
    // }
  }