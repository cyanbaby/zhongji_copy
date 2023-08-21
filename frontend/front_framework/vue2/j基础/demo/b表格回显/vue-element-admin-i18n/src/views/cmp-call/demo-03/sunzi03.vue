<template>
  <div class="child">
      <div @click="$listeners.todo">$listener 子组件 msg: {{ msg }}</div>
  </div>
</template>
<script>
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