import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo01',
        name: 'demo01',
        component: () => import('@/views/example/demo01'),
        meta: { title: '嵌套导航', icon: 'form' }
      },
      {
        path: 'demo02',
        name: 'demo02',
        component: () => import('@/views/example/demo02'),
        meta: { title: 'input整数', icon: 'form' }
      },
      {
        path: 'demo03',
        name: 'demo03',
        component: () => import('@/views/example/demo03'),
        meta: { title: 'el-upload 图片', icon: 'form' }
      },
      {
        path: 'demo04',
        name: 'demo04',
        component: () => import('@/views/example/demo04'),
        meta: { title: 'demo04', icon: 'form' }
      },
      {
        path: 'demo05',
        name: 'demo05',
        component: () => import('@/views/example/demo05'),
        meta: { title: 'demo05', icon: 'form' }
      },
      {
        path: 'demo06',
        name: 'demo06',
        component: () => import('@/views/example/demo06'),
        meta: { title: 'demo06', icon: 'form' }
      },
      {
        path: 'demo07',
        name: 'demo07',
        component: () => import('@/views/example/demo07'),
        meta: { title: 'demo07', icon: 'form' }
      }

      // {
      //   path: 'table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: 'Table', icon: 'table' }
      // },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },

  {
    path: '/crud-base',
    component: Layout,
    name: 'Crud',
    meta: { title: 'Crud 基础功能', icon: 'el-icon-s-help' },
    children: [
      // {
      //   path: 'bar',
      //   name: 'bar',
      //   component: () => import('@/views/bar'),
      //   meta: { title: '基础功能 Start', icon: 'form' }
      // },
      {
        path: 'demo01',
        name: 'demo01',
        component: () => import('@/views/crud-base/demo01'),
        meta: { title: '基础表格', icon: 'form' }
      },
      {
        path: 'demo02',
        name: 'demo02',
        component: () => import('@/views/crud-base/demo02'),
        meta: { title: '加载状态', icon: 'form' }
      },
      {
        path: 'demo03',
        name: 'demo03',
        component: () => import('@/views/crud-base/demo03'),
        meta: { title: '自定义加载状态', icon: 'form' }
      },
      {
        path: 'demo04',
        name: 'demo04',
        component: () => import('@/views/crud-base/demo04'),
        meta: { title: '带斑马纹表格', icon: 'form' }
      },
      {
        path: 'demo05',
        name: 'demo05',
        component: () => import('@/views/crud-base/demo05'),
        meta: { title: '边框表格', icon: 'form' }
      },
      {
        path: 'demo06',
        name: 'demo06',
        component: () => import('@/views/crud-base/demo06'),
        meta: { title: '带状态表格', icon: 'form' }
      },
      {
        path: 'demo07',
        name: 'demo07',
        component: () => import('@/views/crud-base/demo07'),
        meta: { title: '固定表头', icon: 'form' }
      },
      {
        path: 'demo08',
        name: 'demo08',
        component: () => import('@/views/crud-base/demo08'),
        meta: { title: '固定列', icon: 'form' }
      },
      {
        path: 'demo09',
        name: 'demo09',
        component: () => import('@/views/crud-base/demo09'),
        meta: { title: '流体高度', icon: 'form' }
      },
      {
        path: 'demo10',
        name: 'demo10',
        component: () => import('@/views/crud-base/demo10'),
        meta: { title: '多级表头', icon: 'form' }
      },
      {
        path: 'demo11',
        name: 'demo11',
        component: () => import('@/views/crud-base/demo11'),
        meta: { title: '单选', icon: 'form' }
      },
      {
        path: 'demo12',
        name: 'demo12',
        component: () => import('@/views/crud-base/demo12'),
        meta: { title: '多选', icon: 'form' }
      },
      {
        path: 'demo13',
        name: 'demo13',
        component: () => import('@/views/crud-base/demo13'),
        meta: { title: '排序', icon: 'form' }
      },
      {
        path: 'demo14',
        name: 'demo14',
        component: () => import('@/views/crud-base/demo14'),
        meta: { title: '筛选', icon: 'form' }
      },
      {
        path: 'demo15',
        name: 'demo15',
        component: () => import('@/views/crud-base/demo15'),
        meta: { title: '表尾合计行', icon: 'form' }
      },
      {
        path: 'demo16',
        name: 'demo16',
        component: () => import('@/views/crud-base/demo16'),
        meta: { title: '合并行', icon: 'form' }
      },
      {
        path: 'demo17',
        name: 'demo17',
        component: () => import('@/views/crud-base/demo17'),
        meta: { title: '合并列', icon: 'form' }
      },
      {
        path: 'demo18',
        name: 'demo18',
        component: () => import('@/views/crud-base/demo18'),
        meta: { title: '表格slot', icon: 'form' }
      }
    ]
  },

  {
    path: '/crud-data',
    component: Layout,
    name: 'Crud',
    meta: { title: 'Crud 数据操作', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo01',
        name: 'demo01',
        component: () => import('@/views/crud-data/demo01'),
        meta: { title: '分页', icon: 'form' }
      },
      {
        path: 'demo02',
        name: 'demo02',
        component: () => import('@/views/crud-data/demo02'),
        meta: { title: '新增数据', icon: 'form' }
      },
      {
        path: 'demo03',
        name: 'demo03',
        component: () => import('@/views/crud-data/demo03'),
        meta: { title: '修改数据', icon: 'form' }
      },
      {
        path: 'demo04',
        name: 'demo04',
        component: () => import('@/views/crud-data/demo04'),
        meta: { title: '删除数据', icon: 'form' }
      },
      {
        path: 'demo05',
        name: 'demo05',
        component: () => import('@/views/crud-data/demo05'),
        meta: { title: '自定义操作列', icon: 'form' }
      },
      {
        path: 'demo06',
        name: 'demo06',
        component: () => import('@/views/crud-data/demo06'),
        meta: { title: '表单组件渲染', icon: 'form' }
      },
      {
        path: 'demo07',
        name: 'demo07',
        component: () => import('@/views/crud-data/demo07'),
        meta: { title: '表单布局', icon: 'form' }
      },
      {
        path: 'demo08',
        name: 'demo08',
        component: () => import('@/views/crud-data/demo08'),
        meta: { title: '表单校验', icon: 'form' }
      },
      {
        path: 'demo09',
        name: 'demo09',
        component: () => import('@/views/crud-data/demo09'),
        meta: { title: '表格内编辑', icon: 'form' }
      },
      {
        path: 'demo10',
        name: 'demo10',
        component: () => import('@/views/crud-data/demo10'),
        meta: { title: '表格自定义组件', icon: 'form' }
      },
      {
        path: 'demo11',
        name: 'demo11',
        component: () => import('@/views/crud-data/demo11'),
        meta: { title: '表格事件监听', icon: 'form' }
      },
      {
        path: 'demo12',
        name: 'demo12',
        component: () => import('@/views/crud-data/demo12'),
        meta: { title: '表单自定义组件', icon: 'form' }
      },
      {
        path: 'demo13',
        name: 'demo13',
        component: () => import('@/views/crud-data/demo13'),
        meta: { title: 'CRUD 事件', icon: 'form' }
      }
    ]
  },

  {
    path: '/crudx',
    component: Layout,
    redirect: '/crudx/table',
    name: 'Crudx',
    meta: { title: 'Crudx', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo01',
        name: 'demo01',
        component: () => import('@/views/crudx/demo01'),
        meta: { title: 'demo01', icon: 'form' }
      },
      {
        path: 'demo02',
        name: 'demo02',
        component: () => import('@/views/crudx/demo02'),
        meta: { title: 'demo02', icon: 'form' }
      },

    ]
  },

  {
    path: '/crudplus',
    component: Layout,
    redirect: '/crudplus/table',
    name: 'Crudplus',
    meta: { title: 'Crudplus', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo01',
        name: 'demo01',
        component: () => import('@/views/crudplus/demo01'),
        meta: { title: 'demo01', icon: 'form' }
      },
      {
        path: 'demo02',
        name: 'demo02',
        component: () => import('@/views/crudplus/demo02'),
        meta: { title: 'demo02', icon: 'form' }
      },

    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
