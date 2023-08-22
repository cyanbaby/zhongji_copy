<template>
  <div class="demo-container">
    z-table: 自定义表格合并

    <z-table :data="tableData" :columns="columns" :merge="merge" />
  </div>
</template>

<script>
import zTable from './z-table'
// import tableData from './z-table/tableData.js'
import tableData from './tableData.js'

export default {
  name: 'Base2A',
  components: {
    zTable
  },
  data() {
    return {
      isShow: false,
      columns: [
        { key: 'productName', title: '产品名', width: 250 },
        { key: 'customerName', title: '客户', width: 250 },
        // { key: 'baoXiao', title: '报销', width: 250 },
        { key: 'shenHe', title: '审核', width: 250 }
      ],
      tableData: tableData,
      columnsCooy: [],
      tableDataCopy: [],
      merge: {}
    }
  },
  created() {
    this.handleClickMagic()
    this.mergeTable()
  },
  methods: {
    handleClickMagic() {
      // 数组对象根据每个对象的指定key值归类
      const result = this.tableData.reduce((a, b) => {
        // console.log('a', a)
        if (a[b.productName]) {
          // console.log('a[b.productName]', a[b.productName])
          a[b.productName].push(b)
        } else {
          // console.log('[b]', [b])
          a[b.productName] = [b]
        }
        return a
      }, {})
      // console.log('result', result)
      // 所有key值
      const productKeys = Object.keys(result)
      // console.log('productKeys', productKeys)
      // 所有key值的排序
      const productKeysSort = productKeys.sort(function (a, b) {
        // console.log("a.localeCompare(b, 'zh-CN')", a.localeCompare(b, 'zh-CN'))
        return a.localeCompare(b, 'zh-CN')
      })
      // console.log(productKeysSort)

      // 添加合计
      let newArray = []
      productKeysSort.forEach((k) => {
        newArray = result[k].reduce((total, cur, index) => {
          const hasValue = total.findIndex((current) => {
            return current.customerName === cur.customerName
          })
          hasValue === -1 && total.push(cur)
          hasValue !== -1 && (total[hasValue].shenHe = total[hasValue].shenHe + cur.shenHe)
          return total
        }, [])
        result[k] = newArray
        const count = result[k].reduce(function (countObj, current) {
          // 判断当前数组元素是否出现过
          if (countObj.productName) {
            countObj.customerName += current.customerName
            countObj.baoXiao += current.baoXiao
            countObj.shenHe += current.shenHe
          } else {
            countObj = {
              productName: '合计',
              _productName: current.productName,
              customerName: current.customerName,
              baoXiao: current.baoXiao,
              shenHe: current.shenHe
            }
          }
          return countObj
        }, {})

        result[k].push(count)
      })

      // 重写表格数据
      const _tableData = productKeysSort.map((k) => result[k]).flat()
      // console.log(_tableData)
      this.tableData = _tableData
      this.tableData.push({
        productName: '汇总'
      })
    },
    mergeTable() {
      function initRowSpan(key, columnIndex) {
        const values = this.tableDataCopy.map((row) => row[key])
        let prev, startRowIndex

        values.forEach((value, rowIndex) => {
          if (rowIndex === 0) {
            this.merge[columnIndex + '__postion__' + rowIndex] = {
              value,
              rowspan: 1,
              colspan: 1
            }
            startRowIndex = rowIndex
          } else {
            if (prev === value && columnIndex < 1) {
              // 这里是必然存在
              this.merge[
                columnIndex + '__postion__' + startRowIndex
              ].rowspan += 1

              this.merge[columnIndex + '__postion__' + rowIndex] = {
                value,
                rowspan: 0,
                colspan: 1
              }
            } else {
              startRowIndex = rowIndex

              this.merge[columnIndex + '__postion__' + rowIndex] = {
                value,
                rowspan: 1,
                colspan: 1
              }
            }
          }
          prev = value
        })
      }

      // this.columnsCooy = JSON.parse(JSON.stringify(this.columns))
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData))
      this.columns.forEach((col, index) => {
        initRowSpan.call(this, col.key, index)
      })
    }
  }
}
</script>

<style></style>
