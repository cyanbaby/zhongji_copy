<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="演示el-cascader卡死" name="CascaderMemoryOverflow">
        <CascaderMemoryOverflow />
      </el-tab-pane>
      <el-tab-pane label="el-cascader 懒加载" name="CascaderLazy">
        <CascaderLazy />
      </el-tab-pane>
      <el-tab-pane label="el-cascader 回显" name="CascaderEcho">
        <CascaderEcho />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CascaderMemoryOverflow from './components/cascader-memory-overflow'
import CascaderLazy from './components/cascader-lazy'
import CascaderEcho from './components/cascader-echo'

export default {
  name: 'TestElementUiDemo01View',
  components: {
    CascaderMemoryOverflow,
    CascaderLazy,
    CascaderEcho
  },
  data() {
    return {
      activeName: 'CascaderMemoryOverflow'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
