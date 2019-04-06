import path from 'path';
import Debug from "debug";
import express, { Router } from 'express';
import { ApolloServer } from "apollo-server-express";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from  "cors" ;

import { typeDefs } from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import subscribers from "./graphql/subscribers";
import { pubsub } from './graphql/Subscription';
import { userLoader } from "./graphql/dataLoader";
import session from './sessions';

const debug = Debug("chat-plugin");

import _checksession from './checksession';
const checksession = _checksession("/graphql");

const router = Router();

router.use(logger('dev'));

let secret = 'chat-plugin secret'; // must be the same one for cookie parser and for session
router.use(cookieParser(secret));


router.use(
  cors({
    credentials: false,
    origin: "*"
  })
);

router.use('/public', express.static(path.join(__dirname, '../client/dist')));

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
            debug("session", webSocket.upgradeReq.session );
            return resolve(webSocket.upgradeReq.session);
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
      debug("connection context", connection.context);
      
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

server.applyMiddleware({ app: router });



export default router;
  