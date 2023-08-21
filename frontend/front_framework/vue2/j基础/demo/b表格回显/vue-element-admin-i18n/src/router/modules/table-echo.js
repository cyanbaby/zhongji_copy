import Layout from '@/layout'

const tableEchoRouter = {
  path: '/table-echo',
  component: Layout,
  redirect: '/table-echo/demo_01',
  name: 'TableEcho',
  meta: {
    title: '表格回显',
    icon: 'table'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/table-echo/demo_01.vue'),
      name: 'demo_01',
      meta: { title: '简单表格回显' }
    },
    {
      path: 'demo_02',
      component: () => import('@/views/table-echo/demo_02.vue'),
      name: 'demo_02',
      meta: { title: '显示表格回显(bug?)' }
    },
    {
      path: 'demo_03',
      component: () => import('@/views/table-echo/demo_03.vue'),
      name: 'demo_03',
      meta: { title: '混入默认值回显' }
    },
    {
      path: 'demo_04',
      component: () => import('@/views/table-echo/demo_04.vue'),
      name: 'demo_04',
      meta: { title: '混入默认值操作' }
    },
    {
      path: 'demo_05',
      component: () => import('@/views/table-echo/demo_05.vue'),
      name: 'demo_05',
      meta: { title: '简单模态框回显' }
    },
    {
      path: 'demo_06',
      component: () => import('@/views/table-echo/demo_06.vue'),
      name: 'demo_06',
      meta: { title: '复杂模态框回显' }
    },
    // 重构 start
    {
      path: 'base-no-dl',
      component: () => import('@/views/table-echo/base-no-dl/index.vue'),
      name: 'base-no-dl',
      meta: { title: '重构开始——————' }
    },
    {
      path: 'lesson_01',
      component: () => import('@/views/table-echo/lesson_01/index.vue'),
      name: 'lesson_01',
      meta: { title: '简单表格回显' }
    },
    {
      path: 'base',
      component: () => import('@/views/table-echo/base/index.vue'),
      name: 'base',
      meta: { title: '——————重构结束' }
    }
    // 重构 end

  ]
}
export default tableEchoRouter
