import mongoose from 'mongoose';
import Debug from 'debug'

import User from "./user"
import Message from "./message"
import ChatRoom from "./chatRoom"
import { dbConnStr } from '../../config';

const debug = Debug("chat-plugin:model");

mongoose.set('useCreateIndex', true);

let db = mongoose.createConnection();

Message(db);
ChatRoom(db);
User(db);

(async () => {
    try {
        await db.openUri(dbConnStr, { useNewUrlParser: true });
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();

debug('Pending DB connection');

export default model => db.model(model);
