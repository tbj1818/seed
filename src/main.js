import Vue from 'vue'
import App from './App.vue'

// 引入nutui框架
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';


import './assets/ydui.css';
import './assets/main.css';
import './assets/ydui.flexible';

import Index from './components/index.vue'
import SeedBuy from './components/seedBuy.vue'
import Deal from './components/deal.vue'
import Dealrecord from './components/dealrecord.vue'
import Dealdetail from './components/dealdetail.vue'
import Orderdetail from './components/orderdetail.vue'

NutUI.install(Vue);
Vue.config.productionTip = false

import global_ from './components/utils'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

//动态设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import Axios from 'axios'
import VueAxios from 'vue-axios'
        
import Qs from 'qs';  // 引入Qs，这个库是axios里面包含的，不需要再下载了
        
// 创建一个axios实例
var axios_instance = Axios.create({
    // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    // 设置Content - Type
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }    
})
Vue.use(VueAxios, axios_instance);

//1、 导入路由
import VueRouter from 'vue-router'
//2、注册路由
Vue.use(VueRouter)
//3、 配置路由
const router = new VueRouter ({
  routes:[
    {path: '/view/h5/app/seed',component: Index,meta:{title:'树苗交易'}},       //首页   注意这里一定不能加s，否则报错
    {path: '/view/h5/app/seed/seedbuy',component: SeedBuy,meta:{title:'出售，购买树苗'}},           //出售，购买树苗
    {path: '/view/h5/app/seed/deal',component: Deal,meta:{title:'挂单交易'}},                 //挂单交易
    {path: '/view/h5/app/seed/dealrecord',component: Dealrecord,meta:{title:'交易记录'}},     //交易记录
    {path: '/view/h5/app/seed/dealdetail',component: Dealdetail,meta:{title:'交易详情'}},     //交易详情
    {path: '/view/h5/app/seed/orderdetail',component: Orderdetail,meta:{title:'挂单记录'}},   //挂单记录
    {path: '*',redirect: '/view/h5/app/seed'}//防输错或者没找到页面路由错误，跳转到首页
  ],
  mode: 'history'
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
