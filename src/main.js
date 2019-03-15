import Vue from 'vue'
import App from './App.vue'

// 引入nutui框架
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';


import './assets/ydui.css';
import './assets/main.css';
import './assets/ydui.flexible';

import Index from './components/index.vue'
import List from './components/list.vue'
import SeedBuy from './components/seedBuy.vue'
import Deal from './components/deal.vue'

NutUI.install(Vue);
Vue.config.productionTip = false

//1、 导入路由
import VueRouter from 'vue-router'
//2、注册路由
Vue.use(VueRouter)
//3、 配置路由
const router = new VueRouter ({
  routes:[
    {path: '/view/h5/seed',component: Index},//注意这里一定不能加s，否则报错
    {path: '/view/h5/seed/list',component: List},
    {path: '/view/h5/seed/seedbuy',component: SeedBuy},
    {path: '/view/h5/seed/deal',component: Deal},
    {path: '*',redirect: '/view/h5/seed'}//防输错或者没找到页面路由错误，跳转到首页
  ],
  mode: 'history'
})





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
