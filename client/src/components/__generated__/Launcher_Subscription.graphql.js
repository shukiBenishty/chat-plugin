/**
 * @flow
 * @relayHash bd7af165a9b686d397d5dd0b53aaa3b7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Launcher_SubscriptionVariables = {||};
export type Launcher_SubscriptionResponse = {|
  +generalInfo: ?{|
    +online: ?{|
      +id: string,
      +online: boolean,
    |},
    +readed: ?{|
      +id: string,
      +readed: boolean,
      +destination: {|
        +id?: string
      |},
      +received: boolean,
    |},
    +newMessage: ?{|
      +id: string,
      +author: {|
        +id: string,
        +newMessages: ?number,
      |},
      +data: {|
        +text?: string,
        +emoji?: string,
        +url?: string,
        +fileName?: string,
      |},
      +destination: {|
        +id?: string
      |},
      +dateSended: any,
      +createdAt: any,
      +readed: boolean,
      +received: boolean,
    |},
  |}
|};
export type Launcher_Subscription = {|
  variables: Launcher_SubscriptionVariables,
  response: Launcher_SubscriptionResponse,
|};
*/


/*
subscription Launcher_Subscription {
  generalInfo {
    online {
      id
      online
    }
    readed {
      id
      readed
      destination {
        __typename
        ... on Contact {
          id
        }
        ... on ChatRoom {
          id
        }
      }
      received
    }
    newMessage {
      id
      author {
        id
        newMessages
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
      destination {
        __typename
        ... on Contact {
          id
        }
        ... on ChatRoom {
          id
        }
      }
      dateSended
      createdAt
      readed
      received
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "online",
  "storageKey": null,
  "args": null,
  "concreteType": "Contact",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "online",
      "args": null,
      "storageKey": null
    }
  ]
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "readed",
  "args": null,
  "storageKey": null
},
v3 = [
  (v0/*: any*/)
],
v4 = {
  "kind": "InlineFragment",
  "type": "Contact",
  "selections": (v3/*: any*/)
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "destination",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ]
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "received",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "author",
  "storageKey": null,
  "args": null,
  "concreteType": "Contact",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "newMessages",
      "args": null,
      "storageKey": null
    }
  ]
},
v8 = {
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
v9 = {
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
v10 = {
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
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "dateSended",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "destination",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    (v13/*: any*/),
    {
      "kind": "InlineFragment",
      "type": "ChatRoom",
      "selections": (v3/*: any*/)
    },
    (v4/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "Launcher_Subscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "generalInfo",
        "storageKey": null,
        "args": null,
        "concreteType": "generalInfo",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "readed",
            "storageKey": null,
            "args": null,
            "concreteType": "Message",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v2/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "newMessage",
            "storageKey": null,
            "args": null,
            "concreteType": "Message",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "data",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/)
                ]
              },
              (v5/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "Launcher_Subscription",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "generalInfo",
        "storageKey": null,
        "args": null,
        "concreteType": "generalInfo",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "readed",
            "storageKey": null,
            "args": null,
            "concreteType": "Message",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v2/*: any*/),
              (v14/*: any*/),
              (v6/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "newMessage",
            "storageKey": null,
            "args": null,
            "concreteType": "Message",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "data",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": false,
                "selections": [
                  (v13/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/)
                ]
              },
              (v14/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "subscription",
    "name": "Launcher_Subscription",
    "id": null,
    "text": "subscription Launcher_Subscription {\n  generalInfo {\n    online {\n      id\n      online\n    }\n    readed {\n      id\n      readed\n      destination {\n        __typename\n        ... on Contact {\n          id\n        }\n        ... on ChatRoom {\n          id\n        }\n      }\n      received\n    }\n    newMessage {\n      id\n      author {\n        id\n        newMessages\n      }\n      data {\n        __typename\n        ... on Text {\n          text\n        }\n        ... on Emoji {\n          emoji\n        }\n        ... on File {\n          url\n          fileName\n        }\n      }\n      destination {\n        __typename\n        ... on Contact {\n          id\n        }\n        ... on ChatRoom {\n          id\n        }\n      }\n      dateSended\n      createdAt\n      readed\n      received\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '042dc6a9ff2b07ea3b6e579b2353837c';
module.exports = node;
