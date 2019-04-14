/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type GroupMessageList_list$ref = any;
type Header_group$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type GroupChatWindow_group$ref: FragmentReference;
export type GroupChatWindow_group = {|
  +id: string,
  +name: string,
  +picture: string,
  +$fragmentRefs: Header_group$ref & GroupMessageList_list$ref,
  +$refType: GroupChatWindow_group$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "GroupChatWindow_group",
  "type": "Group",
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
      "name": "picture",
      "args": null,
      "storageKey": null
    },
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
};
// prettier-ignore
(node/*: any*/).hash = '734a42b83186da5e6a27162de755b34d';
module.exports = node;
