/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const testDemoRouter = {
  path: '/testdemo',
  component: Layout,
  redirect: '/testdemo/demo_01',
  name: 'TestDemo',
  meta: {
    // 示例
    title: 'testdemo',
    icon: 'form'
  },
  children: [
    {
      path: 'demo_01',
      component: () => import('@/views/testdemo/demo_01/index'),
      redirect: '/testdemo/demo_01/chapter_01',
      name: 'Demo_01',
      meta: {
        // 基础测试
        title: '学员管理'
      },
      children: [
        {
          path: 'chapter_01',
          component: () => import('@/views/testdemo/demo_01/chapter_01'),
          name: 'chapter_01',
          meta: {
            // 基础测试
            title: '学员管理'
          }
        },
        {
          path: 'chapter_02',
          component: () => import('@/views/testdemo/demo_01/chapter_02'),
          name: 'chapter_02',
          meta: {
            // 基础测试
            title: '学员详情'
          }
        }
      ]
    },
    {
      path: 'demo_02',
      component: () => import('@/views/testdemo/demo_02/index'),
      name: 'Demo_02',
      meta: {
        // 基础测试
        title: 'mr table1'
      }
    },
    {
      path: 'demo_03',
      component: () => import('@/views/testdemo/demo_03/index'),
      name: 'Demo_03',
      meta: {
        // 基础测试
        title: 'mr table2'
      }
    },
    {
      path: 'demo_04',
      component: () => import('@/views/testdemo/demo_04/index'),
      name: 'Demo_04',
      meta: {
        // 基础测试
        title: '测试v-html'
      }
    },
    {
      path: 'demo_05',
      component: () => import('@/views/testdemo/demo_05/index'),
      name: 'Demo_05',
      meta: {
        // 基础测试
        title: '媒体查询'
      }
    },
    {
      path: 'demo_06',
      component: () => import('@/views/testdemo/demo_06/index'),
      name: 'Demo_06',
      meta: {
        // 基础测试
        title: '组件 v-model'
      }
    },
    {
      path: 'demo_07',
      component: () => import('@/views/testdemo/demo_07/index'),
      name: 'Demo_07',
      meta: {
        // 基础测试
        title: '精确计算'
      }
    },
    {
      path: 'demo_08',
      component: () => import('@/views/testdemo/demo_08/index'),
      name: 'Demo_08',
      meta: {
        // 基础测试
        title: '颜色计算'
      }
    }
  ]
}
export default testDemoRouter
