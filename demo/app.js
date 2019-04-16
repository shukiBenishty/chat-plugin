import path from 'path';
import http from 'http';
import express from "express";
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';



const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');


const graphql = require(process.env.PORT ? 'chat-plugin': '../lib' ).default ;
const server = require(process.env.PORT ? 'chat-plugin': '../lib' ).server ;


// import session from './sessions.js';
import index from './routes/index';
import users from './routes/users';
import groups from './routes/groups';
import login from './routes/login';

const app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// app.use(session);

app.use('/', index);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/login', login);
app.use('/groups', groups);

if (process.env.PORT) {
  app.use('/chat', graphql(
    `https://chat-plugin.herokuapp.com/chat/graphql`,
    `wss://chat-plugin.herokuapp.com/graphql`,
    `mongodb://shuki:shuki1@ds231956.mlab.com:31956/chat-plugin`,
    `mongodb://shuki:shuki1@ds231956.mlab.com:31956/chat-plugin`
  ));
} else {
  app.use('/chat', graphql(
    `http://localhost:4000/chat/graphql`,
    `ws://localhost:4000/graphql`,
    `mongodb://localhost/chat-plugin`,
    `mongodb://localhost/chat-plugin`
  ));
}
 



const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

let PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/chat${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/chat${server.subscriptionsPath}`)
})
