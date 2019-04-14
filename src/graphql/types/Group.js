import MongooseModels from "../../mongooseModels";

const Message = MongooseModels('Message');
const Group = MongooseModels('Group');

export default {
    __isTypeOf: (obj) => {
      if( obj.subscribers )
        return "Group";
      return null;
    },
    messages: async ({id} , {last, before}, {session, messageLoader}) => {

      let messages = [];
      let endCursor = '';
      let startCursor = '';
      let edges = [];
      let hasPreviousPage = false;

      let query = { destination: id };
      
      try {
        let totalCount = await Message.countDocuments(query);
        messages = ( before ) ?
          await Message.find({$and:[ {_id: {$lt: before}}, query ] }).sort({_id: 'desc'}).limit(last).populate("author").populate("destination") :
          await Message.find(query).sort({_id: 'desc'}).limit(last).populate("author").populate("destination");
        if (messages.length !== 0) {
          edges = messages.map(message => {
            messageLoader.prime(`${message.id}`, message);
            endCursor = endCursor || `${message.id}`;
            startCursor = `${message.id}`;
            return {
              cursor: `${message.id}`,
              node: message
            }
          });
          edges.reverse();

          let restOfMessages = await Message.countDocuments({$and:[ {_id: {$lt: startCursor}}, query ] });
          hasPreviousPage = restOfMessages > 0 ? true : false
          
        }

        return {
          edges: edges,
          totalCount: totalCount,
          pageInfo: {
            startCursor: startCursor,
            endCursor: endCursor,
            hasPreviousPage: hasPreviousPage
          }
        }
  
      } catch (error) {
        console.error(error);      
      }
    },
    subscribers: async(paerent ,args, {session, userLoader, groupLoader}) => {
      try {
        let group = await groupLoader.load(paerent.id.toString());
        let users = await userLoader.loadMany( group.subscribers.map( s => s._id.toString() ))
  
        let startCursor = '';
        let endCursor = '';
        let edges = users.map(subscriber => {
          startCursor = startCursor || `${subscriber.id}`;
          endCursor = `${subscriber.id}`;
          return {
            cursor: `${subscriber.id}`,
            node: subscriber
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
    newMessages: (paerent ,args, {session})=> {
      return Message.countDocuments({
        $and:[ 
          {destination: paerent.id}, 
          {readed: false}
        ]
      });
    }
  }