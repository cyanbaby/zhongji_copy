<template>
  <div></div>
</template>

<script>
import { getUserList, getPermission } from '@/api'

export default {
  name: 'TestAxiosDemo01View',
  created() {
    getUserList()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

    getPermission()
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}
</script>

<style></style>
