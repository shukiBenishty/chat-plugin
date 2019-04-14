/**
 * @flow
 * @relayHash f4ef7dc387cb21a2966946395b219a4a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditGroup_QueryVariables = {||};
export type EditGroup_QueryResponse = {|
  +contacts: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type EditGroup_Query = {|
  variables: EditGroup_QueryVariables,
  response: EditGroup_QueryResponse,
|};
*/


/*
query EditGroup_Query {
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
    "name": "EditGroup_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "EditGroup_Query",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "EditGroup_Query",
    "id": null,
    "text": "query EditGroup_Query {\n  contacts(all: true) {\n    id\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '71f3417ab8c76a88a2641ebdd58cd1f5';
module.exports = node;
