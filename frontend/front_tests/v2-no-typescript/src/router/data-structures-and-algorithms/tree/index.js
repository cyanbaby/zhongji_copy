import Layout from '@/layout'

export default {
  path: '/data-structures-and-algorithms',
  component: Layout,
  children: [
    {
      path: 'tree/demo-01',
      name: 'data-tree-demo-01',
      component: () => import('@/views/data-structures-and-algorithms/tree/demo-01/index.vue')
    }
  ]
}
