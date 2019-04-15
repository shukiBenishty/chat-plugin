/**
 * @flow
 * @relayHash 3d2bf2a6730a29530d9a379f608ba0ad
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContactChatWindow_contact$ref = any;
type GroupMessageList_list$ref = any;
type Header_group$ref = any;
export type Vote = "LIKE" | "UNLIKE" | "%future added value";
export type Launcher_SubscriptionVariables = {||};
export type Launcher_SubscriptionResponse = {|
  +generalInfo: ?{|
    +newContact: ?{|
      +id: string,
      +username: string,
      +newMessages: ?number,
      +$fragmentRefs: ContactChatWindow_contact$ref,
    |},
    +editComment: ?{|
      +id: string,
      +comments: ?{|
        +myVote: ?Vote,
        +likes: number,
        +unlikes: number,
      |},
    |},
    +newGroup: ?{|
      +id: string,
      +name: string,
      +picture: string,
      +$fragmentRefs: Header_group$ref & GroupMessageList_list$ref,
    |},
    +deleteGroup: ?{|
      +id: string
    |},
    +online: ?{|
      +id: string,
      +online: boolean,
    |},
    +readed: ?{|
      +id: string,
      +readed: boolean,
      +destination: {|
        +id?: string,
        +username?: string,
      |},
      +received: boolean,
    |},
    +newMessage: ?{|
      +id: string,
      +author: {|
        +id: string,
        +newMessages: ?number,
      |},
      +comments: ?{|
        +myVote: ?Vote,
        +likes: number,
        +unlikes: number,
      |},
      +data: {|
        +text?: string,
        +emoji?: string,
        +url?: string,
        +fileName?: string,
      |},
      +destination: {|
        +id?: string,
        +username?: string,
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
    newContact {
      id
      username
      ...ContactChatWindow_contact
      newMessages
    }
    editComment {
      id
      comments {
        myVote
        likes
        unlikes
      }
    }
    newGroup {
      id
      name
      picture
      ...Header_group
      ...GroupMessageList_list
    }
    deleteGroup {
      id
    }
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
          username
        }
        ... on Group {
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
      comments {
        myVote
        likes
        unlikes
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
          username
        }
        ... on Group {
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

fragment ContactChatWindow_contact on Contact {
  id
  name
  username
  online
  picture
  newMessages
  ...ContactMessageList_list
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
  "name": "username",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "newMessages",
  "args": null,
  "storageKey": null
},
v3 = {
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
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "editComment",
  "storageKey": null,
  "args": null,
  "concreteType": "Message",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v3/*: any*/)
  ]
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
  "args": null,
  "storageKey": null
},
v7 = [
  (v0/*: any*/)
],
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "deleteGroup",
  "storageKey": null,
  "args": null,
  "concreteType": "Group",
  "plural": false,
  "selections": (v7/*: any*/)
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "online",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "online",
  "storageKey": null,
  "args": null,
  "concreteType": "Contact",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v9/*: any*/)
  ]
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "readed",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "InlineFragment",
  "type": "Group",
  "selections": (v7/*: any*/)
},
v13 = {
  "kind": "InlineFragment",
  "type": "Contact",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ]
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
    (v12/*: any*/),
    (v13/*: any*/)
  ]
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "received",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "author",
  "storageKey": null,
  "args": null,
  "concreteType": "Contact",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v2/*: any*/)
  ]
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fileName",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "InlineFragment",
  "type": "File",
  "selections": [
    (v17/*: any*/),
    (v18/*: any*/)
  ]
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "emoji",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "InlineFragment",
  "type": "Emoji",
  "selections": [
    (v20/*: any*/)
  ]
},
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "text",
  "args": null,
  "storageKey": null
},
v23 = {
  "kind": "InlineFragment",
  "type": "Text",
  "selections": [
    (v22/*: any*/)
  ]
},
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "dateSended",
  "args": null,
  "storageKey": null
},
v25 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v26 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 20,
    "type": "Int"
  }
],
v27 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v28 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v29 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "endCursor",
  "args": null,
  "storageKey": null
},
v30 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "messages",
  "storageKey": "messages(last:20)",
  "args": (v26/*: any*/),
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
        (v27/*: any*/),
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
                (v6/*: any*/)
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
                (v28/*: any*/),
                {
                  "kind": "InlineFragment",
                  "type": "File",
                  "selections": [
                    (v28/*: any*/),
                    (v17/*: any*/),
                    (v18/*: any*/)
                  ]
                },
                {
                  "kind": "InlineFragment",
                  "type": "Emoji",
                  "selections": [
                    (v28/*: any*/),
                    (v20/*: any*/)
                  ]
                },
                {
                  "kind": "InlineFragment",
                  "type": "Text",
                  "selections": [
                    (v28/*: any*/),
                    (v22/*: any*/)
                  ]
                }
              ]
            },
            (v24/*: any*/),
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "destination",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                (v28/*: any*/),
                (v12/*: any*/),
                {
                  "kind": "InlineFragment",
                  "type": "Contact",
                  "selections": (v7/*: any*/)
                }
              ]
            },
            (v25/*: any*/),
            (v11/*: any*/),
            (v15/*: any*/),
            (v3/*: any*/),
            (v28/*: any*/)
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
        (v29/*: any*/),
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
v31 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647,
    "type": "Int"
  }
],
v32 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "destination",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    (v28/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/)
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "newContact",
            "storageKey": null,
            "args": null,
            "concreteType": "Contact",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "kind": "FragmentSpread",
                "name": "ContactChatWindow_contact",
                "args": null
              },
              (v2/*: any*/)
            ]
          },
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "newGroup",
            "storageKey": null,
            "args": null,
            "concreteType": "Group",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
          },
          (v8/*: any*/),
          (v10/*: any*/),
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
              (v11/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
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
              (v16/*: any*/),
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "data",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": false,
                "selections": [
                  (v19/*: any*/),
                  (v21/*: any*/),
                  (v23/*: any*/)
                ]
              },
              (v14/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v11/*: any*/),
              (v15/*: any*/)
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "newContact",
            "storageKey": null,
            "args": null,
            "concreteType": "Contact",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v5/*: any*/),
              (v9/*: any*/),
              (v6/*: any*/),
              (v2/*: any*/),
              (v30/*: any*/),
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "messages",
                "args": (v26/*: any*/),
                "handle": "connection",
                "key": "ContactMessageList_messages",
                "filters": null
              }
            ]
          },
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "newGroup",
            "storageKey": null,
            "args": null,
            "concreteType": "Group",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "subscribers",
                "storageKey": "subscribers(first:2147483647)",
                "args": (v31/*: any*/),
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
                          (v5/*: any*/),
                          (v28/*: any*/)
                        ]
                      },
                      (v27/*: any*/)
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
                      (v29/*: any*/),
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
                "args": (v31/*: any*/),
                "handle": "connection",
                "key": "EditGroup_subscribers",
                "filters": null
              },
              (v30/*: any*/),
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "messages",
                "args": (v26/*: any*/),
                "handle": "connection",
                "key": "GroupMessageList_messages",
                "filters": null
              }
            ]
          },
          (v8/*: any*/),
          (v10/*: any*/),
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
              (v11/*: any*/),
              (v32/*: any*/),
              (v15/*: any*/)
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
              (v16/*: any*/),
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "data",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": false,
                "selections": [
                  (v28/*: any*/),
                  (v19/*: any*/),
                  (v21/*: any*/),
                  (v23/*: any*/)
                ]
              },
              (v32/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v11/*: any*/),
              (v15/*: any*/)
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
    "text": "subscription Launcher_Subscription {\n  generalInfo {\n    newContact {\n      id\n      username\n      ...ContactChatWindow_contact\n      newMessages\n    }\n    editComment {\n      id\n      comments {\n        myVote\n        likes\n        unlikes\n      }\n    }\n    newGroup {\n      id\n      name\n      picture\n      ...Header_group\n      ...GroupMessageList_list\n    }\n    deleteGroup {\n      id\n    }\n    online {\n      id\n      online\n    }\n    readed {\n      id\n      readed\n      destination {\n        __typename\n        ... on Contact {\n          id\n          username\n        }\n        ... on Group {\n          id\n        }\n      }\n      received\n    }\n    newMessage {\n      id\n      author {\n        id\n        newMessages\n      }\n      comments {\n        myVote\n        likes\n        unlikes\n      }\n      data {\n        __typename\n        ... on Text {\n          text\n        }\n        ... on Emoji {\n          emoji\n        }\n        ... on File {\n          url\n          fileName\n        }\n      }\n      destination {\n        __typename\n        ... on Contact {\n          id\n          username\n        }\n        ... on Group {\n          id\n        }\n      }\n      dateSended\n      createdAt\n      readed\n      received\n    }\n  }\n}\n\nfragment ContactChatWindow_contact on Contact {\n  id\n  name\n  username\n  online\n  picture\n  newMessages\n  ...ContactMessageList_list\n}\n\nfragment Header_group on Group {\n  name\n  picture\n  ...EditGroup_group\n}\n\nfragment GroupMessageList_list on Group {\n  messages(last: 20) {\n    edges {\n      cursor\n      node {\n        id\n        ...Message_message\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      startCursor\n      hasPreviousPage\n    }\n    totalCount\n  }\n}\n\nfragment Message_message on Message {\n  id\n  author {\n    id\n    picture\n  }\n  data {\n    __typename\n    ... on Text {\n      __typename\n    }\n    ... on Emoji {\n      __typename\n      emoji\n    }\n    ... on File {\n      __typename\n      url\n      fileName\n    }\n  }\n  dateSended\n  destination {\n    __typename\n    ... on Contact {\n      id\n    }\n    ... on Group {\n      id\n    }\n  }\n  createdAt\n  readed\n  received\n  ...TextMessage_textMessage\n}\n\nfragment TextMessage_textMessage on Message {\n  id\n  data {\n    __typename\n    ... on Text {\n      text\n    }\n  }\n  comments {\n    myVote\n    likes\n    unlikes\n  }\n}\n\nfragment EditGroup_group on Group {\n  id\n  subscribers(first: 2147483647) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ContactMessageList_list on Contact {\n  messages(last: 20) {\n    edges {\n      cursor\n      node {\n        id\n        ...Message_message\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      startCursor\n      hasPreviousPage\n    }\n    totalCount\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '889e4bcd7a0a594fbc0ee6b00dd29cac';
module.exports = node;
