import axios from 'axios';
import qs from 'qs';

const Axios = axios.create({
  timeout: 5000, // 请求超时时间
});

/** **** request拦截器==>对请求参数做处理 ***** */
Axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify({ ...config.data });
  } else {
    config.params = { ...config.params };
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config;
}, error => { // 请求错误处理
  // app.$vux.toast.show({
  //   type: 'warn',
  //   text: error,
  // });
  Promise.reject(error);
});

export default Axios;

// export default {
//   install(Vue, Option) {
//     Object.defineProperty(Vue.prototype, '$axios', { value: Axios });
//   },
// };
// export default {
//   Axios,
// };
