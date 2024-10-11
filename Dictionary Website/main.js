import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Statistics from './views/Statistics.vue';


import 'semantic-ui-css/semantic.css';
Vue.component('Statistics', Statistics);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
