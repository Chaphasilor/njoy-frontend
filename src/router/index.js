import Vue from 'vue'
import VueRouter from 'vue-router'
import Progress from '../views/Progress.vue'
import Download from '../views/Download.vue'
import DownloadDetails from '../views/DownloadDetails.vue'

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
    //TODO enable paramized route once download IDs are available
    path: '/details/:downloadId',
    // path: '/details',
    name: 'DownloadDetails',
    component: DownloadDetails
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
