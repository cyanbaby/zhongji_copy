<template>
  <div style="margin: 20px">
    <div id="qrinvitecode" ref="qrA" class="item-pic" />


    <br>
    <!-- <el-link type="primary" @click="handleClick">下载</el-link> -->
    <!-- <a :href="url" download target="_blank" @click="handleClick">下载</a> -->
    <a :href="url" download target="_blank">下载</a>

    <el-button @click="createOb">重复创建</el-button>

  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data() {
    return {
      url1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAABMRJREFUeF7tXNl2o1AMS/7/o9OTtKSO0WbSmS658zSHABdkWZYN9Hw6nS6n8N/l8r7r+Xx+OOK6Pd22Hdj3v25n56+L1X22/9fft/P239B66ravd3hBC/SDrifuF64urN4oOte2za2tbkhdTweoXr8E5CPoC5iG0gboAzCO3hN6ovSqLGGUr6nKUpSlo2IfYjxL0ds11FRawHzq5yFgHIA9hydaoPQIRbgzjOnHf2GMErYK2tEqllQnVMW+PZVeDhhXxiblugqnK+ustE/pz1JtSzdnDWpa/rNy/SeACY0vNXjM/KGU29iRpCMCtx6XngO5dXfP58j2krOo6oQOQd4FiXVq8ZFIJ+niQLkBuYDBMEFgUF+heo2UOc7tKgaoYxOGsXRi1mABQyYG1PlOcpUxZtIZq77FOd702NqrWQaxXmkBUwZVFYxEN5xmJBHq+/Tep19HYhaVYUStBNr/lkroBtIL6CdNwGL+ZDKR6wAm7haBzIBfwIAxrfQxR11lLX+st0rFetotq8EW6/pH5drRlFn9nr+/GhhUlZAIp/nvLP6mZ88aNlccFOORIdzp7LUlUKJ0tB9RADlnrRpF1+cwwA+l0gJm/6xs5HwTJ5v0LZUxih0syswfKQmYpvgCpuXmBqD1MSpqSTfM+hylFYqZzikrcU8F/1aVnfN9WWBqVVKPLdQMF2kGYoR7LNItAdOizgrEor6+05jO0ts8JnG56kaRIWTbkp5GCTgS6yS9piAvYD5Q3TEGvR/Dyp4yT66v6SKctBWOOcmaR138g/g6Sr4UMPUpgTNUrMS6+Qpy1qisuv6n6hbTvKTUVwKwa4PlWgmn61VYxUiPu+6X+CM1YmAAom6fAbmAaYOqe2BdKlUGsPkKYtg0LVMGuLl0Z6YTaDozWsA8vol6B4oNqlAFYiWWRVv1JlOhda5c9UhOc5D+UY1RIuqsfRVQuGh5NValKhJilUpu7KCmkN2qLGDYU4L0BWjlIdJUUo1c7WUYy5x7VkXAea2+ZvxG1UsCs8uvQq9UTyaOUznoXeQ+rmViFVAQUztw1zw2qFJgIa/wJ4FJrLJTdHUOdyyrYkp3pvMVVyl7FT5UlZLUY3Tu250/UQ2o8y5H/ItMpZoqKkVUs/frgWFPIplAopKYil1nWj/XNAjqfEoHk37rYbSJFlKewrlQdqPMof4oYFyvpJiTzE2Q6DFR/QpgEqYnTHt4a1M5U6U7rLVPJnf1IqeNaxdfFoSk6u0a5HTs8HLApL2SGzx11jifgaKdaJwaV6A1nRTIma+acim6pk3hs3MZZx+q1iUtDErfHpRD3xK4qKmcZr8xG8CY5Tp6xb4aKDoMP/KRxUsAc+RL/R7FdNaBIqWmbsw4ovW3felw23xQv6tKE/GdaJFq81NbgLQlHV8muoYCegd9AfP+dyp2VfWZD9IrpVW5VqmHyqli5rQSunLNxP3QB+l9MWTx2bYtOon9Rzf1o4GZWP16c+nsJfElSYfcgZ2MR59ijHPD7MJYtVE2gFUixF4UDGYSkQTcru8ZjXkZYJRQsVFBjz5KAyZwCdWnaZu0BCpV7799RblmzGE0ZQFAGvCtwCimqHxNTFT1CK6VmEZblXoEaLrtrjELmE8EtuC8Ac0TECKwDRX6AAAAAElFTkSuQmCC',
      url: ''
    }
  },
  mounted() {
    // this.loadCourseList()
    // this.getQRInviteCode() // 调用二维码的方法
    this.createQRCode()
  },
  methods: {
    createQRCode() {
      // 生成二维码
      const qrObj = new QRCode('qrinvitecode', {
        width: 70, // 宽度
        height: 70, // 高度
        text: 'https://org1.universitycloud.cn/d/#/live/list',
        render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      })

      console.log(qrObj)

    },
    handleClick(e) {
      return false
      e.preventDefault()
    },
    createOb() {

      // removeChild()
    }
  }
}
</script>
