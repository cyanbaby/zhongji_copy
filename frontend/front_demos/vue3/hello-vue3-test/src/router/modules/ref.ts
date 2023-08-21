
const refRouter = [
  /*--------------------------------------- 基本使用 开始 ------------------------------------------*/
  {
    path: '/ref/base',
    name: 'refBase',
    component: () => import('../../views/ref/base/index.vue')
  },
  {
    path: '/ref/lesson_01',
    name: 'refLesson_01',
    component: () => import('../../views/ref/lesson_01/index.vue')
  },
  {
    path: '/ref/lesson_02',
    name: 'refLesson_02',
    component: () => import('../../views/ref/lesson_02/index.vue')
  },

  {
    path: '/ref/lesson_03',
    name: 'refLesson_03',
    component: () => import('../../views/ref/lesson_03/index.vue')
  },

  {
    path: '/ref/lesson_04',
    name: 'refLesson_04',
    component: () => import('../../views/ref/lesson_04/index.vue')
  },


  {
    path: '/ref/lesson_05',
    name: 'refLesson_05',
    component: () => import('../../views/ref/lesson_05/index.vue')
  },

  {
    path: '/ref/lesson_06',
    name: 'refLesson_06',
    component: () => import('../../views/ref/lesson_06/index.vue')
  },

  {
    path: '/ref/lesson_07',
    name: 'refLesson_07',
    component: () => import('../../views/ref/lesson_07/index.vue')
  },

  {
    path: '/ref/lesson_08',
    name: 'refLesson_08',
    component: () => import('../../views/ref/lesson_08/index.vue')
  },

  {
    path: '/ref/lesson_09',
    name: 'refLesson_09',
    component: () => import('../../views/ref/lesson_09/index.vue')
  },


  {
    path: '/ref/lesson_10',
    name: 'refLesson_10',
    component: () => import('../../views/ref/lesson_10/index.vue')
  },

  /*--------------------------------------- 基本使用 结束 ------------------------------------------*/




  /*--------------------------------------- ref(数组|对象) 开始 ------------------------------------------*/
  {
    path: '/ref/lesson_11',
    name: 'refLesson_11',
    component: () => import('../../views/ref/lesson_11/index.vue')
  },
  /*--------------------------------------- ref(数组|对象) 结束 ------------------------------------------*/





  
  /*--------------------------------------- ref DOM 开始 ------------------------------------------*/
  {
    path: '/ref/lesson_12',
    name: 'refLesson_12',
    component: () => import('../../views/ref/lesson_12/index.vue')
  },
  /*--------------------------------------- ref DOM 结束 ------------------------------------------*/

]
export default refRouter
