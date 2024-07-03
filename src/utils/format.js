import { cloneDeep } from 'lodash-es';
import { h } from 'vue';

import { Icon } from '@/components/Icon/index';

export function flatToTree(list, root) {
  return list
    .filter((item) => {
      const pathArray = item.sidcc.substring(1, item.sidcc.length - 1).split('/');
      const parentId = pathArray[pathArray.length - 2];
      return parentId === root;
    })
    .map((item) => ({ ...item, children: flatToTree(list, item.id) }));
}

export function treeToRoute(tree) {
  const tempTree = cloneDeep(tree);
  return tempTree;
}

export function treeToMenu(tree) {
  const tempTree = cloneDeep(tree);
  const result = tempTree.length
    ? tempTree.map((item) => {
        return {
          // ...item,
          key: item.id,
          label: item.name,
          title: item.title,
          icon: h(Icon, { icon: 'MenuUnfoldOutlined' }),
          popupClassName: 'popupClassName',
          children: treeToMenu(item.children),
        };
      })
    : null;
  return result;
}
