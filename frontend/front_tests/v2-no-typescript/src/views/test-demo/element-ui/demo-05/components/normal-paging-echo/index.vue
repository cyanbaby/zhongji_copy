<template>
  <div style="margin: 15px">
    <h3>普通分页回显</h3>
    <ol>
      <li>干干净净，只有回显</li>
      <li>模拟请求，回显原理</li>
    </ol>

    <el-table
      ref="multipleTable"
      :data="showTableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="address" label="地址" show-overflow-tooltip />
    </el-table>

    <el-pagination
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

const map = new Map()
let newList = []

export default {
  name: 'NormalPagingEcho',
  data() {
    return {
      tableData: tableData,
      showTableData: [],
      currentPage: 1, // 这个属性是页面加载时分页组件默认选中的页码
      pageTotal: 0,
      pageSize: 5,
      multipleSelection: []
    }
  },
  mounted() {
    this.pageTotal = this.tableData.length
    this.showTableData = this.tableData.slice(0, 5)
  },
  methods: {
    updateEcho() {
      const list = [...newList]
      this.$nextTick(() => {
        this.showTableData.forEach((it) => {
          list.forEach((items) => {
            if (items.id === it.id) {
              this.$refs.multipleTable.toggleRowSelection(it)
            }
          })
        })
      })
    },

    /**
     * PageSize 修改页面默认显示条数
     * */
    handleSizeChange(val) {
      this.pageSize = val
      this.showTableData = this.tableData.slice(0, val)

      this.updateEcho()
    },
    /**
     * 修改页码
     * */
    handleCurrentChange(val) {
      this.currentPage = val
      this.showTableData = this.tableData.slice(
        (val - 1) * Number(this.pageSize),
        val * Number(this.pageSize)
      )
      // 因为是模拟数据,所以只能在分页上进行回显,正常状态下应该是向后台重新拉取到数据列表的时候,切是在渲染表数据赋值之后进行
      // ==============================================以下皆为模拟后台返回数据之后进行

      this.updateEcho()
    },
    /**
     * 批量选中
     * */
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.echoData()
    },
    /**
     * 分页回显必须确定一个唯一健,不能有重复
     *
     * */
    echoData() {
      const temp = []
      if (this.multipleSelection.length > 0) {
        const m = new Map()
        for (let i = 0; i < this.multipleSelection.length; i++) {
          m.set(this.multipleSelection[i].id, this.multipleSelection[i].id)
        }
        for (let i = 0; i < this.showTableData.length; i++) {
          if (
            m.get(this.showTableData[i].id) == null ||
            !m.get(this.showTableData[i].id)
          ) {
            temp.push(this.showTableData[i].id)
          }
        }
      } else {
        for (let i = 0; i < this.showTableData.length; i++) {
          temp.push(this.showTableData[i].id)
        }
      }

      for (let i = 0; i < this.multipleSelection.length; i++) {
        map.set(this.multipleSelection[i].id, this.multipleSelection[i])
      }
      for (let i = 0; i < temp.length; i++) {
        map.delete(temp[i])
      }
      const list = []
      map.forEach(function (key) {
        list.push(key)
      })
      newList = list
    }
  }
}
</script>

<style lang="scss" scoped>
.echo-pagination {
  margin-top: 6px;
}
</style>
