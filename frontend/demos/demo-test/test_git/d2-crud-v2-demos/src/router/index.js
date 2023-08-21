import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      { path: '', component: () => import('@/views/index.vue') },
      { path: 'demo1', name: 'demo1', component: () => import('@/views/d2-crud/demo1'), meta: { title: '基础表格' } },
      { path: 'demo2', name: 'demo2', component: () => import('@/views/d2-crud/demo2'), meta: { title: '带斑马纹表格' } },
      { path: 'demo3', name: 'demo3', component: () => import('@/views/d2-crud/demo3'), meta: { title: '带边框表格' } },
      { path: 'demo4', name: 'demo4', component: () => import('@/views/d2-crud/demo4'), meta: { title: '带状态表格' } },
      { path: 'demo5', name: 'demo5', component: () => import('@/views/d2-crud/demo5'), meta: { title: '固定表头' } },
      { path: 'demo6', name: 'demo6', component: () => import('@/views/d2-crud/demo6'), meta: { title: '固定列' } },
      { path: 'demo7', name: 'demo7', component: () => import('@/views/d2-crud/demo7'), meta: { title: '流体高度' } },
      { path: 'demo8', name: 'demo8', component: () => import('@/views/d2-crud/demo8'), meta: { title: '多级表头' } },
      { path: 'demo9', name: 'demo9', component: () => import('@/views/d2-crud/demo9'), meta: { title: '单选' } },
      { path: 'demo10', name: 'demo10', component: () => import('@/views/d2-crud/demo10'), meta: { title: '多选' } },
      { path: 'demo11', name: 'demo11', component: () => import('@/views/d2-crud/demo11'), meta: { title: '排序' } },
      { path: 'demo12', name: 'demo12', component: () => import('@/views/d2-crud/demo12'), meta: { title: '筛选' } },
      { path: 'demo13', name: 'demo13', component: () => import('@/views/d2-crud/demo13'), meta: { title: '表尾合计行' } },
      { path: 'demo14', name: 'demo14', component: () => import('@/views/d2-crud/demo14'), meta: { title: '合并行' } },
      { path: 'demo15', name: 'demo15', component: () => import('@/views/d2-crud/demo15'), meta: { title: '合并列' } },
      { path: 'demo16', name: 'demo16', component: () => import('@/views/d2-crud/demo16'), meta: { title: '新增数据' } },
      { path: 'demo17', name: 'demo17', component: () => import('@/views/d2-crud/demo17'), meta: { title: '修改数据' } },
      { path: 'demo18', name: 'demo18', component: () => import('@/views/d2-crud/demo18'), meta: { title: '删除数据' } },
      { path: 'demo19', name: 'demo19', component: () => import('@/views/d2-crud/demo19'), meta: { title: '自定义操作列' } },
      { path: 'demo20', name: 'demo20', component: () => import('@/views/d2-crud/demo20'), meta: { title: '表单组件渲染' } },
      { path: 'demo21', name: 'demo21', component: () => import('@/views/d2-crud/demo21'), meta: { title: '表单布局' } },
      { path: 'demo22', name: 'demo22', component: () => import('@/views/d2-crud/demo22'), meta: { title: '表单校验' } },
      { path: 'demo23', name: 'demo23', component: () => import('@/views/d2-crud/demo23'), meta: { title: '表格内编辑' } },
      { path: 'demo24', name: 'demo24', component: () => import('@/views/d2-crud/demo24'), meta: { title: '表格slot' } },
      { path: 'demo25', name: 'demo25', component: () => import('@/views/d2-crud/demo25'), meta: { title: '表格自定义组件' } },
      { path: 'demo26', name: 'demo26', component: () => import('@/views/d2-crud/demo26'), meta: { title: '表单自定义组件' } },
      { path: 'demo27', name: 'demo27', component: () => import('@/views/d2-crud/demo27'), meta: { title: '加载状态' } },
      { path: 'demo28', name: 'demo28', component: () => import('@/views/d2-crud/demo28'), meta: { title: '自定义加载状态' } },
      { path: 'demo29', name: 'demo29', component: () => import('@/views/d2-crud/demo29'), meta: { title: '分页' } },
      { path: 'demo30', name: 'demo30', component: () => import('@/views/d2-crud/demo30'), meta: { title: '表单事件监听' } },
      { path: 'demo31', name: 'demo31', component: () => import('@/views/d2-crud/demo31'), meta: { title: 'CRUD事件' } }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
