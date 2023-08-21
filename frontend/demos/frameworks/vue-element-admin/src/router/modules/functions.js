/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const functionsRouter = {
  path: '/functions',
  component: Layout,
  redirect: '/functions/demo_01',
  name: 'functions',
  meta: {
    // 示例
    title: 'functions',
    icon: 'form'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/functions/demo_01/index'),
      name: 'Demo_01',
      meta: {
        // 上传视频回显
        title: 'shangchuan_shiping_huixian'
      }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/functions/demo_02/index'),
      name: 'Demo_02',
      meta: {
        // 上传视频回显
        title: 'haha'
      }
    }
  ]
}
export default functionsRouter
