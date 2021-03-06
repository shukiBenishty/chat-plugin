

import MongooseModels from "../../mongooseModels";

const User = MongooseModels('User');
const Message = MongooseModels('Message');
const Group = MongooseModels('Group');


export const userLoader =  async userIds => {
    let users = await User.find({ _id: { $in: userIds } });
    if (users.length === userIds.length) {
        return Promise.resolve(users)
    }
    let results = [];
    userIds.forEach( (userId, index ) => {
        let i = users.findIndex( c => c.id === userId )
        if ( i === -1 ) {
            results[index] = {};       
        }
        results[index] = users[i];
    })
    return Promise.resolve(results)
};

export const groupLoader = async groupIds => {
    let groups = await Group.find({ _id: { $in: groupIds } }).populate('subscribers');
    if (groups.length === groupIds.length) {
        return Promise.resolve(groups)
    }
    let results = [];

    groupIds.forEach( (groupId, index ) => {
        let i = groups.findIndex( c => c.id === groupId )
        if ( i === -1 ) {
            results[index] = {};       
        }
        results[index] = groups[i];
    })
    return Promise.resolve(results )
};

export const messageLoader = async (messageIds) => {
    let messages = await Message.find({ _id: { $in: messageIds } }).populate("author").populate("destination");
    if (messages.length === messageIds.length) {
        return Promise.resolve(messages)
    }
    let results = [];
    messageIds.forEach( (messageId, index ) => {
        let i = messages.findIndex( c => c.id === messageId )
        if ( i === -1 ) {
            results[index] = {};       
        }
        results[index] = messages[i];
    })
    return Promise.resolve(results )
  };
