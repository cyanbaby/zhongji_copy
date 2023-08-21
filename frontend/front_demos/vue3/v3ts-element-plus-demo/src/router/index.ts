import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('../views/home/index.vue')

const routes: Array<RouteRecordRaw> = [

  { path: '/', name: 'index', component: Home },  // TODO 重定向
  
  { path: '/home', name: 'home', component: Home, },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router