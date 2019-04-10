import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation sendMessageEmoji_Mutation($message: EmojiInput!, $destination: ID!){
    sendMessageEmoji(message: $message, destination: $destination) {
        id
        author{
        id
        }
        data{
        ...on Text{
            text
        }
        ...on Emoji {
            emoji
        }
        ...on File {
            url
            fileName
        }
        }
        dateSended
            destination {
        ...on Contact{
            id 
            name
        }
        ... on Group {
            id
        }
        }
        createdAt
        readed
        received
    }
}
`;

let tempID = 0;

function commit(environment, message, destination) {
  return commitMutation(environment, {
    mutation,
    variables: { message, destination },
    updater: ( store , data) => {
        const contact = store.get( destination);
        const _message = store.get( data.sendMessageEmoji.id);

        const messages = ConnectionHandler.getConnection(contact, 'ContactMessageList_messages');
        const edge = ConnectionHandler.createEdge(store, messages, _message, 'Message', _message.id);

        // No cursor provided, append the edge at the end.
        ConnectionHandler.insertEdgeAfter(messages, edge);
    }
  });
}

export default { commit };
