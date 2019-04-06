/**
 * @flow
 * @relayHash 1c0e91971dfb939fc53de4510982a3ca
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type readMessage_MutationVariables = {|
  messageId: string
|};
export type readMessage_MutationResponse = {|
  +readMassage: ?{|
    +id: string,
    +readed: boolean,
    +author: {|
      +id: string,
      +newMessages: ?number,
    |},
  |}
|};
export type readMessage_Mutation = {|
  variables: readMessage_MutationVariables,
  response: readMessage_MutationResponse,
|};
*/


/*
mutation readMessage_Mutation(
  $messageId: ID!
) {
  readMassage(messageId: $messageId) {
    id
    readed
    author {
      id
      newMessages
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "messageId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "readMassage",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "messageId",
        "variableName": "messageId",
        "type": "ID!"
      }
    ],
    "concreteType": "Message",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "readed",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "author",
        "storageKey": null,
        "args": null,
        "concreteType": "Contact",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "newMessages",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "readMessage_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "readMessage_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "readMessage_Mutation",
    "id": null,
    "text": "mutation readMessage_Mutation(\n  $messageId: ID!\n) {\n  readMassage(messageId: $messageId) {\n    id\n    readed\n    author {\n      id\n      newMessages\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ab65435dd97eafd056815be94c0607e3';
module.exports = node;
