import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = 'admin-token'
  const role = 'admin'
  if (hasToken) {
    next()
    const accessRoutes = await store.dispatch('permission/generateRoutes', role)
    router.addRoutes(accessRoutes)
  }
})


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
