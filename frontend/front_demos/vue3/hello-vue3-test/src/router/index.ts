import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'



const Home = () => import('../views/home/index.vue')
const About = () => import('../views/about/index.vue')

// api demo

// const provide = () => import('../views/provide/index.vue')

const watchEffect = () => import('../views/watchEffect/index.vue')

// const watch= () => import('../views/watch/index.vue')

// const ref= () => import('../views/ref/index.vue')


const setup= () => import('../views/setup/index.vue')
// const computed= () => import('../views/computed/index.vue')

const defineProps= () => import('../views/defineProps/index.vue')

import refRouter from './modules/ref'

import watchRouter from './modules/watch'
import provideRouter from './modules/provide'
import definePropsRouter from './modules/defineProps'
import callDataRouter from './modules/callData'
import apiTestRouter from './modules/apiTest'
import routerTestRouter from './modules/routerTest'
import computedRouter from './modules/computed'
import useVModelRouter from './modules/useVModel'
import chartRouter from './modules/chart'



const routes: Array<RouteRecordRaw> = [

  { path: '/', name: 'home', component: Home },
  

  { path: '/home', name: 'home', component: Home, },
  { path: '/about', name: 'about', component: About },

  // { path: '/provide', name: 'provide', component: provide },
  ...provideRouter,

  ...definePropsRouter,

  ...callDataRouter,

  ...apiTestRouter,

  ...routerTestRouter,

  { path: '/watchEffect', name: 'watchEffect', component: watchEffect },

  // { path: '/watch', name: 'watch', component: watch },
  ...watchRouter,

  // { path: '/ref', name: 'ref', component: ref },
  ...refRouter,
  

  { path: '/setup', name: 'setup', component: setup },

  // { path: '/computed', name: 'computed', component: computed },
  ...computedRouter,

  ...useVModelRouter,

  ...chartRouter,

  { path: '/defineProps', name: 'defineProps', component: defineProps },
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 全局前置守卫  https://blog.csdn.net/m0_49016709/article/details/111218569
  // console.group('router.beforeEach')
  // console.log(to)
  // console.log(from)
  // console.groupEnd()

  next()
})

export default router