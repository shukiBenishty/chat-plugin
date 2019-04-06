import { Router } from 'express';
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from '../graphql/schema.js';
import resolvers from '../graphql/resolvers.js';
import subscribers from "../graphql/subscribers";
import { pubsub } from '../graphql/Subscription';
import session from '../sessions.js';
import { userLoader } from "../graphql/dataLoader";

const router = Router();


import _checksession from './checksession';
const checksession = _checksession("/graphql");

// router.use('*', checksession);


export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  tracing: false,
  cacheControl: false,
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      const wsSession = await new Promise(resolve => {
        session(webSocket.upgradeReq, {}, () => {
          if (webSocket.upgradeReq.session) {
            resolve(webSocket.upgradeReq.session);
          }
          return false;
        });
      });
      if (wsSession.userId) {
        subscribers.setItem(wsSession.userId);
        let user = await userLoader.load(wsSession.userId);
        user.online = true;
        await user.save();
        pubsub.publish(`${wsSession.userId}`, { generalInfo: { online: user } });
        userLoader.prime(`${wsSession.userId}`, user);
        return { session: wsSession };
      }
      // throwing error rejects the connection
      throw new Error('Missing auth token!');
    },
    onDisconnect: async (webSocket, context) => {
      const wsSession = await new Promise(resolve => {
        session(webSocket.upgradeReq, {}, () => {
          if (webSocket.upgradeReq.session) {
            resolve(webSocket.upgradeReq.session);
          }
          return false;
        });
      });
      if (wsSession.userId) {
        subscribers.deleteItem(wsSession.userId);
        let user = await userLoader.load(wsSession.userId);
        user.online = false;
        await user.save();
        pubsub.publish(`${wsSession.userId}`, { generalInfo: { online: user } });
        userLoader.prime(`${wsSession.userId}`, user);
      }
    }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      console.log("connection context", connection.context);
      
      return connection.context;
    } else {
    // get the user token from the headers
    const session = req.session || '';
    
    return { session };
    }
  },
  playground: {
      settings: {
        "request.credentials": "include"
      },
      // tabs: [
      //   {
      //     endpoint: "http://localhost:4000/graphql"
      //   },
      // ],
    }
});
  
const path = '/';

server.applyMiddleware({ app: router, path });



export default router;

  