import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';


const mutation = graphql`
  mutation addContact_Mutation($contactId: ID!) {
    addContact(contactId: $contactId) {
      id
    }
  }`;



function commit(environment, contactId, me) {
  return commitMutation(environment, {
    mutation,
    variables: { contactId },
  });
}

export default { commit };
