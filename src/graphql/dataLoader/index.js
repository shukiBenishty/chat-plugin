import DataLoader from 'dataloader';

import MongooseModels from "../../mongooseModels";

const User = MongooseModels('User');
const Message = MongooseModels('Message');
const ChatRoom = MongooseModels('ChatRoom');


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

export const chatRoomLoader = new DataLoader(async chatRoomIds => {
    let chatRooms = await ChatRoom.find({ _id: { $in: chatRoomIds } });
    if (chatRooms.length === chatRoomIds.length) {
        return Promise.resolve(chatRooms)
    }
    let resolte = [];

    chatRoomIds.forEach( (chatRoomId, index ) => {
        let i = chatRooms.findIndex( c => c.id === chatRoomId )
        if ( i === -1 ) {
            resolte[index] = {};       
        }
        resolte[index] = chatRooms[i];
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
