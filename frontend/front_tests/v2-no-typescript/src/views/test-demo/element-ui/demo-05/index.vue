<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="普通分页回显" name="NormalPagingEcho">
        <NormalPagingEcho />
      </el-tab-pane>
      <el-tab-pane label="后端分页回显" name="BackPagingEcho">
        <BackPagingEcho />
      </el-tab-pane>
      <el-tab-pane label="混入默认回显" name="MixinPagingEcho">
        <MixinPagingEcho />
      </el-tab-pane>
      <el-tab-pane label="混入双向绑定" name="BindingPagingEcho">
        <BindingPagingEcho />
      </el-tab-pane>
      <el-tab-pane label="简单模态回显" name="SimplemodePagingEcho">
        <SimplemodePagingEcho />
      </el-tab-pane>
      <el-tab-pane label="复杂模态回显" name="ComplexdePagingEcho">
        <ComplexdePagingEcho />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NormalPagingEcho from './components/normal-paging-echo'
import BackPagingEcho from './components/back-paging-echo'
import MixinPagingEcho from './components/mixin-paging-echo'
import BindingPagingEcho from './components/binding-paging-echo'
import SimplemodePagingEcho from './components/simplemode-paging-echo'
import ComplexdePagingEcho from './components/complex-paging-echo'

export default {
  name: 'TestElementUiDemo05View',
  components: {
    NormalPagingEcho,
    BackPagingEcho,
    MixinPagingEcho,
    BindingPagingEcho,
    SimplemodePagingEcho,
    ComplexdePagingEcho
  },
  data() {
    return {
      activeName: 'NormalPagingEcho'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
