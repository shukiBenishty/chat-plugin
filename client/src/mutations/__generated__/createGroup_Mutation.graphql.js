/**
 * @flow
 * @relayHash 3cbc0bea01420a5c7c8333e920ad38c3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type createGroup_MutationVariables = {|
  name: string,
  picture: string,
  subscribers?: ?$ReadOnlyArray<string>,
|};
export type createGroup_MutationResponse = {|
  +createGroup: ?{|
    +id: string
  |}
|};
export type createGroup_Mutation = {|
  variables: createGroup_MutationVariables,
  response: createGroup_MutationResponse,
|};
*/


/*
mutation createGroup_Mutation(
  $name: String!
  $picture: String!
  $subscribers: [ID!]
) {
  createGroup(name: $name, picture: $picture, subscribers: $subscribers) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "picture",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "subscribers",
    "type": "[ID!]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createGroup",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name",
        "type": "String!"
      },
      {
        "kind": "Variable",
        "name": "picture",
        "variableName": "picture",
        "type": "String!"
      },
      {
        "kind": "Variable",
        "name": "subscribers",
        "variableName": "subscribers",
        "type": "[ID!]"
      }
    ],
    "concreteType": "Group",
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
    "name": "createGroup_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "createGroup_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "createGroup_Mutation",
    "id": null,
    "text": "mutation createGroup_Mutation(\n  $name: String!\n  $picture: String!\n  $subscribers: [ID!]\n) {\n  createGroup(name: $name, picture: $picture, subscribers: $subscribers) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a1fc731a78b0396ccf3774d12b6c6d61';
module.exports = node;
