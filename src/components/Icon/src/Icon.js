import * as IconsVue from '@ant-design/icons-vue';
import { h } from 'vue';

export const Icon = (props) => {
  const { icon } = props;
  return h(IconsVue[icon]);
};
