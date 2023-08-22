/** When your routing other is too long, you can split it into small modules **/
/** When your routing other is too long, you can split it into small modules **/

import Layout from '@/layout'

const otherRouter = {
  path: '/other',
  component: Layout,
  redirect: '/other/demo_01',
  name: 'other',
  meta: {
    title: '其他',
    // icon: 'el-icon-document'
    icon: 'el-icon-document-copy'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/other/demo_01'),
      name: 'demo_01',
      meta: { title: 'demo_01' }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/other/demo_02'),
      name: 'demo_02',
      meta: { title: 'demo_02' }
    }
  ]
}
export default otherRouter
