/**
 * @flow
 * @relayHash 09b561dbb41ea3cc49291f050d36ac94
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type GroupMessageList_list$ref = any;
type Header_group$ref = any;
export type editGroup_MutationVariables = {|
  groupId: string,
  subscribers?: ?$ReadOnlyArray<string>,
  unsubscribers?: ?$ReadOnlyArray<string>,
|};
export type editGroup_MutationResponse = {|
  +editGroup: ?{|
    +id: string,
    +name: string,
    +picture: string,
    +$fragmentRefs: Header_group$ref & GroupMessageList_list$ref,
  |}
|};
export type editGroup_Mutation = {|
  variables: editGroup_MutationVariables,
  response: editGroup_MutationResponse,
|};
*/


/*
mutation editGroup_Mutation(
  $groupId: ID!
  $subscribers: [ID!]
  $unsubscribers: [ID!]
) {
  editGroup(groupId: $groupId, subscribers: $subscribers, unsubscribers: $unsubscribers) {
    id
    name
    picture
    ...Header_group
    ...GroupMessageList_list
  }
}

fragment Header_group on Group {
  name
  picture
  ...EditGroup_group
}

fragment GroupMessageList_list on Group {
  messages(last: 20) {
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

fragment EditGroup_group on Group {
  id
  subscribers(first: 2147483647) {
    edges {
      node {
        id
        name
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "groupId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "subscribers",
    "type": "[ID!]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "unsubscribers",
    "type": "[ID!]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "groupId",
    "variableName": "groupId",
    "type": "ID!"
  },
  {
    "kind": "Variable",
    "name": "subscribers",
    "variableName": "subscribers",
    "type": "[ID!]"
  },
  {
    "kind": "Variable",
    "name": "unsubscribers",
    "variableName": "unsubscribers",
    "type": "[ID!]"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
  "args": null,
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647,
    "type": "Int"
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "endCursor",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 20,
    "type": "Int"
  }
],
v10 = [
  (v2/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "editGroup_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editGroup",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Group",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "Header_group",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "GroupMessageList_list",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "editGroup_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editGroup",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Group",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "subscribers",
            "storageKey": "subscribers(first:2147483647)",
            "args": (v5/*: any*/),
            "concreteType": "ContactsConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ContactEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Contact",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v6/*: any*/)
                    ]
                  },
                  (v7/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "subscribers",
            "args": (v5/*: any*/),
            "handle": "connection",
            "key": "EditGroup_subscribers",
            "filters": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "messages",
            "storageKey": "messages(last:20)",
            "args": (v9/*: any*/),
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
                  (v7/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Message",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "author",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Contact",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/)
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
                          (v6/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "File",
                            "selections": [
                              (v6/*: any*/),
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
                              (v6/*: any*/),
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
                              (v6/*: any*/),
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
                          (v6/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "Group",
                            "selections": (v10/*: any*/)
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Contact",
                            "selections": (v10/*: any*/)
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
                      (v6/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "totalCount",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "messages",
            "args": (v9/*: any*/),
            "handle": "connection",
            "key": "GroupMessageList_messages",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "editGroup_Mutation",
    "id": null,
    "text": "mutation editGroup_Mutation(\n  $groupId: ID!\n  $subscribers: [ID!]\n  $unsubscribers: [ID!]\n) {\n  editGroup(groupId: $groupId, subscribers: $subscribers, unsubscribers: $unsubscribers) {\n    id\n    name\n    picture\n    ...Header_group\n    ...GroupMessageList_list\n  }\n}\n\nfragment Header_group on Group {\n  name\n  picture\n  ...EditGroup_group\n}\n\nfragment GroupMessageList_list on Group {\n  messages(last: 20) {\n    edges {\n      cursor\n      node {\n        id\n        ...Message_message\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      startCursor\n      hasPreviousPage\n    }\n    totalCount\n  }\n}\n\nfragment Message_message on Message {\n  id\n  author {\n    id\n    picture\n  }\n  data {\n    __typename\n    ... on Text {\n      __typename\n    }\n    ... on Emoji {\n      __typename\n      emoji\n    }\n    ... on File {\n      __typename\n      url\n      fileName\n    }\n  }\n  dateSended\n  destination {\n    __typename\n    ... on Contact {\n      id\n    }\n    ... on Group {\n      id\n    }\n  }\n  createdAt\n  readed\n  received\n  ...TextMessage_textMessage\n}\n\nfragment TextMessage_textMessage on Message {\n  id\n  data {\n    __typename\n    ... on Text {\n      text\n    }\n  }\n  comments {\n    myVote\n    likes\n    unlikes\n  }\n}\n\nfragment EditGroup_group on Group {\n  id\n  subscribers(first: 2147483647) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd8ce3937e277490b2b2d9f9ccf53d3c3';
module.exports = node;
