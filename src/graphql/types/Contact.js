import Debug from "debug";
import MongooseModels from "../../mongooseModels";
import subscribers from "../subscribers";

const debug = Debug("chat-plugin:Query:Contact");

const User = MongooseModels('User');
const Message = MongooseModels('Message');

export default {
    __isTypeOf: (obj) => {
      if( obj.username )
        return "Contact";
      return null;
    },
    messages: async({id}, {last, before}, {session, messageLoader}, info) => {
      
      let messages = [];
      let endCursor = '';
      let startCursor = '';
      let edges = [];
      let hasPreviousPage = false;
      let or = [
        { $and: [{ author: session.userId }, { destination: id }] },
        { $and: [{ destination: session.userId }, { author: id }] }
      ];
      
      try {
        let totalCount = await Message.countDocuments({ $or: or});
        debug("totalCount", totalCount);
        messages = ( before ) ?
          await Message.find({$and:[ {_id: {$lt: before}}, {$or: or} ] }).sort({_id: 'desc'}).limit(last).populate("author").populate("destination") :
          await Message.find({$or: or}).sort({_id: 'desc'}).limit(last).populate("author").populate("destination");
        debug("messages: ", messages);
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
          debug("edges: ", edges);
          let restOfMessages = await Message.countDocuments({$and:[ {_id: {$lt: startCursor}}, {$or: or} ] });
          hasPreviousPage = restOfMessages > 0 ? true : false
          
          debug("hasPreviousPage: ", hasPreviousPage);
          debug("restOfMessages: ", restOfMessages);
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
    online: (paerent ,args, _)=> {
      return (subscribers.getItem(paerent.id)) ? true : false
    },
    newMessages: (paerent ,args, {session})=> {
      return Message.countDocuments({
        $and:[ 
          {author: paerent.id}, 
          {destination: session.userId}, 
          {readed: false}
        ]
      });
    }
  }