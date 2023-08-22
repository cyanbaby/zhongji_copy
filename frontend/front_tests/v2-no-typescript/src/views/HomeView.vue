<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import { watch } from 'vue'

// console.log('ref', watch)

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
