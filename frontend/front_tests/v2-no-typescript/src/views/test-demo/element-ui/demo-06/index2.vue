
  <template>
  <div class="transfer-table">
    <el-row>
      <el-col :span="11">
        <h4>待选择列表</h4>
        <el-table
          :data="sourceData"
          style="width: 100%"
          @row-click="handleSourceRowClick"
        >
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">
        <div class="transfer-table-btns">
          <el-button
            type="primary"
            icon="el-icon-arrow-right"
            @click="handleTransferRight"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-arrow-left"
            @click="handleTransferLeft"
          ></el-button>
        </div>
      </el-col>
      <el-col :span="11">
        <h4>已选择列表</h4>
        <el-table
          :data="targetData"
          style="width: 100%"
          @row-click="handleTargetRowClick"
        >
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TestElementUiDemo06View',
  data() {
    return {
      sourceData: [
        {
          key: 1,
          name: '张三',
          age: 18
        },
        {
          key: 2,
          name: '李四',
          age: 20
        },
        {
          key: 3,
          name: '王五',
          age: 22
        },
        {
          key: 4,
          name: '赵六',
          age: 24
        }
      ],
      targetData: [],
      currentSourceRow: null,
      currentTargetRow: null
    }
  },
  methods: {
    handleSourceRowClick(row) {
      this.currentSourceRow = row
      this.currentTargetRow = null
    },
    handleTargetRowClick(row) {
      this.currentSourceRow = null
      this.currentTargetRow = row
    },
    handleTransferRight() {
      if (this.currentSourceRow) {
        this.targetData.push(this.currentSourceRow)
        this.sourceData.splice(
          this.sourceData.indexOf(this.currentSourceRow),
          1
        )
        this.currentSourceRow = null
      }
    },
    handleTransferLeft() {
      if (this.currentTargetRow) {
        this.sourceData.push(this.currentTargetRow)
        this.targetData.splice(
          this.targetData.indexOf(this.currentTargetRow),
          1
        )
        this.currentTargetRow = null
      }
    }
  }
}
</script>

<style scoped>
.transfer-table {
  margin: 20px;
}
.transfer-table-btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  margin: 0 auto;
}
.transfer-table-btns button {
  margin-bottom: 10px;
}
</style>
