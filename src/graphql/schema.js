import { gql } from 'apollo-server-express';

export let typeDefs = gql`

  interface INode {
    id: ID!
  }

  scalar Date

  type Contact {
    id: ID!

    name: String!
    username: String!
    online: Boolean!
    picture: String!
    messages(last: Int, before: ID ): MessageConnection
    newMessages: Int
}

  type User implements INode {
    id: ID!

    name: String!
    username: String!
    picture: String!
    admin: Boolean!
    contacts: [Contact]
    chatRooms: [ChatRoom]
  }


  type Text {
    text: String!
  }

  type Emoji {
    emoji: String!
  }

  type File {
    url: String!
    fileName: String!
  }

  union MessageData = Text | Emoji | File
  
  union MessageDest = Contact | ChatRoom

  type Message implements INode {
    id: ID!

    author: Contact!
    data: MessageData!
    dateSended: Date!
    destination: MessageDest!
    createdAt: Date!
    readed: Boolean!
    received: Boolean!
  }

  type ChatRoom implements INode {
    id: ID!

    subscribers: [Contact]
    messages: [Message]
    # createdAt: Date!
  }

  input TextInput {
    text: String!
  }

  input EmojiInput {
    emoji: String!
  }

  input FileInput {
    url: String!
    fileName: String!
  }

  type PageInfo {
    endCursor: String
    startCursor: String
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  type MessageEdge {
    cursor: String!
    node: Message
  }

  type MessageConnection {
      edges: [MessageEdge]!
      pageInfo: PageInfo
      totalCount: Int!
  }


  type generalInfo {
    online: Contact
    typing: Contact
    typingForMe: Contact
    readed: Message
    newMessage: Message
  }
  
  type Query {
    me: User
    contact(contactId: ID!): Contact
    contacts: [Contact]
    message(messageId: ID!): Message
    
  }

  type Mutation {
    sendMessageText(message: TextInput!, destination: ID!): Message
    sendMessageEmoji(message: EmojiInput!, destination: ID!): Message
    sendMessageFile(message: FileInput!, destination: ID!): Message
    addContact(contactId: ID!): Contact
    readMassage(messageId: ID!): Message
    typing(destination: ID!): Boolean
    online: Boolean
  }
  
  type Subscription {
    generalInfo(contactId: ID): generalInfo
    personalMessageSent(contactId: ID): Message
    publicMessageSent(chatRoom: ID!): Message

  }
`;
