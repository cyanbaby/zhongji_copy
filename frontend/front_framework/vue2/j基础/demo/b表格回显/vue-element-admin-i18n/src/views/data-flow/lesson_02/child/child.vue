<template>
  <div class="middle">
    <h3> Child 子组件</h3>

    <div style="display: flex;">

      <div style="flex: 8">
        <dl>
          <dt>user:&nbsp;&nbsp;</dt>
          <dd>
            <p>
              <b>user:&nbsp;&nbsp;</b>
              <span>{{ user }}</span>
            </p>
          </dd>
        </dl>

        <dl>
          <dt>childUser:&nbsp;&nbsp;</dt>
          <dd>
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

        <dl>
          <dt>操作:&nbsp;&nbsp;</dt>
          <dd>
            <button @click="changeUserOb">btn1 替换 user</button>&nbsp;&nbsp;
            <button @click="changeUserProps">btn2 修改 user.name</button>&nbsp;&nbsp;
            <br>
            <br>
            <button @click="changeChinldUserOb">btn3 替换 chinldUser</button>&nbsp;&nbsp;
            <button @click="changeChinldUserProps">btn4 修改 chinldUser.name</button>&nbsp;&nbsp;
          </dd>
        </dl>
      </div>

      <div style="flex: 12">
        <dl>
          <dt>现象:&nbsp;&nbsp;</dt>
          <dd>
            <dl>
              <dt>点击 btn1: 直接报错</dt>
            </dl>

            <dl>
              <dt>点击 btn2:</dt>
              <dd style="margin-bottom: 8px;">父子组件 user & childUser 数据和视图 都会更新</dd>
              <dd>但是点击 父组件 btn1 | 子组件 btn3 切断联系后</dd>
              <dd>只更新 子组件 user & 父组件 user 数据和视图</dd>
            </dl>

            <dl>
              <dt>点击 btn3:</dt>
              <dd style="margin-bottom: 8px;">只更新 子组件 childUser 数据和视图</dd>
              <dd>但是能切断 childUser 和 user的关联</dd>
              <dd>btn2 & btn4 只能更新user数据和视图</dd>
            </dl>

            <dl>
              <dt>点击 btn4:</dt>
              <dd style="margin-bottom: 8px;">父子组件 user & childUser 数据和视图 都会更新</dd>
              <dd>但是点击 父组件 btn1 | 子组件 btn3 切断联系后</dd>
              <dd>只更新 子组件 childUser 数据和视图</dd>
            </dl>
          </dd>

        </dl>
      </div>
    </div>

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
  },
  methods: {
    changeUserOb() {
      // this.user = {
      //   name: '李四',
      //   age: 28
      // }
      console.log('直接报错')
    },
    changeUserProps() {
      this.user.age += 1
      this.user.name = '张三' + this.user.age
    },
    changeChinldUserOb() {
      const age = this.childUser.age + 1
      const name = '张三' + age
      this.childUser = {
        name: name,
        age: age
      }
    },
    changeChinldUserProps() {
      this.childUser.age += 1
      this.childUser.name = '张三' + this.childUser.age
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
