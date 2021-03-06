/**
 * @flow
 * @relayHash ca9f4cfb30389e86569f13562c4dae9f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContactChatWindow_contact$ref = any;
type ContactsWindow_user$ref = any;
type GroupChatWindow_group$ref = any;
export type Launcher_QueryVariables = {||};
export type Launcher_QueryResponse = {|
  +me: ?{|
    +id: string,
    +name: string,
    +username: string,
    +admin: boolean,
    +contacts: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +username: string,
          +newMessages: ?number,
          +$fragmentRefs: ContactChatWindow_contact$ref,
        |}
      |}>
    |},
    +groups: ?{|
      +edges: $ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +newMessages: ?number,
          +$fragmentRefs: GroupChatWindow_group$ref,
        |}
      |}>
    |},
    +$fragmentRefs: ContactsWindow_user$ref,
  |}
|};
export type Launcher_Query = {|
  variables: Launcher_QueryVariables,
  response: Launcher_QueryResponse,
|};
*/


/*
query Launcher_Query {
  me {
    id
    name
    username
    admin
    contacts(first: 2147483647) {
      edges {
        node {
          id
          username
          ...ContactChatWindow_contact
          newMessages
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    groups(first: 2147483647) {
      edges {
        node {
          id
          ...GroupChatWindow_group
          newMessages
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    ...ContactsWindow_user
  }
}

fragment ContactChatWindow_contact on Contact {
  id
  name
  username
  online
  picture
  newMessages
  ...ContactMessageList_list
}

fragment GroupChatWindow_group on Group {
  id
  name
  picture
  ...Header_group
  ...GroupMessageList_list
}

fragment ContactsWindow_user on User {
  contacts(first: 2147483647) {
    edges {
      node {
        id
        ...ContactItem_contact
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  groups(first: 2147483647) {
    edges {
      node {
        id
        ...GroupItem_group
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

fragment ContactItem_contact on Contact {
  id
  name
  newMessages
  online
  picture
  messages(last: 20) {
    edges {
      node {
        id
        author {
          id
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
        readed
        received
        __typename
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
  }
}

fragment GroupItem_group on Group {
  id
  name
  newMessages
  picture
  messages(last: 20) {
    edges {
      node {
        id
        author {
          id
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
        readed
        received
        __typename
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
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

fragment ContactMessageList_list on Contact {
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "username",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "admin",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "newMessages",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "endCursor",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pageInfo",
  "storageKey": null,
  "args": null,
  "concreteType": "PageInfo",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasNextPage",
      "args": null,
      "storageKey": null
    }
  ]
},
v9 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647,
    "type": "Int"
  }
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
  "args": null,
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 20,
    "type": "Int"
  }
],
v12 = [
  (v0/*: any*/)
],
v13 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "messages",
  "storageKey": "messages(last:20)",
  "args": (v11/*: any*/),
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
        (v6/*: any*/),
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Message",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "author",
              "storageKey": null,
              "args": null,
              "concreteType": "Contact",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v10/*: any*/)
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
                (v5/*: any*/),
                {
                  "kind": "InlineFragment",
                  "type": "File",
                  "selections": [
                    (v5/*: any*/),
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
                    (v5/*: any*/),
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
                    (v5/*: any*/),
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
                (v5/*: any*/),
                {
                  "kind": "InlineFragment",
                  "type": "Group",
                  "selections": (v12/*: any*/)
                },
                {
                  "kind": "InlineFragment",
                  "type": "Contact",
                  "selections": (v12/*: any*/)
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
            (v5/*: any*/)
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
        (v7/*: any*/),
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "Launcher_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": "contacts",
            "name": "__Launcher_contacts_connection",
            "storageKey": null,
            "args": null,
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
                      (v0/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "FragmentSpread",
                        "name": "ContactChatWindow_contact",
                        "args": null
                      },
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
                ]
              },
              (v8/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "groups",
            "name": "__Launcher_groups_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "GroupsConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "GroupEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Group",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "kind": "FragmentSpread",
                        "name": "GroupChatWindow_group",
                        "args": null
                      },
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
                ]
              },
              (v8/*: any*/)
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "ContactsWindow_user",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "Launcher_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "contacts",
            "storageKey": "contacts(first:2147483647)",
            "args": (v9/*: any*/),
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
                      (v0/*: any*/),
                      (v2/*: any*/),
                      (v1/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "online",
                        "args": null,
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      (v4/*: any*/),
                      (v13/*: any*/),
                      {
                        "kind": "LinkedHandle",
                        "alias": null,
                        "name": "messages",
                        "args": (v11/*: any*/),
                        "handle": "connection",
                        "key": "ContactMessageList_messages",
                        "filters": null
                      },
                      (v5/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
                ]
              },
              (v8/*: any*/)
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "contacts",
            "args": (v9/*: any*/),
            "handle": "connection",
            "key": "Launcher_contacts",
            "filters": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "groups",
            "storageKey": "groups(first:2147483647)",
            "args": (v9/*: any*/),
            "concreteType": "GroupsConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "GroupEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Group",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v10/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "subscribers",
                        "storageKey": "subscribers(first:2147483647)",
                        "args": (v9/*: any*/),
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
                                  (v0/*: any*/),
                                  (v1/*: any*/),
                                  (v5/*: any*/)
                                ]
                              },
                              (v6/*: any*/)
                            ]
                          },
                          (v8/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedHandle",
                        "alias": null,
                        "name": "subscribers",
                        "args": (v9/*: any*/),
                        "handle": "connection",
                        "key": "EditGroup_subscribers",
                        "filters": null
                      },
                      (v13/*: any*/),
                      {
                        "kind": "LinkedHandle",
                        "alias": null,
                        "name": "messages",
                        "args": (v11/*: any*/),
                        "handle": "connection",
                        "key": "GroupMessageList_messages",
                        "filters": null
                      },
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
                ]
              },
              (v8/*: any*/)
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "groups",
            "args": (v9/*: any*/),
            "handle": "connection",
            "key": "Launcher_groups",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "Launcher_Query",
    "id": null,
    "text": "query Launcher_Query {\n  me {\n    id\n    name\n    username\n    admin\n    contacts(first: 2147483647) {\n      edges {\n        node {\n          id\n          username\n          ...ContactChatWindow_contact\n          newMessages\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    groups(first: 2147483647) {\n      edges {\n        node {\n          id\n          ...GroupChatWindow_group\n          newMessages\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    ...ContactsWindow_user\n  }\n}\n\nfragment ContactChatWindow_contact on Contact {\n  id\n  name\n  username\n  online\n  picture\n  newMessages\n  ...ContactMessageList_list\n}\n\nfragment GroupChatWindow_group on Group {\n  id\n  name\n  picture\n  ...Header_group\n  ...GroupMessageList_list\n}\n\nfragment ContactsWindow_user on User {\n  contacts(first: 2147483647) {\n    edges {\n      node {\n        id\n        ...ContactItem_contact\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  groups(first: 2147483647) {\n    edges {\n      node {\n        id\n        ...GroupItem_group\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ContactItem_contact on Contact {\n  id\n  name\n  newMessages\n  online\n  picture\n  messages(last: 20) {\n    edges {\n      node {\n        id\n        author {\n          id\n        }\n        data {\n          __typename\n          ... on Text {\n            __typename\n            text\n          }\n          ... on Emoji {\n            __typename\n            emoji\n          }\n          ... on File {\n            __typename\n            url\n            fileName\n          }\n        }\n        readed\n        received\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment GroupItem_group on Group {\n  id\n  name\n  newMessages\n  picture\n  messages(last: 20) {\n    edges {\n      node {\n        id\n        author {\n          id\n        }\n        data {\n          __typename\n          ... on Text {\n            __typename\n            text\n          }\n          ... on Emoji {\n            __typename\n            emoji\n          }\n          ... on File {\n            __typename\n            url\n            fileName\n          }\n        }\n        readed\n        received\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment Header_group on Group {\n  name\n  picture\n  ...EditGroup_group\n}\n\nfragment GroupMessageList_list on Group {\n  messages(last: 20) {\n    edges {\n      cursor\n      node {\n        id\n        ...Message_message\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      startCursor\n      hasPreviousPage\n    }\n    totalCount\n  }\n}\n\nfragment Message_message on Message {\n  id\n  author {\n    id\n    picture\n  }\n  data {\n    __typename\n    ... on Text {\n      __typename\n    }\n    ... on Emoji {\n      __typename\n      emoji\n    }\n    ... on File {\n      __typename\n      url\n      fileName\n    }\n  }\n  dateSended\n  destination {\n    __typename\n    ... on Contact {\n      id\n    }\n    ... on Group {\n      id\n    }\n  }\n  createdAt\n  readed\n  received\n  ...TextMessage_textMessage\n}\n\nfragment TextMessage_textMessage on Message {\n  id\n  data {\n    __typename\n    ... on Text {\n      text\n    }\n  }\n  comments {\n    myVote\n    likes\n    unlikes\n  }\n}\n\nfragment EditGroup_group on Group {\n  id\n  subscribers(first: 2147483647) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ContactMessageList_list on Contact {\n  messages(last: 20) {\n    edges {\n      cursor\n      node {\n        id\n        ...Message_message\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      startCursor\n      hasPreviousPage\n    }\n    totalCount\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "me",
            "contacts"
          ]
        },
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "me",
            "groups"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c3634bc3d8bc2534047e901acb2def28';
module.exports = node;
