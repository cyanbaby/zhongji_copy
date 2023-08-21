/** When your routing table is too long, you can split it into small modules **/
/* eslint-disable */
import Layout from '@/layout'

const cmpTestRouter = {
  path: '/cmp-test',
  component: Layout,
  redirect: '/cmp-test/lesson_01',
  name: 'CmpTest',
  meta: {
    title: '组件测试',
    icon: 'table'
  },
  children: [
    {
      path: 'lesson_01',
      component: () => import('@/views/cmp-test/lesson_01/index.vue'),
      name: 'cmpTestLesson_01',
      meta: { title: 'mixins 隔离态' }
    },
    {
      path: 'lesson_02',
      component: () => import('@/views/cmp-test/lesson_02/index.vue'),
      name: 'cmpTestLesson_02',
      meta: { title: 'mixins 宿主优先' }
    },
    // {
    //   path: 'lesson_03',
    //   component: () => import('@/views/cmp-test/lesson_03/index.vue'),
    //   name: 'cmpTestLesson_03',
    //   meta: { title: 'mixins 生命周期' }
    // },

    {
      path: 'lesson_04',
      component: () => import('@/views/cmp-test/lesson_04/index.vue'),
      name: 'cmpTestLesson_04',
      meta: { title: '重复组件 隔离态' }
    },

    {
      path: 'lesson_05',
      component: () => import('@/views/cmp-test/lesson_05/index.vue'),
      name: 'cmpTestLesson_05',
      meta: { title: '父传子 方法' }
    },
  ]
}
export default cmpTestRouter
