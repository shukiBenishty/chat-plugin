/**
 * @flow
 * @relayHash 4a2cdfee6c34e32b25bb9897ea7e537b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Message_message$ref = any;
export type GroupMessageList_QueryVariables = {|
  last?: ?number,
  before?: ?string,
  groupId: string,
|};
export type GroupMessageList_QueryResponse = {|
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
export type GroupMessageList_Query = {|
  variables: GroupMessageList_QueryVariables,
  response: GroupMessageList_QueryResponse,
|};
*/


/*
query GroupMessageList_Query(
  $last: Int
  $before: ID
  $groupId: ID!
) {
  list: group(groupId: $groupId) {
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
    ... on Group {
      id
    }
  }
  createdAt
  readed
  received
  ...TextMessage_textMessage
}

fragment TextMessage_textMessage on Message {
  id
  data {
    __typename
    ... on Text {
      text
    }
  }
  comments {
    myVote
    likes
    unlikes
  }
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
    "name": "groupId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "groupId",
    "variableName": "groupId",
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
    "name": "GroupMessageList_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "list",
        "name": "group",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Group",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "messages",
            "name": "__GroupMessageList_messages_connection",
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
    "name": "GroupMessageList_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "list",
        "name": "group",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Group",
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
                            "type": "Group",
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
            "key": "GroupMessageList_messages",
            "filters": null
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GroupMessageList_Query",
    "id": null,
    "text": "query GroupMessageList_Query(\n  $last: Int\n  $before: ID\n  $groupId: ID!\n) {\n  list: group(groupId: $groupId) {\n    messages(last: $last, before: $before) {\n      edges {\n        cursor\n        node {\n          id\n          ...Message_message\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        startCursor\n        hasPreviousPage\n      }\n      totalCount\n    }\n    id\n  }\n}\n\nfragment Message_message on Message {\n  id\n  author {\n    id\n    picture\n  }\n  data {\n    __typename\n    ... on Text {\n      __typename\n    }\n    ... on Emoji {\n      __typename\n      emoji\n    }\n    ... on File {\n      __typename\n      url\n      fileName\n    }\n  }\n  dateSended\n  destination {\n    __typename\n    ... on Contact {\n      id\n    }\n    ... on Group {\n      id\n    }\n  }\n  createdAt\n  readed\n  received\n  ...TextMessage_textMessage\n}\n\nfragment TextMessage_textMessage on Message {\n  id\n  data {\n    __typename\n    ... on Text {\n      text\n    }\n  }\n  comments {\n    myVote\n    likes\n    unlikes\n  }\n}\n",
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
(node/*: any*/).hash = '8089085a9823df946ce49dc8402361c2';
module.exports = node;
