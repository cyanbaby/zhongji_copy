<template>
  <div style="margin: 15px">
    <h3>后端分页回显</h3>
    <ol>
      <li>真实请求，前端回显</li>
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
      <el-table-column prop="username" label="姓名"/>
      <el-table-column prop="date" label="生日"/>
      <el-table-column prop="ip" label="IP" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="city" label="城市" />
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
import axios from 'axios'

const map = new Map()
let newList = []

export default {
  name: 'TestElementUiDemo05View',
  data() {
    return {
      showTableData: [],
      currentPage: 1, // 这个属性是页面加载时分页组件默认选中的页码
      pageTotal: 0,
      pageSize: 10,
      multipleSelection: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const page = this.currentPage
      const limit = this.pageSize

      axios.get(`/user/userinfo/?page=${page}&limit=${limit}`).then(({ data: res }) => {
        if (res.code === 200 && res.data) {
          this.showTableData = res.data.list
          this.pageTotal = res.data.total
          console.log(this.showTableData)
          this.updateEcho()
        }
      })
    },
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
      // this.showTableData = this.tableData.slice(0, val)
      this.pageSize = val
      this.getList()
      // this.updateEcho()
    },
    /**
     * 修改页码
     * */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
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
