/**
 * @flow
 * @relayHash 92bc13aed4c1cdd9960466c794d295ea
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Vote = "LIKE" | "UNLIKE" | "%future added value";
export type sendComment_MutationVariables = {|
  messageId: string,
  myVote?: ?Vote,
|};
export type sendComment_MutationResponse = {|
  +sendComment: ?{|
    +id: string,
    +comments: ?{|
      +myVote: ?Vote,
      +likes: number,
      +unlikes: number,
    |},
  |}
|};
export type sendComment_Mutation = {|
  variables: sendComment_MutationVariables,
  response: sendComment_MutationResponse,
|};
*/


/*
mutation sendComment_Mutation(
  $messageId: ID!
  $myVote: Vote
) {
  sendComment(messageId: $messageId, myVote: $myVote) {
    id
    comments {
      myVote
      likes
      unlikes
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
  },
  {
    "kind": "LocalArgument",
    "name": "myVote",
    "type": "Vote",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "sendComment",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "messageId",
        "variableName": "messageId",
        "type": "ID!"
      },
      {
        "kind": "Variable",
        "name": "myVote",
        "variableName": "myVote",
        "type": "Vote"
      }
    ],
    "concreteType": "Message",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "comments",
        "storageKey": null,
        "args": null,
        "concreteType": "Comments",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "myVote",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "likes",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "unlikes",
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
    "name": "sendComment_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "sendComment_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "sendComment_Mutation",
    "id": null,
    "text": "mutation sendComment_Mutation(\n  $messageId: ID!\n  $myVote: Vote\n) {\n  sendComment(messageId: $messageId, myVote: $myVote) {\n    id\n    comments {\n      myVote\n      likes\n      unlikes\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a8df5a673ece90bb0a1c48d25fb04e79';
module.exports = node;
