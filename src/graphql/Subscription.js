
import Debug from "debug";
import { withFilter, PubSub } from 'apollo-server-express';

import MongooseModels from "../mongooseModels";

const debug = Debug("chat-plugin:Subscription");

export let pubsub = new PubSub();
const User = MongooseModels('User');


const withCancel = (asyncIterator, onCancel, ) => {
  return {
    ...asyncIterator,
    return() {
      onCancel()
      return asyncIterator.return ? asyncIterator.return() : Promise.resolve({ value: undefined, done: true })
    }
  }
}


export default {
    personalMessageSent:  {
      subscribe: (obj, args, {session}, info) => {
        return withCancel(pubsub.asyncIterator(session.userId), () => {
          
          console.log(session.userId);
        })
      }
    },
    publicMessageSent:  {
      subscribe: 
        (obj, args, {session}, info) => {
          return pubsub.asyncIterator(args.group)
        }
    },
    generalInfo: {
      subscribe: async (obj, {contactId}, {session} , info) => { 

          let user = await User.findById(session.userId).populate("contacts").populate('groups')
          let queues = [];
          if (contactId) {
            queues.push(contactId);
          } else {
            queues = user.contacts.map((c) => {
              return `${c.id}`
            });
            
            user.groups.map((g) => {
              queues.push(`${g.id}`);
            });
            
            queues.push(session.userId);
          }

          return withFilter( () =>  pubsub.asyncIterator(queues),
            (payload) => {
              //filter if typing for me
              if (payload.generalInfo.typing && (payload.generalInfo.destination === session.userId)) return false;
              if (payload.generalInfo.typingForMe && (payload.generalInfo.destination !== session.userId)) return false;
              if (payload.generalInfo.readed && (payload.generalInfo.destination !== session.userId)) return false;
              if (payload.generalInfo.newContact && (payload.generalInfo.destination !== session.userId)) return false;
              if (payload.generalInfo.newGroup && (payload.generalInfo.destination !== session.userId)) return false;
              if (payload.generalInfo.deleteGroup && (payload.generalInfo.destination !== session.userId)) return false;
              if (payload.generalInfo.editComment && !(payload.generalInfo.destination.find( u => `${u.id}` === session.userId))) return false;
              if (payload.generalInfo.newMessage && !(payload.generalInfo.destination.find( u => u === session.userId))) return false;
              return true;
            } )(obj, {contactId}, {session}, info);
      }
    }
}