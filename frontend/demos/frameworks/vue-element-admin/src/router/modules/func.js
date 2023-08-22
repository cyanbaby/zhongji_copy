/** When your routing func is too long, you can split it into small modules **/
/** When your routing func is too long, you can split it into small modules **/

import Layout from '@/layout'

const funcRouter = {
  path: '/func',
  component: Layout,
  redirect: '/func/demo_01',
  name: 'func',
  meta: {
    title: '功能',
    // icon: 'el-icon-document'
    icon: 'el-icon-document-copy'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/func/demo_01'),
      name: 'demo_01',
      meta: { title: 'demo_01' }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/func/demo_02'),
      name: 'demo_02',
      meta: { title: 'demo_02' }
    }
  ]
}
export default funcRouter
