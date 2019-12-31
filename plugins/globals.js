import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import VueMarkdown from 'vue-markdown'
 
Vue.use(ElementUI, { locale })
Vue.component('vueMarkdown', VueMarkdown)