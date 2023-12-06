import Layout from '@/layout'

export default {
  path: '/test-demo',
  component: Layout,
  children: [
    {
      path: 'element-ui/demo-01',
      name: 'test-demo-element-ui-demo-01',
      component: () => import('@/views/test-demo/element-ui/demo-01/index.vue')
    },
    {
      path: 'element-ui/demo-02',
      name: 'test-demo-element-ui-demo-02',
      component: () => import('@/views/test-demo/element-ui/demo-02/index.vue')
    },
    {
      path: 'element-ui/demo-03',
      name: 'test-demo-element-ui-demo-03',
      component: () => import('@/views/test-demo/element-ui/demo-03/index.vue')
    },
    {
      path: 'element-ui/demo-04',
      name: 'test-demo-element-ui-demo-04',
      component: () => import('@/views/test-demo/element-ui/demo-04/index.vue')
    },
    {
      path: 'element-ui/demo-05',
      name: 'test-demo-element-ui-demo-05',
      component: () => import('@/views/test-demo/element-ui/demo-05/index.vue')
    },
    {
      path: 'element-ui/demo-06',
      name: 'test-demo-element-ui-demo-06',
      component: () => import('@/views/test-demo/element-ui/demo-06/index.vue')
    },
    {
      path: 'element-ui/demo-07',
      name: 'test-demo-element-ui-demo-07',
      component: () => import('@/views/test-demo/element-ui/demo-07/index.vue')
    },
    {
      path: 'element-ui/demo-08',
      name: 'test-demo-element-ui-demo-08',
      component: () => import('@/views/test-demo/element-ui/demo-08/index.vue')
    },
    {
      path: 'element-ui/demo-09',
      name: 'test-demo-element-ui-demo-09',
      component: () => import('@/views/test-demo/element-ui/demo-09/index.vue')
    },
    {
      path: 'element-ui/demo-10',
      name: 'test-demo-element-ui-demo-10',
      component: () => import('@/views/test-demo/element-ui/demo-10/index.vue')
    },
    {
      path: 'element-ui/demo-11',
      name: 'test-demo-element-ui-demo-11',
      component: () => import('@/views/test-demo/element-ui/demo-11/index.vue')
    },
    {
      path: 'element-ui/demo-12',
      name: 'test-demo-element-ui-demo-12',
      component: () => import('@/views/test-demo/element-ui/demo-12/index.vue')
    },
    {
      path: 'element-ui/demo-13',
      name: 'test-demo-element-ui-demo-13',
      component: () => import('@/views/test-demo/element-ui/demo-13/index.vue')
    },
    {
      path: 'element-ui/demo-14',
      name: 'test-demo-element-ui-demo-14',
      component: () => import('@/views/test-demo/element-ui/demo-14/index.vue')
    },
    {
      path: 'element-ui/demo-15',
      name: 'test-demo-element-ui-demo-15',
      component: () => import('@/views/test-demo/element-ui/demo-15/index.vue')
    },
    {
      path: 'element-ui/demo-16',
      name: 'test-demo-element-ui-demo-16',
      component: () => import('@/views/test-demo/element-ui/demo-16/index.vue')
    }
  ]
}
