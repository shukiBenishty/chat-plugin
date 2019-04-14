/**
 * @flow
 * @relayHash 221703b6eb64c3e0d0746aff6ed8692d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateGroup_QueryVariables = {||};
export type CreateGroup_QueryResponse = {|
  +contacts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type CreateGroup_Query = {|
  variables: CreateGroup_QueryVariables,
  response: CreateGroup_QueryResponse,
|};
*/


/*
query CreateGroup_Query {
  contacts(all: true) {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "contacts",
    "storageKey": "contacts(all:true)",
    "args": [
      {
        "kind": "Literal",
        "name": "all",
        "value": true,
        "type": "Boolean"
      }
    ],
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateGroup_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateGroup_Query",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "CreateGroup_Query",
    "id": null,
    "text": "query CreateGroup_Query {\n  contacts(all: true) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2b6fdb026d5b0a1715a80f9187ce67b9';
module.exports = node;
