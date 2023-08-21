<template>
  <div>
    <h2>Watch监听数据前后变化</h2>
    <input type="text" v-model="keyword">
    <br>
    {{ keyword }}
  </div>
</template>

<script>
import {
  ref,
  watch,
  onMounted,
  onUpdated
} from "vue";
export default {
  props: ['msg'],
  setup(props) {

    console.log(props);
    console.log("setup")

    let keyword = ref("")

    watch(keyword, (newData, oldData) => {
      console.log(newData, oldData)
    })

    // 没有 beforeCreate 和 created 其他都有
    onMounted(() => {
      console.log("onMounted")
    })

    onUpdated(() => {
      console.log("onUpdated")
    })

    return {
      keyword
    }

  },
  beforeCreate() {
    console.log("beforeCreate 选项生命周期")
  }
}
</script>
