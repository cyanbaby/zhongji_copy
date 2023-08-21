<template>
  <div class="child">
      <div>子组件 msg: {{ msg }}</div>
      <!-- 
        <el-input v-model="input_value" 
        @input="inputHandle" 
        style="width: 220px;margin-top: 15px;"></el-input>
        
        <el-button type="button" class="share-btn" @click="confirm">确定</el-button> 
      -->
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      input_value: '',
    };
  },
  props: ['msg'],
  created() {},
  methods: {
  },
};
</script>


<style scoped>
.child {
  background-color: #beedc7;
  height: 400px;
  width: 60%;
  overflow: hidden;
  margin: 70px;
}
.share-btn {
  margin-left: 15px;
}
</style>