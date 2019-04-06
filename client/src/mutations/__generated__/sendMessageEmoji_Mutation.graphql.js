/**
 * @flow
 * @relayHash 9c67c0addd68f703302d28ff46ab2b78
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EmojiInput = {|
  emoji: string
|};
export type sendMessageEmoji_MutationVariables = {|
  message: EmojiInput,
  destination: string,
|};
export type sendMessageEmoji_MutationResponse = {|
  +sendMessageEmoji: ?{|
    +id: string,
    +author: {|
      +id: string
    |},
    +data: {|
      +text?: string,
      +emoji?: string,
      +url?: string,
      +fileName?: string,
    |},
    +dateSended: any,
    +destination: {|
      +id?: string,
      +name?: string,
    |},
    +createdAt: any,
    +readed: boolean,
    +received: boolean,
  |}
|};
export type sendMessageEmoji_Mutation = {|
  variables: sendMessageEmoji_MutationVariables,
  response: sendMessageEmoji_MutationResponse,
|};
*/


/*
mutation sendMessageEmoji_Mutation(
  $message: EmojiInput!
  $destination: ID!
) {
  sendMessageEmoji(message: $message, destination: $destination) {
    id
    author {
      id
    }
    data {
      __typename
      ... on Text {
        text
      }
      ... on Emoji {
        emoji
      }
      ... on File {
        url
        fileName
      }
    }
    dateSended
    destination {
      __typename
      ... on Contact {
        id
        name
      }
      ... on ChatRoom {
        id
      }
    }
    createdAt
    readed
    received
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "message",
    "type": "EmojiInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "destination",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "destination",
    "variableName": "destination",
    "type": "ID!"
  },
  {
    "kind": "Variable",
    "name": "message",
    "variableName": "message",
    "type": "EmojiInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "author",
  "storageKey": null,
  "args": null,
  "concreteType": "Contact",
  "plural": false,
  "selections": (v3/*: any*/)
},
v5 = {
  "kind": "InlineFragment",
  "type": "File",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "url",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "fileName",
      "args": null,
      "storageKey": null
    }
  ]
},
v6 = {
  "kind": "InlineFragment",
  "type": "Emoji",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "emoji",
      "args": null,
      "storageKey": null
    }
  ]
},
v7 = {
  "kind": "InlineFragment",
  "type": "Text",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "text",
      "args": null,
      "storageKey": null
    }
  ]
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "dateSended",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "type": "ChatRoom",
  "selections": (v3/*: any*/)
},
v10 = {
  "kind": "InlineFragment",
  "type": "Contact",
  "selections": [
    (v2/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "readed",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "received",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "sendMessageEmoji_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendMessageEmoji",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "data",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ]
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "destination",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v10/*: any*/)
            ]
          },
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "sendMessageEmoji_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sendMessageEmoji",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Message",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "data",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v14/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ]
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "destination",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v14/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
            ]
          },
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "sendMessageEmoji_Mutation",
    "id": null,
    "text": "mutation sendMessageEmoji_Mutation(\n  $message: EmojiInput!\n  $destination: ID!\n) {\n  sendMessageEmoji(message: $message, destination: $destination) {\n    id\n    author {\n      id\n    }\n    data {\n      __typename\n      ... on Text {\n        text\n      }\n      ... on Emoji {\n        emoji\n      }\n      ... on File {\n        url\n        fileName\n      }\n    }\n    dateSended\n    destination {\n      __typename\n      ... on Contact {\n        id\n        name\n      }\n      ... on ChatRoom {\n        id\n      }\n    }\n    createdAt\n    readed\n    received\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c0da9d8dae0424e231e50137d7377b6e';
module.exports = node;
