import Layout from '@/layout'

export default {
  path: '/test-demo',
  component: Layout,
  children: [
    {
      path: 'form-making/demo-01',
      name: 'test-demo-form-making-demo-01',
      component: () => import('@/views/test-demo/form-making/demo-01/index.vue')
    },
    {
      path: 'form-making/demo-02',
      name: 'test-demo-form-making-demo-02',
      component: () => import('@/views/test-demo/form-making/demo-02/index.vue')
    }
  ]
}
