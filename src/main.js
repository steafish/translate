import Vue from 'vue'
import App from './App.vue'
import VueTranslate from './plugins/index.js';


Vue.config.productionTip = false

Vue.use(VueTranslate);

new Vue({
  render: h => h(App),
}).$mount('#app')
