
const computedRouter = [
  {
    path: '/computed/base',
    name: 'computedBase',
    component: () => import('../../views/computed/base/index.vue')
  },
  {
    path: '/computed/lesson_01',
    name: 'computedLesson_01',
    component: () => import('../../views/computed/lesson_01/index.vue')
  },
  {
    path: '/computed/lesson_02',
    name: 'computedLesson_02',
    component: () => import('../../views/computed/lesson_02/index.vue')
  },  
]
export default computedRouter
