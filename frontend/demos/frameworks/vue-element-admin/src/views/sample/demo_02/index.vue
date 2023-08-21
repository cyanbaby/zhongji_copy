<template>
  <div class="demo-container yey">
    <h3>爷爷组件</h3>
    <dl>
      <dt>爷爷组件的数据</dt>
      <dd>name: aaa</dd>
      <dd>age: 28</dd>
    </dl>
    <div class="bab">
      <h3>爸爸组件</h3>
      <dl>
        <dt>爸爸组件的数据</dt>
        <dd>name: bbb</dd>
        <dd>age: 18</dd>
      </dl>
      <div class="sunz">
        <h3>孙子组件</h3>
        <dl>
          <dt>孙子组件的数据</dt>
          <dd>name: ccc</dd>
          <dd>age: 8</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Base2'
}
</script>

<style></style>
