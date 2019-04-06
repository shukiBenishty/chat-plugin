/**
 * @flow
 * @relayHash 7f364ea57fef00c1cf563c2c860cebdb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ContactItem_SubscriptionVariables = {|
  contactId?: ?string
|};
export type ContactItem_SubscriptionResponse = {|
  +generalInfo: ?{|
    +typing: ?{|
      +id: string
    |},
    +typingForMe: ?{|
      +id: string
    |},
  |}
|};
export type ContactItem_Subscription = {|
  variables: ContactItem_SubscriptionVariables,
  response: ContactItem_SubscriptionResponse,
|};
*/


/*
subscription ContactItem_Subscription(
  $contactId: ID
) {
  generalInfo(contactId: $contactId) {
    typing {
      id
    }
    typingForMe {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "contactId",
    "type": "ID",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "id",
    "args": null,
    "storageKey": null
  }
],
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "generalInfo",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "contactId",
        "variableName": "contactId",
        "type": "ID"
      }
    ],
    "concreteType": "generalInfo",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "typing",
        "storageKey": null,
        "args": null,
        "concreteType": "Contact",
        "plural": false,
        "selections": (v1/*: any*/)
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "typingForMe",
        "storageKey": null,
        "args": null,
        "concreteType": "Contact",
        "plural": false,
        "selections": (v1/*: any*/)
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ContactItem_Subscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ContactItem_Subscription",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "subscription",
    "name": "ContactItem_Subscription",
    "id": null,
    "text": "subscription ContactItem_Subscription(\n  $contactId: ID\n) {\n  generalInfo(contactId: $contactId) {\n    typing {\n      id\n    }\n    typingForMe {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2dae93e76032bb78384b44a5fa9aaf1d';
module.exports = node;
