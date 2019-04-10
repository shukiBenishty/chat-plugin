/**
 * @flow
 * @relayHash d770b3551b9ad11973d24555aef5fa24
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContactChatWindow_contact$ref = any;
export type Search_QueryVariables = {||};
export type Search_QueryResponse = {|
  +contacts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +username: string,
    +picture: string,
    +newMessages: ?number,
    +$fragmentRefs: ContactChatWindow_contact$ref,
  |}>
|};
export type Search_Query = {|
  variables: Search_QueryVariables,
  response: Search_QueryResponse,
|};
*/


/*
query Search_Query {
  contacts {
    id
    name
    username
    picture
    ...ContactChatWindow_contact
    newMessages
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
    ... on Group {
      id
    }
  }
  createdAt
  readed
  received
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
  "name": "picture",
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
v5 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 20,
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
v7 = [
  (v0/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "Search_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "contacts",
        "storageKey": null,
        "args": null,
        "concreteType": "Contact",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "ContactChatWindow_contact",
            "args": null
          },
          (v4/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "Search_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "contacts",
        "storageKey": null,
        "args": null,
        "concreteType": "Contact",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "online",
            "args": null,
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "messages",
            "storageKey": "messages(last:20)",
            "args": (v5/*: any*/),
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  },
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
                          (v3/*: any*/)
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
                            "selections": (v7/*: any*/)
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Contact",
                            "selections": (v7/*: any*/)
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
            "args": (v5/*: any*/),
            "handle": "connection",
            "key": "ContactMessageList_messages",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "Search_Query",
    "id": null,
    "text": "query Search_Query {\n  contacts {\n    id\n    name\n    username\n    picture\n    ...ContactChatWindow_contact\n    newMessages\n  }\n}\n\nfragment ContactChatWindow_contact on Contact {\n  id\n  name\n  username\n  online\n  picture\n  newMessages\n  ...ContactMessageList_list\n}\n\nfragment ContactMessageList_list on Contact {\n  messages(last: 20) {\n    edges {\n      cursor\n      node {\n        id\n        ...Message_message\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      startCursor\n      hasPreviousPage\n    }\n    totalCount\n  }\n}\n\nfragment Message_message on Message {\n  id\n  author {\n    id\n    picture\n  }\n  data {\n    __typename\n    ... on Text {\n      __typename\n      text\n    }\n    ... on Emoji {\n      __typename\n      emoji\n    }\n    ... on File {\n      __typename\n      url\n      fileName\n    }\n  }\n  dateSended\n  destination {\n    __typename\n    ... on Contact {\n      id\n    }\n    ... on Group {\n      id\n    }\n  }\n  createdAt\n  readed\n  received\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '89a2fbf06e6b44b0122b76b3ec64ce2c';
module.exports = node;
