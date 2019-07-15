import Vue from 'vue';
import VueRouter from 'vue-router';
import { Toast } from 'vant';
import store from '../store';
import Axios from '../axios';


Vue.use(VueRouter);
Vue.use(store);
// Vue.use(Toast);

const routes = [
  { path: '/', redirect: '/class_list' },
  {
    path: '/signin',
    component: () => import('@/pages/Auth/SignIn.vue'),
  },
  {
    path: '/create_class',
    name: 'createClass',
    component: () => import('@/pages/Class/CreateClass'),
  },
  {
    path: '/edit_class',
    name: 'editClass',
    component: () => import('@/pages/Class/EditClass.vue'),
  },
  {
    path: '/activity',
    component: () => import('@/layout/TabView.vue'),
    children: [
      {
        path: '/class_list',
        name: 'classList',
        component: () => import('@/pages/ClassList'),
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/pages/Mine'),
      },
    ],
  },
  {
    path: '/class_detail',
    name: 'classDetail',
    component: () => import('@/pages/ClassList/classDetail'),
  },
  {
    path: '/order_confirm',
    name: 'orderConfirm',
    component: () => import('@/pages/Order/OrderConfirm'),
  },
];


const router = new VueRouter({
  mode: 'history',
  base: '/front/',
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('store', store);
  Axios.post('/api/user/checklogin').then(response => {
    const res = response.data.res;
    console.log(res);
    const avatar = res.headimgurl;
    if (response.data.code !== 0) {
      Toast(res.msg);
    } else if (!res.login) {
      window.location.href = `/api/user/oauth?current_url=${escape(window.location.href)}`;
    } else {
      if (to.path === '/signin') {
        next();
      }
      if (!store.getters.roleData.role_id) {
        Axios.post('/api/user/role').then(response => {
          if (response.data.code === 0) {
            const res = response.data.res;
            store.dispatch('setRole', {
              role_mapping: res.role_mapping,
              role_id: res.role_id,
              logo_url: avatar,
            });
            if (res.role_id === 0) {
              next({ path: '/signin' });
            } else {
              next();
            }
          }
        });
      } else {
        next();
      }
    }
  });
});

export default router;
