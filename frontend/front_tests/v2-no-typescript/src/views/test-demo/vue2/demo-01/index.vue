<template>
  <div class="view-box">
    <div style="width: 100%; display: inline-block; margin-top: 50px">
      <el-statistic
        @finish="hilarity"
        :value="deadline3"
        time-indices
        title="隐藏父组件 name1 插销，倒计时"
      >
        <template v-if="!show" slot="suffix">
          <el-button type="primary " size="small" @click="add"
            >添加三秒倒计时，并显示</el-button
          >
        </template>
      </el-statistic>
    </div>
    <CmpTest01>
      <template v-if="isShowSlot" slot="name1">
        <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 6px;margin: 6px;">父组件 name1 插销</div>
      </template>
    </CmpTest01>
    <div v-if="!show">
      <el-result icon="success"  subTitle="v-if 和 slot 指令可以一起使用 :  )">
      </el-result>
    </div>
  </div>
</template>
<script>
import CmpTest01 from './components/cmp01.vue'

export default {
  name: 'TestVue2Demo01View',
  components: {
    CmpTest01
  },
  data() {
    return {
      show: true,
      // deadline3: Date.now() + 1000 * 60 * 30
      deadline3: Date.now() + 1000 * 3
    }
  },
  computed: {
    isShowSlot() {
      return this.show
    }
  },
  methods: {
    hilarity() {
      this.$notify({
        title: '提示',
        message: '时间到，已经隐藏父组件 name1 插销 ',
        duration: 1000
      })
      this.show = false
    },
    clickFn() {
      this.$refs.statistic.suspend(this.stop)
      this.stop = !this.stop
    },
    add() {
      this.deadline3 = this.deadline3 + 1000 * 4
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.view-box {
  .cmp-box {
    margin: 20px auto;
  }
}
</style>
