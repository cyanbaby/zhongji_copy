<template>
  <div style="margin: 20px">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="primaryElement" label="一级要素" width="200" />
      <el-table-column prop="secondaryElements" label="二级要素" width="200" />
      <el-table-column prop="thirdLevelElements" label="三级要素" width="200" />
      <el-table-column prop="dataDirectory" label="数据目录" width="200" />
      <el-table-column prop="value" label="具体数据" width="200" />
      <el-table-column prop="ringRatio" label="环比" width="200" />
      <el-table-column prop="yearOnYear" label="同比" width="200" />

    </el-table>
  </div>
</template>

<script>
import tableData from './tableData.js'
export default {
  data() {
    return {
      tableData: tableData
    }
  }
}
</script>
