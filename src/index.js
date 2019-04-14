import path from 'path';
import Debug from "debug";
import express, { Router } from 'express';
import { ApolloServer } from "apollo-server-express";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from  "cors" ;
import DataLoader from 'dataloader';

import { typeDefs } from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import subscribers from "./graphql/subscribers";
import { pubsub } from './graphql/Subscription';
import { userLoader, groupLoader, messageLoader } from "./graphql/dataLoader";
import initClient from './initClent';
import {dbInit} from './mongooseModels';
import session, {sessionInit} from './sessions';
import MongooseModels from "./mongooseModels";

const User = MongooseModels('User');

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
        let _userLoader =  new DataLoader(userLoader);
        let user = await _userLoader.load(wsSession.userId);
        user.online = true;
        await user.save();
        pubsub.publish(`${wsSession.userId}`, { generalInfo: { online: user } });
        _userLoader.prime(`${wsSession.userId}`, user);
        return { 
          session: wsSession,
          userLoader: _userLoader,
          groupLoader: new DataLoader(groupLoader),
          messageLoader: new DataLoader(messageLoader) 
        };
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
        let user = await User.findById(wsSession.userId);
        user.online = false;
        await user.save();
        pubsub.publish(`${wsSession.userId}`, { generalInfo: { online: user } });
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
    
    const {} = DataLoader
    return { 
      session,
      userLoader: new DataLoader(userLoader),
      groupLoader: new DataLoader(groupLoader),
      messageLoader: new DataLoader(messageLoader) 
     };
    }
  },
  playground: {
      settings: {
        "request.credentials": "include"
      }
    }
});

server.applyMiddleware({ app: router });



export default ( graphqlUrl, websocketURL, dbConnStr, sessionConnStr ) => {
  initClient(graphqlUrl, websocketURL);
  dbInit(dbConnStr);
  sessionInit(sessionConnStr);
  return router;
};
  