/**
 * @flow
 * @relayHash d0c62a13841f62f6e38759921580cdec
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
    "text": "query Search_Query {\n  contacts {\n    id\n    name\n    username\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '784f6e3b05ffb22d31dbabc99914d9b6';
module.exports = node;
