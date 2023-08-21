
const watchRouter = [

  {
    path: '/watch/demo_01',
    name: 'watchDemo_01',
    component: () => import('../../views/watch/demo_01/index.vue')
  },

  {
    path: '/watch/demo_02',
    name: 'watchDemo_02',
    component: () => import('../../views/watch/demo_02/index.vue')
  },

  {
    path: '/watch/demo_03',
    name: 'watchDemo_03',
    component: () => import('../../views/watch/demo_03/index.vue')
  },

  {
    path: '/watch/demo05',
    name: 'watchDemo05',
    component: () => import('../../views/watch/case5_multi_reactive.vue')
  },
  {
    path: '/watch/demo06',
    name: 'watchDemo06',
    component: () => import('../../views/watch/case6_stop.vue')
  },
  {
    path: '/watch/demo_07',
    name: 'watchDemo_07',
    component: () => import('../../views/watch/demo_07/index.vue')
  },

]
export default watchRouter
