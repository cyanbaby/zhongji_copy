/** When your routing table is too long, you can split it into small modules **/
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const pendingRouter = {
  path: '/pending',
  component: Layout,
  redirect: '/pending/demo_01',
  name: 'pending',
  meta: {
    title: '待归档',
    // icon: 'el-icon-document'
    icon: 'el-icon-document-copy'

  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/pending/demo_01'),
      name: 'demo_01',
      meta: { title: 'demo_01' }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/pending/demo_02'),
      name: 'demo_02',
      meta: { title: 'demo_02' }
    }
  ]
}
export default pendingRouter
