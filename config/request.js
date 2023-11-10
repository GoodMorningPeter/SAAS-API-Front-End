import axios from 'axios';

// 自定义配置新建一个 ajax 实例
const ajax = axios.create({
    baseURL: 'http://127.0.0.1:8081', // baseURL 我们自己使用的接口的公共部分，也就是基础地址
    timeout: 10000, // timeout  指定请求超时的毫秒数(0 表示无超时时间)
});

// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.params={...config.params,token:'1ec949a15fb709370f'} // 我的接口需要添加一个token才能进行验证
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default ajax; // 默认抛出这个实例
  