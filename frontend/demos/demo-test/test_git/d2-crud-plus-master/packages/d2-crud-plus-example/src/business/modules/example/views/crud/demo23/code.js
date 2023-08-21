export default `<template>
  <div>
    <d2-crud-x
      :columns="columns"
      :data="data"
      @cell-data-change="handleCellDataChange"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      doc,
      code,
      columns: [
        {
          title: '日期',
          key: 'date',
          component: {
            name: 'el-date-picker',
            size: 'small'
          }
        },
        {
          title: '姓名',
          key: 'name',
          component: {
            name: 'el-select',
            // 建议使用 d2-crud-plus 带的 dict-select组件,看下面
            children (h) {
              const items = []
              items.push(<el-option value='王小虎'>王小虎</el-option>)
              items.push(<el-option value='王中虎'>王中虎</el-option>)
              items.push(<el-option value='王老虎'>王老虎</el-option>)
              return items
            },
            size: 'small'
          }
        },
        {
          title: '状态',
          key: 'status',
          value: '1', // 默认值
          component: {
            name: 'dict-select',
            props: {
              dict: {
                data: [
                  { value: '1', label: '开启' },
                  { value: '2', label: '关闭' },
                  { value: '3', label: '停止' }
                ]
              },
              elProps: {
                size: 'small'
              }
            }
          }
        },
        {
          title: '地址',
          key: 'address',
          component: {
            name: 'el-input',
            size: 'small'
          }
        }
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: '1'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          status: '1'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          status: '1'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          status: '1'
        }
      ]
    }
  },
  methods: {
    handleCellDataChange ({ rowIndex, key, value, row }) {
      console.log(rowIndex)
      console.log(key)
      console.log(value)
      console.log(row)
    }
  }
}
</script>`
