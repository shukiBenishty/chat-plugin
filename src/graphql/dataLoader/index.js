import DataLoader from 'dataloader';

import MongooseModels from "../../mongooseModels";

const User = MongooseModels('User');
const Message = MongooseModels('Message');
const Group = MongooseModels('Group');


export const userLoader = new DataLoader( async userIds => {
    let users = await User.find({ _id: { $in: userIds } });
    if (users.length === userIds.length) {
        return Promise.resolve(users)
    }
    let resolte = [];
    userIds.forEach( (userId, index ) => {
        let i = users.findIndex( c => c.id === userId )
        if ( i === -1 ) {
            resolte[index] = {};       
        }
        resolte[index] = users[i];
    })
    return Promise.resolve(resolte)
});

export const groupLoader = new DataLoader(async groupIds => {
    let groups = await Group.find({ _id: { $in: groupIds } }).populate('subscribers');
    if (groups.length === groupIds.length) {
        return Promise.resolve(groups)
    }
    let resolte = [];

    groupIds.forEach( (groupId, index ) => {
        let i = groups.findIndex( c => c.id === groupId )
        if ( i === -1 ) {
            resolte[index] = {};       
        }
        resolte[index] = groups[i];
    })
    return Promise.resolve(resolte )
});

export const messageLoader = new DataLoader(async (messageIds) => {
    let messages = await Message.find({ _id: { $in: messageIds } }).populate("author").populate("destination");
    if (messages.length === messageIds.length) {
        return Promise.resolve(messages)
    }
    let resolte = [];
    messageIds.forEach( (messageId, index ) => {
        let i = messages.findIndex( c => c.id === messageId )
        if ( i === -1 ) {
            resolte[index] = {};       
        }
        resolte[index] = messages[i];
    })
    return Promise.resolve(resolte )
  });
