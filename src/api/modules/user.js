import { http } from "@/utils/http";

export const loginApi = ({ get, post, options }) => {
  return http.post({ url: "/api/auth/loginin", params: get, data: post });
};

export const testGet = ({ get, post, options }) => {
  return http.post({
    url: "/api/xjsh/board/shBoard/noLoginSale",
    params: get,
    data: post,
  });
};
