import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';


const mutation = graphql`
  mutation editGroup_Mutation( $groupId: ID!, $subscribers: [ID!], $unsubscribers: [ID!]) {
    editGroup( groupId: $groupId, subscribers: $subscribers, unsubscribers: $unsubscribers) {
      id
      name
      picture
      ...Header_group
      ...GroupMessageList_list
    }
  }`;



function commit(environment, { groupId, subscribers, unsubscribers }) {
  return commitMutation(environment, {
    mutation,
    variables: { groupId, subscribers, unsubscribers }
  });
}

export default { commit };
