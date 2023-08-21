 <template>
  <div class="child">
    <div>子组件 msg: {{ msg }}</div>
    <div>子组件 name: {{ name }}</div>

    <el-input
      v-model="child_value"
      @input="inputHandle"
      style="width: 220px"
    ></el-input>

    <el-input
      v-model="child_name"
      @input="inputHandleName"
      style="width: 220px"
    ></el-input>

    <div class="share-btn" @click="confirm">确定</div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      child_value: this.msg,
      child_name: this.name,
    };
  },
  props: {
    msg: {
      type: String,
      default: "子组件 msg默认值",
    },
    name: {
      type: String,
      default: "子组件 name默认值",
    },
  },
  methods: {
    inputHandle(val) {
      this.$emit("update:msg", val);
    },
    inputHandleName(val) {
      this.$emit("update:name", val);
    },
    confirm() {
      // 双向数据流
      this.$emit("update:msg", "helow world");
    },
  },
};
</script>

<style scoped>
.child {
  background-color: #beedc7;
  height: 400px;
  width: 60%;
  padding: 100px;
}
</style>