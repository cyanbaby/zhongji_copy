export default {
  install (Vue, options) {
    Vue.prototype.$open = function (url) {
      var a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('target', '_blank')
      a.setAttribute('id', 'd2admin-link-temp')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(document.getElementById('d2admin-link-temp'))
    }
  }
}
