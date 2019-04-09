/**
 * @flow
 * @relayHash 4cc2765003d2f9c04520b8264eb56298
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Message_message$ref = any;
export type MessageList_QueryVariables = {|
  last?: ?number,
  before?: ?string,
  contactId: string,
|};
export type MessageList_QueryResponse = {|
  +list: ?{|
    +messages: ?{|
      +edges: $ReadOnlyArray<?{|
        +cursor: string,
        +node: ?{|
          +id: string,
          +$fragmentRefs: Message_message$ref,
        |},
      |}>,
      +pageInfo: ?{|
        +endCursor: ?string,
        +startCursor: ?string,
        +hasPreviousPage: ?boolean,
      |},
      +totalCount: number,
    |}
  |}
|};
export type MessageList_Query = {|
  variables: MessageList_QueryVariables,
  response: MessageList_QueryResponse,
|};
*/


/*
query MessageList_Query(
  $last: Int
  $before: ID
  $contactId: ID!
) {
  list: contact(contactId: $contactId) {
    messages(last: $last, before: $before) {
      edges {
        cursor
        node {
          id
          ...Message_message
          __typename
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
      }
      totalCount
    }
    id
  }
}

fragment Message_message on Message {
  id
  author {
    id
    picture
  }
  data {
    __typename
    ... on Text {
      __typename
      text
    }
    ... on Emoji {
      __typename
      emoji
    }
    ... on File {
      __typename
      url
      fileName
    }
  }
  dateSended
  destination {
    __typename
    ... on Contact {
      id
    }
    ... on ChatRoom {
      id
    }
  }
  createdAt
  readed
  received
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
    "type": "ID",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "contactId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "contactId",
    "variableName": "contactId",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pageInfo",
  "storageKey": null,
  "args": null,
  "concreteType": "PageInfo",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "endCursor",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "startCursor",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasPreviousPage",
      "args": null,
      "storageKey": null
    }
  ]
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "totalCount",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before",
    "type": "ID"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last",
    "type": "Int"
  }
],
v8 = [
  (v3/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MessageList_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "list",
        "name": "contact",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Contact",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "messages",
            "name": "__MessageList_messages_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "MessagesConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "MessageEdge",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Message",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "kind": "FragmentSpread",
                        "name": "Message_message",
                        "args": null
                      },
                      (v4/*: any*/)
                    ]
                  }
                ]
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MessageList_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "list",
        "name": "contact",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Contact",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "messages",
            "storageKey": null,
            "args": (v7/*: any*/),
            "concreteType": "MessagesConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "MessageEdge",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Message",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "author",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Contact",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "picture",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "data",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "File",
                            "selections": [
                              (v4/*: any*/),
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
                          {
                            "kind": "InlineFragment",
                            "type": "Emoji",
                            "selections": [
                              (v4/*: any*/),
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "emoji",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Text",
                            "selections": [
                              (v4/*: any*/),
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "text",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "dateSended",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "destination",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "ChatRoom",
                            "selections": (v8/*: any*/)
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Contact",
                            "selections": (v8/*: any*/)
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "createdAt",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "readed",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "received",
                        "args": null,
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ]
                  }
                ]
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "messages",
            "args": (v7/*: any*/),
            "handle": "connection",
            "key": "MessageList_messages",
            "filters": null
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MessageList_Query",
    "id": null,
    "text": "query MessageList_Query(\n  $last: Int\n  $before: ID\n  $contactId: ID!\n) {\n  list: contact(contactId: $contactId) {\n    messages(last: $last, before: $before) {\n      edges {\n        cursor\n        node {\n          id\n          ...Message_message\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        startCursor\n        hasPreviousPage\n      }\n      totalCount\n    }\n    id\n  }\n}\n\nfragment Message_message on Message {\n  id\n  author {\n    id\n    picture\n  }\n  data {\n    __typename\n    ... on Text {\n      __typename\n      text\n    }\n    ... on Emoji {\n      __typename\n      emoji\n    }\n    ... on File {\n      __typename\n      url\n      fileName\n    }\n  }\n  dateSended\n  destination {\n    __typename\n    ... on Contact {\n      id\n    }\n    ... on ChatRoom {\n      id\n    }\n  }\n  createdAt\n  readed\n  received\n}\n",
    "metadata": {
      "connection": [
        {
          "count": "last",
          "cursor": "before",
          "direction": "backward",
          "path": [
            "list",
            "messages"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '96c3af71f55f0d826b55c17d2da0d701';
module.exports = node;
