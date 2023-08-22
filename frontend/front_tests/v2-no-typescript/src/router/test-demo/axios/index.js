import Layout from '@/layout'

export default {
  path: '/test-demo',
  component: Layout,
  children: [
    {
      path: 'axios/demo-01',
      name: 'test-demo-axios-demo-01',
      component: () => import('@/views/test-demo/axios/demo-01/index.vue')
    }
  ]
}
