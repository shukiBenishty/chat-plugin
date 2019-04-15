import MongooseModels from "../../mongooseModels";


const Message = MongooseModels('Message');
const Group = MongooseModels('Group')


export default { 

    comments: async(paerent ,args, {session, userLoader, groupLoader, messageLoader}) => {
      try {
        let myVote =  paerent.likes.indexOf(session.userId) !== -1 ? 'LIKE' : ( paerent.unlikes.indexOf(session.userId) !== -1) ? 'UNLIKE' : null
        return {
          myVote: myVote,
          likes: paerent.likes.length,
          unlikes : paerent.unlikes.length
        };
      } catch (error) {
        return new Error(error)
      }
    }
  }