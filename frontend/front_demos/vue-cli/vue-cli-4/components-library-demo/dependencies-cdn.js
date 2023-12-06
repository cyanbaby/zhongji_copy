/*
 * @Author: 姚文彬
 * @Date: 2021-06-03 17:12:20
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-03 21:01:23
 * @FilePath: \p-front-admin\dependencies-cdn.js
 */
const timestamp = new Date().getTime();

module.exports = [
  {
    name: 'vue',
    library: 'Vue',
    js: 'https://static.peixunyun.cn/plugins/vue%402.7.13/vue.min.js',
    css: ''
  },
  // {
  //   name: 'vue-router',
  //   library: 'VueRouter',
  //   js: 'https://static.peixunyun.cn/plugins/vue-router%403.6.5/vue-router.min.js',
  //   css: ''
  // },
  // {
  //   name: 'vuex',
  //   library: 'Vuex',
  //   js: 'https://static.peixunyun.cn/plugins/vuex%403.6.2/vuex.min.js',
  //   css: ''
  // },
  // {
  //   name: 'axios',
  //   library: 'axios',
  //   js: 'https://static.peixunyun.cn/plugins/axios%400.19.0/axios.min.js',
  //   css: ''
  // },
  // {
  //   name: 'better-scroll',
  //   library: 'BScroll',
  //   js: 'https://static.peixunyun.cn/plugins/better-scroll%401.15.2/bscroll.min.js',
  //   css: ''
  // },
  // {
  //   name: 'axios-mock-adapter',
  //   library: 'AxiosMockAdapter',
  //   js:
  //       'https://static.peixunyun.cn/plugins/axios-mock-adapter%401.18.1/axios-mock-adapter.min.js',
  //   css: ''
  // },
  {
    name: 'element-ui',
    library: 'ELEMENT',
    js: 'https://static.peixunyun.cn/plugins/element-ui%402.15.11/index.js',
    css:
        'https://static.peixunyun.cn/plugins/element-ui%402.15.11/theme-chalk/index.css'
  },
  {
    name: 'lodash',
    library: '_',
    js: 'https://static.peixunyun.cn/plugins/lodash%404.17.15/lodash.min.js',
    css: ''
  },
  // {
  //   name: 'ua-parser-js',
  //   library: 'UAParser',
  //   js:
  //       'https://static.peixunyun.cn/plugins/ua-parser-js%400.7.20/ua-parser.min.js',
  //   css: ''
  // },
  // {
  //   name: 'js-cookie',
  //   library: 'Cookies',
  //   js: 'https://static.peixunyun.cn/plugins/js-cookie%402.2.1/js.cookie.min.js',
  //   css: ''
  // },
  // {
  //   name: 'nprogress',
  //   library: 'NProgress',
  //   js: 'https://static.peixunyun.cn/plugins/nprogress%400.2.0/nprogress.min.js',
  //   css: 'https://static.peixunyun.cn/plugins/nprogress%400.2.0/nprogress.css'
  // },
  // {
  //   name: 'dayjs',
  //   library: 'dayjs',
  //   js: 'https://static.peixunyun.cn/plugins/dayjs%401.8.17/dayjs.min.js',
  //   css: ''
  // },
  // {
  //   name: 'fuse.js',
  //   library: 'Fuse',
  //   js: 'https://static.peixunyun.cn/plugins/fuse.js%405.2.3/fuse.min.js',
  //   css: ''
  // },
  // {
  //   name: 'hotkeys-js',
  //   library: 'hotkeys',
  //   js: 'https://static.peixunyun.cn/plugins/hotkeys-js%403.7.3/hotkeys.min.js',
  //   css: ''
  // },
  // {
  //   name: 'qs',
  //   library: 'Qs',
  //   js: 'https://static.peixunyun.cn/plugins/qs%406.9.1/qs.js',
  //   css: ''
  // },
  // {
  //   name: 'lowdb',
  //   library: 'low',
  //   js: 'https://static.peixunyun.cn/plugins/lowdb%401.0.0/low.min.js',
  //   css: ''
  // },
  // {
  //   name: 'lowdb/adapters/LocalStorage',
  //   library: 'LocalStorage',
  //   js: 'https://static.peixunyun.cn/plugins/lowdb%401.0.0/LocalStorage.min.js',
  //   css: ''
  // },
  // {
  //   name: 'screenfull',
  //   library: 'screenfull',
  //   js: 'https://static.peixunyun.cn/plugins/screenfull%405.0.2/screenfull.min.js',
  //   css: ''
  // },
  // {
  //   name: 'sortablejs',
  //   library: 'Sortable',
  //   js: 'https://static.peixunyun.cn/plugins/sortablejs%401.10.1/Sortable.min.js',
  //   css: ''
  // },
  {
    name: '@jjy-npm/form-making-advanced',
    library: 'FormMaking',
    js: `https://fefile.peixunyun.cn/admin/plugins/form-making-advanced/dist-14/FormMaking.umd.min.js?_t=${timestamp}`,
    css: `https://fefile.peixunyun.cn/admin/plugins/form-making-advanced/dist-14/FormMaking.css?_t=${timestamp}`
  },

  {
    name: 'xe-utils',
    library: 'XEUtils',
    js: `https://fefile.peixunyun.cn/admin/plugins/xe-utils/xe-utils.umd.min.js?_v=3.2.1`,
    css: ``
  },

  {
    name: 'vxe-table',
    library: 'VXETable',
    js: `https://fefile.peixunyun.cn/admin/plugins/vxe-table/index.umd.min.js?_v=3.3.6`,
    css: `https://fefile.peixunyun.cn/admin/plugins/vxe-table/style.min.css?_v=3.3.6`
  },


  {
    name: '@jjy-npm/form-making-signup',
    library: 'FormMakingSignup',
    js: `https://fefile.peixunyun.cn/admin/plugins/form-making-signup/dist-2/FormMakingSignup.umd.min.js?_v=1.1.2`,
    css: `https://fefile.peixunyun.cn/admin/plugins/form-making-signup/dist-2/FormMakingSignup.css?_v=1.1.2`
  },
  {
    name: '@/plugin/ckeditor/build/ckeditor',
    library: 'ClassicEditor',
    js: `https://fefile.peixunyun.cn/admin/plugins/classic-editor/build/ckeditor.js?_v=3`,
    css: ``
  },
  
  {
    name: 'echarts',
    library: 'echarts',
    js: `https://fefile.peixunyun.cn/admin/plugins/echarts/echarts.min.js?_v=5.4.2`,
    css: ``
  },

  // {
  //   name: 'pdfjs-dist',
  //   library: 'pdfjsLib',
  //   js: 'https://fefile.peixunyun.cn/admin/plugins/pdfjs-dist/pdf.js?',
  //   css: ``
  // },

  // {
  //   name: 'pdfjs-dist/es5/build/pdf.js',
  //   library: 'PDFJS',
  //   js: 'https://fefile.peixunyun.cn/admin/plugins/pdfjs-dist/pdf.min.js?_v=2.5.207',
  //   css: ``
  // },

  // {
  //   name: 'worker-loader!pdfjs-dist/es5/build/pdf.worker.js',
  //   library: 'PdfjsWorker',
  //   js: 'https://fefile.peixunyun.cn/admin/plugins/pdfjs-dist/pdf.worker.min.js?_v=2.5.207',
  //   css: ``
  // },



  {
    name: 'pdfjs-dist/build/pdf',
    library: 'PDFJS',
    js: 'https://fefile.peixunyun.cn/admin/plugins/pdfjs-dist/pdf.min.js',
    css: ``
  },

  {
    name: 'pdfjs-dist/build/pdf.worker',
    library: 'PdfjsWorker',
    js: 'https://fefile.peixunyun.cn/admin/plugins/pdfjs-dist/pdf.worker.min.js',
    css: ``
  },

  

  
  
]
