/** When your routing table is too long, you can split it into small modules **/
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const formRouter = {
  path: '/form',
  component: Layout,
  redirect: '/form/demo_01',
  name: 'form',
  meta: {
    title: '表单',
    // icon: 'el-icon-document'
    icon: 'el-icon-document-copy'

  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/form/demo_01'),
      name: 'demo_01',
      meta: { title: 'demo_01' }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/form/demo_02'),
      name: 'demo_02',
      meta: { title: 'demo_02' }
    }
  ]
}
export default formRouter
