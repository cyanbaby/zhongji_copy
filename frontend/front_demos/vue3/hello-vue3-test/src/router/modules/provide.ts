
const provideRouter = [
  {
    path: '/provide/demo01',
    name: 'provideDemo01',
    component: () => import('../../views/provide/index.vue')
  },
]
export default provideRouter
