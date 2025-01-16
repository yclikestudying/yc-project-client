import axios from "axios";
import useGlobalStore from "@/store";

// 状态管理
const globalStore = useGlobalStore()

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// 封装 get 方法
export function get_request(url, paramsObj) {
  return request.get(url, {
    params: paramsObj
  });
}

// 封装 delete 方法
export function delete_request(url, paramsObj) {
  return request.delete(url, {
    params: paramsObj
  });
}

// 封装 post 请求
export function post_request(url, data) {
  return request.post(url, data);
}

// 封装 put 请求
export function put_request(url, data) {
  return request.put(url, data);
}

// 请求拦截
request.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = globalStore.token ?? null; // 携带请求头
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (config) => {
    return config.data; // 去掉一层结构
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
