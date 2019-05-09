import Vue from 'vue';
// import { Button } from 'vant'
// import { Tabbar, TabbarItem } from 'vant'

import Vant from 'vant';
// import 'vant/lib/index.css';

// import axios from 'axios';
// import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import App from './App.vue';
import './styles/reset.scss';
import './styles/common.scss';
import 'vant/lib/index.css';


import Axios from './axios';

// Vue.use(packedAxios); // 使用this.$http代替封装好的axios

Vue.prototype.$axios = Axios;

// require('./mock')


Vue.config.productionTip = false;
Vue.use(Vant);
// Vue.use(Button);
// Vue.use(Tabbar).use(TabbarItem)
// Vue.use(VueAxios, axios);


const vue = new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
