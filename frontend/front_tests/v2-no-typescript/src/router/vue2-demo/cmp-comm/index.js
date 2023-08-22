import Layout from '@/layout'

export default {
  path: '/vue2-demo',
  component: Layout,
  children: [
    {
      path: 'cmp-comm/demo-01',
      name: 'cmp-comm-demo-01',
      component: () => import('@/views/vue2-demo/cmp-comm/demo-01')
    },
    {
      path: 'cmp-comm/demo-02',
      name: 'cmp-comm-demo-02',
      component: () => import('@/views/vue2-demo/cmp-comm/demo-02')
    }
  ]
}
