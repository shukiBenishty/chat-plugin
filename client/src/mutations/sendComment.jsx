import { commitMutation, graphql } from 'react-relay';


const mutation = graphql`
  mutation sendComment_Mutation($messageId: ID!, $myVote:Vote) {
    sendComment(messageId: $messageId, myVote: $myVote){
        id
        comments {
          myVote
          likes
          unlikes
        }
    }
  }
`;

let tempID = 0;

function commit(environment, messageId, myVote) {
  return commitMutation(environment, {
    mutation,
    variables: { messageId, myVote },
  });
}

export default { commit };
