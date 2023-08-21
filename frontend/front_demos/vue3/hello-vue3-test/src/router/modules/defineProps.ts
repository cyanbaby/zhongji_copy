
const definePropsRouter = [

  {
    path: '/defineProps/base',
    name: 'definePropsBase',
    component: () => import('../../views/defineProps/base/index.vue')
  },


  {
    path: '/defineProps/lesson_01',
    name: 'definePropsLesson_01',
    component: () => import('../../views/defineProps/lesson_01/index.vue')
  },

  {
    path: '/defineProps/lesson_02',
    name: 'definePropsLesson_02',
    component: () => import('../../views/defineProps/lesson_02/index.vue')
  },

  {
    path: '/defineProps/lesson_03',
    name: 'definePropsLesson_03',
    component: () => import('../../views/defineProps/lesson_03/index.vue')
  },

  {
    path: '/defineProps/lesson_04',
    name: 'definePropsLesson_04',
    component: () => import('../../views/defineProps/lesson_04/index.vue')
  },
  {
    path: '/defineProps/lesson_05',
    name: 'definePropsLesson_05',
    component: () => import('../../views/defineProps/lesson_05/index.vue')
  },
  {
    path: '/defineProps/lesson_06',
    name: 'definePropsLesson_06',
    component: () => import('../../views/defineProps/lesson_06/index.vue')
  },  
  {
    path: '/defineProps/demo_01',
    name: 'definePropsDemo_01',
    component: () => import('../../views/defineProps/index.vue')
  },
  {
    path: '/defineProps/demo_02',
    name: 'definePropsDemo_02',
    component: () => import('../../views/defineProps/demo_02/index.vue')
  },
  {
    path: '/defineProps/demo_03',
    name: 'definePropsDemo_03',
    component: () => import('../../views/defineProps/demo_03/index.vue')
  },
  {
    path: '/defineProps/demo_04',
    name: 'definePropsDemo_04',
    component: () => import('../../views/defineProps/demo_04/index.vue')
  },  
]
export default definePropsRouter
