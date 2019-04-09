import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';


const mutation = graphql`
  mutation addContact_Mutation($contactId: ID!) {
    addContact(contactId: $contactId) {
      id
      ...ChatWindow_contact
      newMessages
    }
  }`;

function sharedUpdater(store, contact, myId, contactId ) {
  const _me = store.get( myId );
  const contacts = ConnectionHandler.getConnection(_me, 'Launcher_contacts');
  const edge = ConnectionHandler.createEdge(store, contacts , contact, 'Contact', contactId);

  ConnectionHandler.insertEdgeBefore(contacts, edge);
}

let tempID = 0;

function commit(environment, contactId, me) {
  return commitMutation(environment, {
    mutation,
    variables: { contactId },
    updater: (store, data) => {
      const contact = store.get( contactId );
      sharedUpdater(store, contact, me, contactId);
    },
    optimisticUpdater: (store) => {
      const contact = store.get( contactId );
      sharedUpdater(store, contact, me, contactId);
    },
  });
}

export default { commit };
