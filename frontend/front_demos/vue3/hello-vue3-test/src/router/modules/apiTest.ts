
const apiTestRouter = [
  {
    path: '/apiTest/base',
    name: 'apiTestBase',
    component: () => import('../../views/apiTest/base/index.vue')
  },

  {
    path: '/apiTest/demo_01',
    name: 'apiTestDemo_01',
    component: () => import('../../views/apiTest/demo_01/index.vue')
  },
  {
    path: '/apiTest/demo_02',
    name: 'apiTestDemo_02',
    component: () => import('../../views/apiTest/demo_02/index.vue')
  },

  {
    path: '/apiTest/demo_03',
    name: 'apiTestDemo_03',
    component: () => import('../../views/apiTest/demo_03/index.vue')
  },
]
export default apiTestRouter
