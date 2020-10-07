import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueHaptic from 'vue-haptic';
import { SharedElementDirective } from 'v-shared-element';
import "@/assets/css/tailwind.css";

import './registerServiceWorker';

Vue.config.productionTip = false

Vue.use(SharedElementDirective, {
  includeChildren: true,
  restrictToViewport: true,
  duration: `300ms`,
});

Vue.use(VueHaptic, {
  patterns: {
    success: 25,
    error: [50, 75, 50],
    blip: 10,
    default: 25,
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.dispatch(`resurrectSettings`);
  },
}).$mount('#app')
