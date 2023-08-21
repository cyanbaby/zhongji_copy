
const useVModelRouter = [
  // {
  //   path: '/useVModel/base',
  //   name: 'useVModelBase',
  //   component: () => import('../../views/useVModel/base/index.vue')
  // },
  {
    path: '/useVModel/lesson_01',
    name: 'useVModelLesson_01',
    component: () => import('../../views/useVModel/lesson_01/index.vue')
  },
  {
    path: '/useVModel/lesson_02',
    name: 'useVModelLesson_02',
    component: () => import('../../views/useVModel/lesson_02/index.vue')
  },  
  {
    path: '/useVModel/lesson_03',
    name: 'useVModelLesson_03',
    component: () => import('../../views/useVModel/lesson_03/index.vue')
  },
]
export default useVModelRouter
