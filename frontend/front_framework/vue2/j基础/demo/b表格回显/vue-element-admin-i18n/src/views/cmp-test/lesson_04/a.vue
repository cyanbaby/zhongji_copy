<template>
  <div class="a">

    <dl>
      <dt>a组件 数据</dt>
      <dd>
        <dl>
          <dt>aUser</dt>
          <dd>{{ aUser }}</dd>
        </dl>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeAuser">changeAuser</button>&nbsp;&nbsp;

      </dd>
    </dl>
  </div>
</template>

<script>

export default {
  data() {
    return {
      aUser: {
        name: '李四',
        age: 28
      }
    }
  },
  methods: {
    changeAuser() {
      let age = this.aUser.age
      let name = '李四__' + ++age
      this.aUser = {
        age,
        name
      }
    }
  }
}
</script>

<style>
.a {
  background-color: rgb(245, 245, 245);

}
</style>
