<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default Vue.extend({
  name: 'HomeView',
  components: {
    HelloWorld
  },
  created() {
    // const name: string = 'js语言' // => Type string trivially inferred from a string literal, remove type annotation.eslint@typescript-eslint/no-inferrable-types
    const name = 'js语言'
    console.log(name)

    function test(x: number, y: number) {
      return x + y
    }

    // console.log(test('你好', '世界')) // => Argument of type 'string' is not assignable to parameter of type 'number'.Vetur(2345)
  }
})
</script>
