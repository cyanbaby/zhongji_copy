<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="productName" label="产品名称"> </el-table-column>
      <el-table-column prop="customerName" label="客户"> </el-table-column>
      <el-table-column prop="baoXiao" label="报销"> </el-table-column>
      <el-table-column prop="shenHe" label="审核"> </el-table-column>
    </el-table>
    <br />
    <el-button type="primary" plain @click="handleClickMagic" :disabled="isMagic">Magic</el-button>
    <el-button type="primary" plain @click="handleClickReset">reset</el-button>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import tableData from './tableData'

export default {
  name: 'TestElementUiDemo11View',
  data() {
    return {
      // 原始数据是乱序的
      tableData: cloneDeep(tableData),
      isMagic: false
    }
  },
  methods: {
    handleClickReset() {
      this.tableData = cloneDeep(tableData)
      this.isMagic = false
    },
    handleClickMagic() {
      // 数组对象根据每个对象的指定key值归类
      const result = this.tableData.reduce((a, b) => {
        if (a[b.productName]) {
          a[b.productName].push(b)
        } else {
          a[b.productName] = [b]
        }
        return a
      }, {})
      // console.log(result)

      // 所有key值
      const productKeys = Object.keys(result)
      // console.log(productKeys)
      // 所有key值的排序
      const productKeysSort = productKeys.sort(function (a, b) {
        return a.localeCompare(b, 'zh-CN')
      })
      // console.log(productKeysSort)

      // 添加合计
      productKeysSort.forEach((k) => {
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

      this.isMagic = true
    }
  }
}
</script>
