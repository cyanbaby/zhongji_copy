/** When your routing table is too long, you can split it into small modules **/
/* eslint-disable */
import Layout from '@/layout'

const dataFlowlRouter = {
  path: '/data-flow',
  component: Layout,
  redirect: '/data-flow/lesson_01',
  name: 'DataFlow',
  meta: {
    title: '数据流',
    icon: 'table'
  },
  children: [

    {
      path: 'lesson_01',
      component: () => import('@/views/data-flow/lesson_01/index.vue'),
      name: 'DataFlowLesson_01',
      meta: { title: '父传子 对象Ⅰ' }
    },

    {
      path: 'lesson_02',
      component: () => import('@/views/data-flow/lesson_02/index.vue'),
      name: 'DataFlowLesson_02',
      meta: { title: '父传子 对象Ⅱ' }
    },

    {
      path: 'lesson_03',
      component: () => import('@/views/data-flow/lesson_03/index.vue'),
      name: 'DataFlowLesson_03',
      meta: { title: '父传子 普通Ⅰ' }
    },

    {
      path: 'lesson_04',
      component: () => import('@/views/data-flow/lesson_04/index.vue'),
      name: 'DataFlowLesson_04',
      meta: { title: '父传子 总结' }
    },
  ]
}
export default dataFlowlRouter
