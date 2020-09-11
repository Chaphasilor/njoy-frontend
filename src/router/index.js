import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Progress from '../views/Progress.vue'
import Download from '../views/Download.vue'
import DownloadDetails from '../views/DownloadDetails.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Progress',
    component: Progress
  },
  {
    path: '/download',
    name: 'Download',
    component: Download
  },
  {
    path: '/details/:downloadId',
    name: 'DownloadDetails',
    component: DownloadDetails
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  console.log(`to:`, to);
  console.log(`from:`, from);

  if (to.path != `/login`) {
    if (store.getters.authStatus) {
      return next();
    } else {
      console.warn(`Not authenticated with API, redirecting to login...`);
      return next({
        name: `Login`,
      });
    }
  } else {
    return next();
  }
  
})

export default router
