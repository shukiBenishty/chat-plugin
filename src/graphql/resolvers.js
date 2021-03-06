import Query from "./Query";
import Mutation from "./Mutation";
import subscription from "./Subscription";

import User from "./types/User";
import Message from "./types/Message";
import Group from "./types/Group";
import Contact from "./types/Contact";



export default {
  Query: Query,
  Mutation: Mutation,
  Subscription: subscription,
  User: User,
  Contact: Contact,
  Group: Group,
  Message: Message,
  Text: {
    __isTypeOf: (obj) => {
      if( obj.text )
        return "Text";
      return null;
    }
  },
  Emoji: {
    __isTypeOf: (obj) => {
      if( obj.emoji )
        return "Emoji";
      return null;
    }
  },
  File: {
    __isTypeOf: (obj) => {
      if( obj.url )
        return "File";
      return null;
    }
  },
}
