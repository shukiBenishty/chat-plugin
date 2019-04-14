/**
 * @flow
 * @relayHash 365f185f47d6557d010416acb1472f11
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Search_QueryVariables = {||};
export type Search_QueryResponse = {|
  +contacts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +username: string,
    +picture: string,
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
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "contacts",
    "storageKey": null,
    "args": null,
    "concreteType": "Contact",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
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
        "name": "username",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "picture",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "Search_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Search_Query",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "Search_Query",
    "id": null,
    "text": "query Search_Query {\n  contacts {\n    id\n    name\n    username\n    picture\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a48a3a27ac599f1ba8b39ce99d7a8f80';
module.exports = node;
