<template>
  <div>
    <h3>demo 05</h3>
    <el-transfer v-model="value" :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    const generateData = (_) => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1, 4]
    }
  }
}
</script>
