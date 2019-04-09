/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ContactItem_contact$ref: FragmentReference;
export type ContactItem_contact = {|
  +id: string,
  +name: string,
  +newMessages: ?number,
  +online: boolean,
  +picture: string,
  +messages: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +author: {|
          +id: string
        |},
        +data: {|
          +__typename: "Text",
          +text?: string,
          +emoji?: string,
          +url?: string,
          +fileName?: string,
        |},
        +readed: boolean,
        +received: boolean,
      |}
    |}>
  |},
  +$refType: ContactItem_contact$ref,
|};
*/


const node/*: ReaderFragment*/ = (function(){
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
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ContactItem_contact",
  "type": "Contact",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "backward",
        "path": [
          "messages"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 20
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "ID",
      "defaultValue": null
    }
  ],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "newMessages",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "online",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "picture",
      "args": null,
      "storageKey": null
    },
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
                    (v0/*: any*/)
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
                    {
                      "kind": "InlineFragment",
                      "type": "File",
                      "selections": [
                        (v1/*: any*/),
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
                        (v1/*: any*/),
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
                        (v1/*: any*/),
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
                (v1/*: any*/)
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
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
              "name": "hasPreviousPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "startCursor",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '4e811677d0cb1773901c5fc72acf986b';
module.exports = node;
