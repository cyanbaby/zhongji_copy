import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const d2ContainerRouter = {
  path: '/d2-container',
  name: 'd2-container',
  meta: {
    title: '容器',
    auth: true
  },
  component: layoutHeaderAside,
  children: [
    {
      path: 'demo-01',
      name: 'demo-01',
      meta: {
        title: 'filename',
        auth: true
      },
      component: _import('d2-container/demo-01')
    },
    {
      path: 'demo-02',
      name: 'demo-02',
      meta: {
        title: 'slot',
        auth: true
      },
      component: _import('d2-container/demo-02')
    },
    {
      path: 'demo-03',
      name: 'demo-03',
      meta: {
        title: 'demo 3',
        auth: true
      },
      component: _import('d2-container/demo-03')
    },
    {
      path: 'demo-04',
      name: 'demo-04',
      meta: {
        title: 'demo 4',
        auth: true
      },
      component: _import('d2-container/demo-04')
    },
    {
      path: 'demo-05',
      name: 'demo-05',
      meta: {
        title: 'demo 5',
        auth: true
      },
      component: _import('d2-container/demo-05')
    }
  ]
}

export default d2ContainerRouter
