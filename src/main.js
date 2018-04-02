// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store';
import ElementUI from 'element-ui'
//引入css文件
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/app.css'

import $ from 'jquery'
import ztree from 'ztree'
import 'ztree/css/zTreeStyle/zTreeStyle.css'

Vue.use(ElementUI)

// Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
