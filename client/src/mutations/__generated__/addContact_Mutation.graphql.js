/**
 * @flow
 * @relayHash edb0dec14e7ca03e1533b48c7654d102
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type addContact_MutationVariables = {|
  contactId: string
|};
export type addContact_MutationResponse = {|
  +addContact: ?{|
    +id: string
  |}
|};
export type addContact_Mutation = {|
  variables: addContact_MutationVariables,
  response: addContact_MutationResponse,
|};
*/


/*
mutation addContact_Mutation(
  $contactId: ID!
) {
  addContact(contactId: $contactId) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "contactId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "addContact",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "contactId",
        "variableName": "contactId",
        "type": "ID!"
      }
    ],
    "concreteType": "Contact",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "addContact_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "addContact_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "addContact_Mutation",
    "id": null,
    "text": "mutation addContact_Mutation(\n  $contactId: ID!\n) {\n  addContact(contactId: $contactId) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b3d549ce9c2a0688cbdb671ce340bd0a';
module.exports = node;
