import Layout from '@/layout'

export default {
  path: '/vue2-demo',
  component: Layout,
  children: [
    {
      path: 'api/demo-01',
      name: 'api-demo-01',
      component: () => import('@/views/vue2-demo/api/demo-01')
    }
  ]
}
