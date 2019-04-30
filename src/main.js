import Vue from 'vue'
import App from './App.vue'

//1.引入登录组件
import Login from './pages/Login.vue'
//引入admin页面
import Admin from './pages/Admin.vue'
//引入商品详情页
import GoodsList from './pages/GoodsList.vue'
//引入新增商品页面
import GoodsAdd from './pages/GoodsAdd.vue'
//引入商品信息编辑页面
import GoodsEdit from './pages/GoodsEdit.vue'
//引入路由模块
import VueRouter from 'vue-router'


import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://localhost:8899"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//2.注册路由
Vue.use(VueRouter)
//3.配置路由
const routes = [{
  path: '/login',
  component: Login,
  meta: "登录"
}, {
  path: '/admin',
  component: Admin,
  meta: "管理后台",
  children: [{
    path: 'goods-list',
    component: GoodsList,
    meta: "商品列表"
  }, {
    path: 'goods-add',
    component: GoodsAdd,
    meta: "添加商品"
  }, {
    path: 'goods-edit/:id',
    component: GoodsEdit,
    meta: "编辑商品信息"
  }]
}, ]
//4.创建路由对象
var router = new VueRouter({
  routes
})

// 是否是生成环境
Vue.config.productionTip = false

new Vue({
  //路由挂载到根实例
  router,
  render: h => h(App),

}).$mount('#app')