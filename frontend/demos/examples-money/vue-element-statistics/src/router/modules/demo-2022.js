/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/demo-2022',
  component: Layout,
  redirect: 'noRedirect',
  name: 'demo2022',
  meta: {
    title: '2022',
    icon: 'line-chart'
  },
  children: [
    {
      path: 'chapter-01',
      component: () => import('@/views/demo-2022/chapter-01'),
      name: 'chapter01',
      meta: { title: 'overview', noCache: true }
    },
    {
      path: 'chapter-02',
      component: () => import('@/views/demo-2022/chapter-02'),
      name: 'chapter02',
      meta: { title: 'odd & Medium & Even', noCache: true }
    },
    {
      path: 'chapter-03',
      component: () => import('@/views/demo-2022/chapter-03'),
      name: 'chapter03',
      meta: { title: 'head', noCache: true }
    },
    {
      path: 'chapter-04',
      component: () => import('@/views/demo-2022/chapter-04'),
      name: 'chapter04',
      meta: { title: 'mantissa', noCache: true }
    }
  ]
}

export default chartsRouter
