<template>
  <view class="demo-container">
    z-table: 自定义表格合并

      <z-table
        :data="tableData"
        :columns="columns"
        :merge="tableMergeMap"
        :merge-changed="mergeChanged"
      />


  </view>
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
        { title: '姓名', key: 'name', width: 200 },
        { title: '年龄', key: 'age', width: 200 },
        { title: '数值 1', key: 'amount1', width: 200 },
        { title: '数值 2', key: 'amount2', width: 200 },
        { title: '数值 3', key: 'amount3', width: 200 }
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
      ],
      columnsCooy: [],
      tableDataCopy: [],
      tableMergeMap: new Map(),
      mergeChanged: false
    }
  },
  created() {
    
    function initRowSpan(key, columnIndex) {

      const values = this.tableDataCopy.map(row => row[key])

      let prev, startRowIndex

      values.forEach((value, rowIndex) => {
        if(rowIndex === 0) {
          this.tableMergeMap.set(columnIndex+'__postion__'+rowIndex, {
            value,
            rowspan: 1,
            colspan: 1,
          })
          startRowIndex = rowIndex
        } else {
          if (prev === value) {
            // 这里是必然存在
            const obj = this.tableMergeMap.get(columnIndex+'__postion__'+startRowIndex)
            obj.rowspan += 1
            this.tableMergeMap.set(columnIndex+'__postion__'+startRowIndex, obj)

            this.tableMergeMap.set(columnIndex+'__postion__'+rowIndex, {
              value,
              rowspan: 0,
              colspan: 1,
            })
          } else {
            startRowIndex = rowIndex
            this.tableMergeMap.set(columnIndex+'__postion__'+rowIndex, {
              value,
              rowspan: 1,
              colspan: 1,
            })
          }
        }
        prev = value
      });

    }
    this.columnsCooy = JSON.parse(JSON.stringify(this.columns));
    this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData))
    // 先穷举 在循环, 写死 columnIndex
    setTimeout(() => {
        initRowSpan.call(this,"name", 0)
        initRowSpan.call(this,"age", 1)
        initRowSpan.call(this,"amount1", 2)
        initRowSpan.call(this,"amount2", 3)
        initRowSpan.call(this,"amount3", 4)
        this.mergeChanged = !this.mergeChanged
    }, 1000)
  },
}
</script>

<style></style>
