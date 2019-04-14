/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type EditGroup_group$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Header_group$ref: FragmentReference;
export type Header_group = {|
  +name: string,
  +picture: string,
  +$fragmentRefs: EditGroup_group$ref,
  +$refType: Header_group$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Header_group",
  "type": "Group",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "EditGroup_group",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '33c80ae038e373a3259a4afc9878d174';
module.exports = node;
