import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/tailwind.css";
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let resurrectedSettings = localStorage.getItem(`settings`);
    if (resurrectedSettings) {
      try {
        resurrectedSettings = JSON.parse(resurrectedSettings);
        store.commit(`SET_SETTINGS`, resurrectedSettings);
      } catch (err) {
        console.warn(`Couldn't resurrect settings!`);
      }
    }
  },
}).$mount('#app')
