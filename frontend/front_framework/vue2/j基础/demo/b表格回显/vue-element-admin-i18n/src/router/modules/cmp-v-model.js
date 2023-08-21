/** When your routing table is too long, you can split it into small modules **/
/* eslint-disable */
import Layout from '@/layout'

const cmpVModelRouter = {
  path: '/cmp-v-model',
  component: Layout,
  redirect: '/cmp-v-model/demo_01',
  name: 'CmpVModel',
  meta: {
    title: '组件双向绑定',
    icon: 'table'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/cmp-v-model/demo_01.vue'),
      name: 'cmpVmoelDemo_01',
      meta: { title: 'v-model 子组件' }
    },
    {
        path: 'demo_02',
        component: () => import('@/views/cmp-v-model/demo_02.vue'),
        name: 'cmpVmoelDemo_02',
        meta: { title: '子组件 model属性' }
    },
    {
        path: 'demo_03',
        component: () => import('@/views/cmp-v-model/demo_03.vue'),
        name: 'cmpVmoelDemo_03',
        meta: { title: '多个 v-model' }
    },
  ]
}
export default cmpVModelRouter
