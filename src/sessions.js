import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { sessConnStr } from '../config';

let secret = 'chat-plugin secret';

let sessionConnect = mongoose.createConnection();

export let sessionInit = async (sessConnStr) => {
    try {
      await sessionConnect.openUri(sessConnStr, { useNewUrlParser: true });
    } catch (err) {
      debug(`Error connecting to session backend DB: ${err}`);
      process.exit(0);
    }
  };

let MongoStore = connectMongo(session);

export default session({
    name: 'users.sid',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: new MongoStore({ mongooseConnection: sessionConnect }),
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: true } 
  })