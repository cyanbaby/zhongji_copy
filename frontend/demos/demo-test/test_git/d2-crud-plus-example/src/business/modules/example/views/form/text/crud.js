export const crudOptions = (vm) => {
  console.log(vm)
  setTimeout(() => {
    vm.bar = 'crud.js 通过 vm.xxx 修改的值也是响应式的'
  }, 1500)
  return {
    options: {
      height: '100%'
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 90,
        // TODO 排序: 正序 || 倒序配置
        sortable: true,
        form: {
          disabled: true // 完全关闭该字段在表单中显示
          // http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#form
        }
      },

      {
        title: '文本',
        key: 'text',
        type: 'text',
        search: {
          show: true
        },
        sortable: true
      },
      {
        title: '文本域',
        key: 'text-area',
        sortable: true,
        search: {
          // show: true,
          disabled: true
          // show 和 disabled 是互斥的， 不写 search 默认没有，写了 search: {} 空对象也会出现
        },
        type: 'text-area'
      }
    ]
  }
}
