import { http } from "@/utils/http";
export const loginApi = ({ get, post, options }) => {
  return http.post(
    { url: "/api/auth/loginin", params: get, data: post },
    options
  );
};

export const testNoAuth = ({ get, post, options }) => {
  return http.post({
    url: "/api/xjsh/board/shBoard/noLoginSale",
    params: get,
    data: post,
  });
};

export const testAuth = ({ get, post, options }) => {
  return http.post({
    url: "api/butler/to/behavior/call?moduleCode=production_line_module&datasetCode=dsProductionLine&behaviorKey=readGrid&pageno=1&pagesize=20",
    params: get,
    data: post,
  });
};
