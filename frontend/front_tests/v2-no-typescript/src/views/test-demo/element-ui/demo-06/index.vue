<template>
  <div class="transfer-table">
    <el-table
      :data="leftData"
      @selection-change="handleLeftSelectionChange"
      ref="leftTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
    </el-table>
    <div class="transfer-btns">
      <el-button type="primary" @click="moveToRight">往右</el-button>
      <el-button type="primary" @click="moveToLeft">往左</el-button>
    </div>
    <el-table
      :data="rightData"
      @selection-change="handleRightSelectionChange"
      ref="rightTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TransferTable',
  data() {
    return {
      leftSelection: [],
      leftData: [
        { id: 1, name: 'John', age: 20 },
        { id: 2, name: 'Emily', age: 22 },
        { id: 3, name: 'Jack', age: 25 }
      ],
      rightData: [
        { id: 4, name: 'Kate', age: 27 }
      ]
    }
  },
  methods: {
    handleLeftSelectionChange(selection) {
      this.leftSelection = selection
    },
    handleRightSelectionChange(selection) {
      this.rightSelection = selection
    },
    moveToRight() {
      this.rightData = this.rightData.concat(this.leftSelection)
      this.leftData = this.leftData.filter(item => !this.leftSelection.includes(item))
      this.$refs.leftTable.clearSelection()
    },
    moveToLeft() {
      this.leftData = this.leftData.concat(this.rightSelection)
      this.rightData = this.rightData.filter(item => !this.rightSelection.includes(item))
      this.$refs.rightTable.clearSelection()
    }
  }
}
</script>

<style scoped>
.transfer-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transfer-btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}
</style>
