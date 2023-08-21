<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>数据 user相关:&nbsp;&nbsp;</dt>
      <dd>
        <p>
          <b>user:&nbsp;&nbsp;</b>
          <span>{{ user }}</span>
        </p>

        <p>
          <b>childUser:&nbsp;&nbsp;</b>
          <span>{{ childUser }}</span>
        </p>

        <p>
          <b>childUser.name:&nbsp;&nbsp;</b>
          <span>{{ childUser.name }}</span>
        </p>
      </dd>
    </dl>

    <!-- <Inner /> -->
  </div>
</template>

<script>
// import Inner from '../inner/inner.vue'

export default {
  // components: {
  //   Inner
  // },

  props: ['user'],

  data() {
    // const testFn1 = (() => {
    //   console.log(JSON.stringify(this.user))
    //   console.log('子组件data() const 自执行方法  => 先')
    //   return ''
    // })()

    return {
      // testFn2: (() => {
      //   console.log('子组件属性 自执行方法 => 后')
      // })(),
      // testFn1: testFn1,
      childUser: this.user
    }
  },
  watch: {
    // user(newV, oldV) {
    //   console.group('子组件watch user(ps: props的user)')
    //   console.log('newV:', JSON.stringify(newV))
    //   console.log('oldV:', JSON.stringify(oldV))
    //   console.log('this.childUser', JSON.stringify(this.childUser))
    //   console.groupEnd()
    // },

    user: {
      handler(newV, oldV) {
        console.group('子组件watch user(ps: props的user)')
        console.log('newV:', JSON.stringify(newV))
        console.log('oldV:', JSON.stringify(oldV))
        console.log('this.childUser', JSON.stringify(this.childUser))
        console.groupEnd()
      },
      deep: true
    }
  }
}
</script>

<style>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>
