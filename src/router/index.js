import Vue from 'vue'
import VueRouter from 'vue-router'
import { SharedElementRouteGuard } from 'v-shared-element';

import store from '../store/index'

import Progress from '../views/Progress.vue'
import Download from '../views/Download.vue'
import DownloadDetails from '../views/DownloadDetails.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    alias: ['/progress'],
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
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(SharedElementRouteGuard);

router.beforeEach(async (to, from, next) => {

  console.log(`to:`, to);
  console.log(`from:`, from);

  if (!store.getters.api) {
    await store.dispatch(`mountApi`);
  }

  if (store.getters.authStatus === undefined) {
    await store.dispatch(`checkAuthenticated`);
  }

  if (to.path != `/login`) {
    if (store.getters.authStatus) {
      return next();
    } else {

      if (store.getters.authStatus) {
        return next();
      } else {

        console.warn(`Not authenticated with API, redirecting to login...`);
        return next({
          name: `Login`,
        });
        
      }
      
    }
  } else {
    if (store.getters.authStatus) {
      return next({
        name: `Progress`,
      });
    } else {
      return next();
    }
  }
  
})

export default router
