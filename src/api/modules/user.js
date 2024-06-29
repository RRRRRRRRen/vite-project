import { http } from '@/utils/http';

export const loginApi = ({ get, post, options }) => {
  return http.post({ url: '/api/auth/loginin', params: get, data: post }, options);
};

export const getUserInfoApi = ({ get, post, options }) => {
  return http.get({ url: '/api/base/user/sysUser/noAuthUser', params: get, data: post }, options);
};

export const getGlobalConfigApi = ({ get, post, options }) => {
  return http.get(
    {
      url: '/api/base/config/sysConfig/noGetwayRead?skey=base_config',
      params: get,
      data: post,
    },
    options,
  );
};

export const testNoAuth = ({ get, post, options }) => {
  return http.post({
    url: '/api/xjsh/board/shBoard/noLoginSale',
    params: get,
    data: post,
  });
};

export const testAuth = ({ get, post, options }) => {
  return http.post({
    url: 'api/butler/to/behavior/call?moduleCode=production_line_module&datasetCode=dsProductionLine&behaviorKey=readGrid&pageno=1&pagesize=20',
    params: get,
    data: post,
  });
};
