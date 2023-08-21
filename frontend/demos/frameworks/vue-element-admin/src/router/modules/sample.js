/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const sampleRouter = {
  path: '/sample',
  component: Layout,
  redirect: '/sample/demo_01',
  name: 'Sample',
  meta: {
    // 示例
    title: 'shi_li',
    icon: 'form'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/sample/demo_01/index'),
      name: 'Demo_01',
      meta: {
        // 基础测试
        title: 'jichu_ceshi'
      }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/sample/demo_02/index'),
      name: 'Demo_02',
      meta: {
        // 测试页面
        title: 'ceshi_yemian'
      }
    },
    {
      path: 'demo_03',
      component: () => import('@/views/sample/demo_03/index'),
      name: 'Demo_03',
      meta: {
        // 测试页面
        title: 'mock_data'
      }
    },
    {
      path: 'demo_04',
      component: () => import('@/views/sample/demo_04/index'),
      name: 'Demo_04',
      meta: {
        // 测试页面
        title: '表单样式'
      }
    }
  ]
}
export default sampleRouter
