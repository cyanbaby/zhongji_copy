<template>
  <div class="hello">
    <h1>一个很乱的首页</h1>
    <h3>表格相关</h3>
    <ul>
      <li>
        <a href="/test-demo/element-ui/demo-05" target="_blank" rel="noopener"
          >普通分页回显</a
        >
      </li>
    </ul>
    <h3>composition api 相关</h3>
    <ul>
      <li>
        <a href="/vue2-demo/composition-api/demo-01" target="_blank" rel="noopener"
          >基础 API</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      input: '111'
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  padding: 20px;
}
</style>
