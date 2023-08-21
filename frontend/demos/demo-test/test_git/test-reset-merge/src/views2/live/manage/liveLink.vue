<template>
  <div class="page-live-url">

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    console.log(this.$route.name)
    // localStorage.setItem("redirectLiveUrl",this.$route.name)
    if (this.$route.name == 'liveLink') {
      this.$router.push({
        path: '/login',
        query: {
          liveLink: '1',
          liveChannelId: this.$route.query.liveChannelId
        }
      })
    }
  },
  mounted () {

  },
  beforeDestroy () {

  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
