import path from 'path';
import http from 'http';
import express from "express";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import graphql, {server} from 'chat-plugin';

import session from './sessions.js';
import index from './routes/index';
import users from './routes/users';
import login from './routes/login';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let secret = 'chat-plugin secret'; 
app.use(cookieParser(secret));

app.use(session);

app.use('/', index);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/login', login);

app.use('/chat', graphql);


const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

let PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/chat${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/chat${server.subscriptionsPath}`)
})
