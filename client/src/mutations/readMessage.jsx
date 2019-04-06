import { commitMutation, graphql } from 'react-relay';


const mutation = graphql`
  mutation readMessage_Mutation($messageId: ID!) {
    readMassage(messageId: $messageId){
    id
    readed
    author {
      id
      newMessages
    }
  }
  }
`;

let tempID = 0;

function commit(environment, messageId) {
  return commitMutation(environment, {
    mutation,
    variables: { messageId },
  });
}

export default { commit };
