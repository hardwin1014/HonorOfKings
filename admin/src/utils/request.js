import axios from "axios";
import Vue from "vue";
import router from "@/router";

export const request = axios.create({
  baseURL: "http://127.0.0.1:3000/admin/api", // 接口的基本路径
  // transformResponse 允许自定义原始的响应数据（字符串）
  // transformResponse: [
  //   function (data) {
  //     try {
  //       // 如果转换成功则返回转换的数据结果
  //       return data;
  //     } catch (err) {
  //       // 如果转换失败，则包装为统一数据格式并返回
  //       return {
  //         data,
  //       };
  //     }
  //   },
  // ],
});

// 请求拦截器
// 拦截上面的响应，前端收到任何错误都会走相应拦截器
request.interceptors.response.use(
  function (config) {
    // 请求发起会经过这里
    // config配置对象:本次请求的请求配置对象
    return config;
  },
  function (err) {
    if (err.response.data.message) {
      Vue.prototype.$message.error(err.response.data.message);
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
    // 请求出错了，还没有发出去会进入这里
    return Promise.reject(err);
  }
);

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    if (localStorage.token) {
      // 请求Bearer加空格，规范  前端请求的时候加上的
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
export default request;
