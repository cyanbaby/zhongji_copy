<template>
  <div class="hello">
    {{ test() }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    test() {
      
    }
  },
  props: {
    msg: String
  },
}
</script>