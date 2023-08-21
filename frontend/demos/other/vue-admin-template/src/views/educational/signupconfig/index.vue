<template>
<d2-container>
    <template slot="header">
      <span class="page-title">配置报名应用</span>
    </template>
    <el-steps
      :active="active"
      simple
      space="150"
      finish-status="success"
    >
      <el-step
        title="基本信息"
      />
      <el-step
        title="归属单位"
      />
      <el-step
        title="报名表"
      />
    </el-steps>
    <component
      :is="`step${active + 1}`"
      @next="val => (active = val)"
    ></component>
</d2-container>
</template>
<script>
import step1 from './components/step1'
import step2 from './components/step2'
import step3 from './components/step3'
export default {
  components: { step1, step2, step3 },
  data () {
    return {
      active: 0
    }
  },
  created () {

  },
  methods: {
  }
}
</script>
