/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type MessageList_list$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatWindow_contact$ref: FragmentReference;
export type ChatWindow_contact = {|
  +id: string,
  +name: string,
  +username: string,
  +online: boolean,
  +picture: string,
  +newMessages: ?number,
  +$fragmentRefs: MessageList_list$ref,
  +$refType: ChatWindow_contact$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ChatWindow_contact",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [],
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
      "kind": "ScalarField",
      "alias": null,
      "name": "newMessages",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "MessageList_list",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '0cf9a9c68ce06374d6c71e215f64fa6f';
module.exports = node;
