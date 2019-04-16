import fs from 'fs';
import path from 'path';
import MongooseModels, {dbInit} from '../src/mongooseModels';


const User = MongooseModels('User');
const Message = MongooseModels('Message');
const Group = MongooseModels('Group');


(async () => {
    try {

        await dbInit('mongodb://localhost/DB_shop');
        
        await User.deleteMany({});
        await Message.deleteMany({});
        await Group.deleteMany({});

        let db = JSON.parse(fs.readFileSync(path.resolve(__dirname, './db.json'))); 

        
        await User.insertMany(db.users);
        await Group.insertMany(db.groups);
        await Message.insertMany(db.messages);

        process.exit(0);
    } catch(err){
        console.error(err)
        process.exit(1);
    }
})();