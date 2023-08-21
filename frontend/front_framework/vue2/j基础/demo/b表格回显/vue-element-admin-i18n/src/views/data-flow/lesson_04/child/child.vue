<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>props:&nbsp;&nbsp;</dt>
      <dd>
        <p>
          <b>parentMsg:&nbsp;&nbsp;</b>
          <span>{{ parentMsg }}</span>
        </p>
      </dd>
    </dl>
    <dl>
      <dt>组件自身:&nbsp;&nbsp;</dt>
      <dd>
        <p>
          <b>childMsg:&nbsp;&nbsp;</b>
          <span>{{ childMsg }}</span>
        </p>
      </dd>
    </dl>

    <dl>
      <dt>操作:&nbsp;&nbsp;</dt>
      <dd>
        <button @click="changeChildMsg">btn1 修改 changeChildMsg</button>&nbsp;&nbsp;
      </dd>
    </dl>
    <!-- <Inner /> -->
  </div>
</template>

<script>
// import Inner from '../inner/inner.vue'

let num = 100

export default {
  // components: {
  //   Inner
  // },

  props: ['parentMsg'],

  data() {

    return {
      childMsg: this.parentMsg
    }
  },
  watch: {
    parentMsg(newV, oldV) {
      console.group('子组件watch parentMsg(ps: props parentMsg)')
      console.log('newV:', newV)
      console.log('oldV:', oldV)
      console.log('this.childMsg', JSON.stringify(this.childMsg))
      console.groupEnd()
    }
  },
  methods: {
    changeChildMsg() {
      this.childMsg = '子组件消息__' + ++num
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
