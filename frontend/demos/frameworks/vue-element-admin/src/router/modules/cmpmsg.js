/** When your routing table is too long, you can split it into small modules **/
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const cmpmsgRouter = {
  path: '/cmpmsg',
  component: Layout,
  redirect: '/cmpmsg/demo_01',
  name: 'CmpMsg',
  meta: {
    title: '组件通信',
    icon: 'el-icon-document-copy'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/cmp-msg/demo_01'),
      name: 'demo_01',
      meta: { title: 'demo_01' }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/cmp-msg/demo_02'),
      name: 'demo_02',
      meta: { title: 'demo_02' }
    }
  ]
}
export default cmpmsgRouter
