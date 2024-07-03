import { http } from '@/utils/http';

export const loginApi = ({ get, post, options }) => {
  return http.post({ url: '/api/auth/loginin', params: get, data: post }, options);
};

export const getUserInfoApi = ({ get, post, options }) => {
  return http.get({ url: '/api/base/user/sysUser/noAuthUser', params: get, data: post }, options);
};

export const getMenuApi = ({ get, post, options }) => {
  return http.post(
    { url: '/api/base/menu/sysMenu/noAuthReadSystemMenu', params: get, data: post },
    options,
  );
};

export const getGlobalConfigApi = ({ get, post, options }) => {
  return http.get(
    {
      url: '/api/base/config/sysConfig/noGetwayRead',
      params: get,
      data: post,
    },
    options,
  );
};
