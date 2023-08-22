import Layout from '@/layout'

export default {
  path: '/test-demo',
  component: Layout,
  children: [
    {
      path: 'vue-echarts/demo-01',
      name: 'test-demo-vue-echarts-demo-01',
      component: () => import('@/views/test-demo/vue-echarts/demo-01/index.vue')
    },
    {
      path: 'vue-echarts/demo-02',
      name: 'test-demo-vue-echarts-demo-02',
      component: () => import('@/views/test-demo/vue-echarts/demo-02/index.vue')
    }
  ]
}
