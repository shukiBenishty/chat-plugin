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

        let db = JSON.parse(fs.readFileSync(path.resolve(__dirname, './db-old2.json'))); 

        let _users = db.users.map((u) => {
            return {
                ...u,
                username: u.name,
                password: u.password || '1234'
            }
        })

        _users.map((u) => {
            if(!u.username)
                console.log(u._id);
        })
        // console.log(_users);
        
        await User.insertMany(_users);
        await Group.insertMany(db.groups);
        await Message.insertMany(db.messages);

        process.exit(0);
    } catch(err){
        console.error(err)
        process.exit(1);
    }
})();