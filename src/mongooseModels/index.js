import mongoose from 'mongoose';
import Debug from 'debug'

import User from "./user"
import Message from "./message"
import Group from "./group"

const debug = Debug("chat-plugin:model");

mongoose.set('useCreateIndex', true);

let db = mongoose.createConnection();

Message(db);
Group(db);
User(db);

export let dbInit = async (dbConnStr) => {
    try {
        await db.openUri(dbConnStr, { useNewUrlParser: true });
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
};

debug('Pending DB connection');

export default model => db.model(model);
