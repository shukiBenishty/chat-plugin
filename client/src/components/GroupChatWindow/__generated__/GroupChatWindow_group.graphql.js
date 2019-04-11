/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type GroupMessageList_list$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type GroupChatWindow_group$ref: FragmentReference;
export type GroupChatWindow_group = {|
  +id: string,
  +name: string,
  +picture: string,
  +subscribers: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +username: string,
    +online: boolean,
    +picture: string,
  |}>,
  +$fragmentRefs: GroupMessageList_list$ref,
  +$refType: GroupChatWindow_group$ref,
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "GroupChatWindow_group",
  "type": "Group",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "subscribers",
      "storageKey": null,
      "args": null,
      "concreteType": "Contact",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
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
        (v2/*: any*/)
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "GroupMessageList_list",
      "args": null
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '5806bbed074ad5e44b5586b5156c145f';
module.exports = node;
