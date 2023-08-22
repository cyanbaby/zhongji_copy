<template>
  <div style="margin: 15px">
    <h3>el-table @select事件版本表格回显演示</h3>

    <div style="display: flex">
      <div style="margin: 10px; flex: 1">
        <el-table
          ref="testTable"
          :data="showTableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
          @select-all="handleSelectAllChange"
          @select="handleSelectRowChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="address" label="地址" show-overflow-tooltip />
        </el-table>
      </div>
      <div
        style="
          margin: 10px;
          padding: 10px;
          flex: 1;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
        "
      >
        <el-tag
          v-for="tag in allSelection"
          :key="tag.id"
          style="margin: 5px"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>
    <el-pagination
      style="margin-left: 10px"
      class="echo-pagination"
      :total="pageTotal"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import tableData from './tableData'
/**
 * 事件顺序:
 *    select 事件 selection-change 事件
 *    selection-change 事件  select-all 事件
 *    select 和 select-all不会同时触发
 * 如何得知当前操作是什么操作(勾选行，取消勾选行，全选，取消全选) => 自带的事件即可得知1/2(select-all, select 事件)
 * 如何区分当前操作是: 勾选还是取消勾选?  => 计算
 */
export default {
  name: 'TestElementUiDemo15View',
  data() {
    return {
      tableData: tableData,
      showTableData: [],
      currentPage: 1, // 这个属性是页面加载时分页组件默认选中的页码
      pageTotal: 0,
      pageSize: 5,
      multipleSelection: [],

      allSelection: []
    }
  },
  mounted() {
    this.pageTotal = this.tableData.length
    this.showTableData = this.tableData.slice(0, 5)
  },
  methods: {
    handleClose(tag) {
      const deleteList = this.allSelection.splice(this.allSelection.indexOf(tag), 1)

      this.showTableData.forEach((row) => {
        if (deleteList.map((i) => i.id).includes(row.id)) {
          this.$refs.testTable.toggleRowSelection(row, false)
        }
      })
    },
    /**
     * PageSize 修改页面默认显示条数
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.showTableData = this.tableData.slice(0, val)

      this.updateChoose()
    },
    /**
     * 修改页码
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.showTableData = this.tableData.slice(
        (val - 1) * Number(this.pageSize),
        val * Number(this.pageSize)
      )

      this.updateChoose()
    },

    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     */
    handleSelectAllChange(selection) {
      // console.group('select-all 事件')
      // console.log(selection)
      // console.groupEnd()

      if (selection.length) {
        // 全选
        this.showTableData.forEach((row) => {
          if (!this.allSelection.map((i) => i.id).includes(row.id)) {
            this.allSelection.push(row)
            this.$refs.testTable.toggleRowSelection(row, true)
          }
        })
      } else {
        // 取消全选
        this.showTableData.forEach((row) => {
          if (this.allSelection.map((i) => i.id).includes(row.id)) {
            const index = this.allSelection.findIndex((e) => e.id === row.id)
            this.allSelection.splice(index, 1)
            this.$refs.testTable.toggleRowSelection(row, false)
          }
        })
      }
    },

    /**
     * 当用户手动勾选数据行的 Checkbox 时触发的事件
     */
    handleSelectRowChange(selection, row) {
      // console.log('select 事件')
      const action = selection.map((i) => i.id).includes(row.id)
      if (action) {
        // 勾选
        if (!this.allSelection.map((i) => i.id).includes(row.id)) {
          this.allSelection.push(row)
        }
      } else {
        // 取消勾选
        if (this.allSelection.map((i) => i.id).includes(row.id)) {
          const index = this.allSelection.findIndex((e) => e.id === row.id)
          this.allSelection.splice(index, 1)
        }
      }
    },

    /**
     * selection-change 勾选事件
     */
    handleSelectionChange(val) {
      // console.log('selection-change 事件')
      this.multipleSelection = val
    },

    updateChoose() {
      // console.log('updateChoose')
      this.$nextTick(() => {
        this.showTableData.forEach((row) => {
          if (this.allSelection.map((i) => i.id).includes(row.id)) {
            this.$refs.testTable.toggleRowSelection(row, true)
          }
        })
      })
    },

    _updateChoose() {
      // console.log('updateChoose')
      this.$nextTick(() => {
        this.showTableData.forEach((row) => {
          if (this.allSelection.map((i) => i.id).includes(row.id)) {
            this.$refs.testTable.toggleRowSelection(row, true)
          } else {
            this.$refs.testTable.toggleRowSelection(row, false)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echo-pagination {
  margin-top: 6px;
}
</style>
