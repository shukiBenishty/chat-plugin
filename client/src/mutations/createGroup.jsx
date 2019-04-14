import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';


const mutation = graphql`
  mutation createGroup_Mutation($name: String!, $picture: String!, $subscribers: [ID!]) {
    createGroup(name: $name, picture: $picture, subscribers: $subscribers) {
      id
    }
  }`;



let tempID = 0;

function commit(environment, me, {name, picture, subscribers}) {
  return commitMutation(environment, {
    mutation,
    variables: { name, picture, subscribers }
  });
}

export default { commit };
