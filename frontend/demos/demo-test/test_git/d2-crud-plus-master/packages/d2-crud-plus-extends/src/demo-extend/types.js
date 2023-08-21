export default {
  // 字段类型配置，注册之后即可在crud.js中使用了
  'demo-extend': {
    // 表单组件配置
    form: { component: { name: 'd2p-form-input', props: { color: 'danger' } } },
    // 行组件配置
    component: { name: 'd2p-row-format', props: { color: 'success' } },
    // 行展示时居中
    align: 'center'
    // 您还可以写更多默认配置
  }
}
