<template>
  <div class="demo-container">
    z-table: 自定义表格合并
    <z-table
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
import zTable from './z-table'

export default {
  name: 'Base2',
  components: {
    zTable
  },
  data() {
    return {
      columns: [
        { title: '姓名', key: 'name', width: 100 },
        { title: '年龄', key: 'age', width: 100 },
        { title: '数值 1', key: 'amount1', width: 100 },
        { title: '数值 2', key: 'amount2', width: 100 },
        { title: '数值 3', key: 'amount3', width: 100 }
        // { title: "ID", key: "id" },
      ],
      tableData: [
        {
          id: '12987122',
          name: '王小虎0',
          age: 18,
          amount1: '234',
          amount2: '30',
          amount3: 10
        },
        {
          id: '12987123',
          name: '王小虎0',
          age: 18,
          amount1: '234',
          amount2: '30',
          amount3: 12
        },
        {
          id: '12987124',
          name: '王小虎2',
          age: 19,
          amount1: '235',
          amount2: '30',
          amount3: 9
        },
        {
          id: '12987125',
          name: '王小虎3',
          age: 16,
          amount1: '621',
          amount2: '30',
          amount3: 17
        },
        {
          id: '12987126',
          name: '王小虎3',
          age: 16,
          amount1: '539',
          amount2: '30',
          amount3: 15
        }
      ]
    }
  }
}
</script>

<style></style>
