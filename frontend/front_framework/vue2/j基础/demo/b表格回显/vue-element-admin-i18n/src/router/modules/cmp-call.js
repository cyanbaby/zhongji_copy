/** When your routing table is too long, you can split it into small modules **/
/* eslint-disable */
import Layout from '@/layout'

const cmpVModelRouter = {
  path: '/cmp-call',
  component: Layout,
  redirect: '/cmp-call/demo_01',
  name: 'CmpCall',
  meta: {
    title: '组件传值',
    icon: 'table'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/cmp-call/demo-01/demo_01.vue'),
      name: 'CmpCalldemo_01',
      meta: { title: '爷孙逐层传递' }
    },
    {
        path: 'demo_02',
        component: () => import('@/views/cmp-call/demo-02/demo_02.vue'),
        name: 'CmpCalldemo_02',
        meta: { title: '$attrs 传递' }
    },
    {
        path: 'demo_03',
        component: () => import('@/views/cmp-call/demo-03/demo_03.vue'),
        name: 'CmpCalldemo_03',
        meta: { title: '$listeners 传递' }
    },


  ]
}
export default cmpVModelRouter
