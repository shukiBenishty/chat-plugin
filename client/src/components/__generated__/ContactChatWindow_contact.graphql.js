/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ContactMessageList_list$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ContactChatWindow_contact$ref: FragmentReference;
export type ContactChatWindow_contact = {|
  +id: string,
  +name: string,
  +username: string,
  +online: boolean,
  +picture: string,
  +newMessages: ?number,
  +$fragmentRefs: ContactMessageList_list$ref,
  +$refType: ContactChatWindow_contact$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ContactChatWindow_contact",
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
      "name": "ContactMessageList_list",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '3c78b4be4aa161d146fc021e5ab00c4f';
module.exports = node;
