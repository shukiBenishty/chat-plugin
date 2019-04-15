import fs from 'fs';
import path from 'path';
import MongooseModels, {dbInit} from '../src/mongooseModels';

const User = MongooseModels('User');
const Group = MongooseModels('Group');
const Message = MongooseModels('Message');


(async () => {
    try {

        await dbInit('mongodb://localhost/chat-plugin');
        
        let users = await User.find({});
        let groups = await Group.find({});
        let messages = await Message.find({});
    
        let db = {
            users,
            messages,
            groups
        }

        fs.writeFile(path.resolve(__dirname, './db.json'), JSON.stringify(db, null, 2),
            (err) => {
                if(err) {
                    console.error(err);
                    process.exit(1);
                }
                process.exit(0);
            }
        ); 
    } catch(err){
        console.error(err)
    }

})();