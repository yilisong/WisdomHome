import 'core-js'
import Vue from 'vue'
import App from './app'
import { Tooltip } from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'swiper/dist/css/swiper.min.css'
import './assets/style/index.css'
import { JSONP } from 'common/assets/js/normal'
import { BASE_URL, PRECEPTION_URL } from 'common/config/interceptor'
import Perception from './resource/perception'
import SourceWebResource from 'common/resource/SourceWebResource'

Vue.use(Tooltip)

const app = new Vue({
  el: '#root',
  components: {
    App
  },
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})
