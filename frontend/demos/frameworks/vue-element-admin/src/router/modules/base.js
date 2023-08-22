/** When your routing table is too long, you can split it into small modules **/
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const baseRouter = {
  path: '/base',
  component: Layout,
  redirect: '/base/demo_01',
  name: 'base',
  meta: {
    title: '路由基础模板',
    // icon: 'el-icon-document'
    icon: 'el-icon-document-copy'

  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/base/demo_01'),
      name: 'demo_01',
      meta: { title: 'demo_01' }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/base/demo_02'),
      name: 'demo_02',
      meta: { title: 'demo_02' }
    }
  ]
}
export default baseRouter
