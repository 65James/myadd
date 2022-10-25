
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import store from 'store/index.js'
// 引入
import {$http} from '@escook/request-miniprogram'
// 请求基地址
$http.baseUrl="https://api-hmugo-web.itheima.net"
// 请求拦截器
$http.beforeRequest=function(){
	uni.showLoading({
		title:'加载中'
	})
}
// 响应拦截器
$http.afterRequest=function(){
	uni.hideLoading()
}
// 在 全局uni对象上挂载 $http
uni.$http=$http

uni.$showMsg=function(title='数据请求失败',duration='1500'){
	uni.showToast({
		title,
		duration
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif