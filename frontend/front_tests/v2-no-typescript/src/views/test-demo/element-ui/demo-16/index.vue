<template>
  <draggable v-model="tableData" tag="el-table" :element="'tbody'">
    <el-table :data="tableData" style="width: 100%" row-key="id">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="toggleRowExpansion(scope.row)"
            >展开</el-button
          >
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-table :data="scope.row.details" style="width: 100%">
            <el-table-column prop="detail" label="详细信息"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'TestElementUiDemo16View',
  components: { draggable },
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2023-11-24',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄',
          details: [{ detail: '详情信息 1' }]
        },
        {
          id: 2,
          date: '2023-11-25',
          name: '李四',
          address: '上海市普陀区金沙江路 1517 弄',
          details: [{ detail: '详情信息 2' }]
        }
        // ... 更多假数据 ...
      ],
      expandedRows: []
    }
  },
  methods: {
    toggleRowExpansion(row) {
      if (this.expandedRows.includes(row)) {
        this.expandedRows = this.expandedRows.filter((r) => r !== row)
      } else {
        this.expandedRows.push(row)
      }
    }
  }
}
</script>
