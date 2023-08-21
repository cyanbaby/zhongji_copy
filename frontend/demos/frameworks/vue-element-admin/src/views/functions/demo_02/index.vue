<template>
  <div>
    {{ dateTimeRange }}
    <el-date-picker
      v-model="dateTimeRange"
      type="datetimerange"
      :popper-class="popperClass"
      :picker-options="pickerOptions"
      @change="handleDateTimeRangeChange"
      @focus="handlePickerFocus"
      @blur="handleBlur"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeoutId: null,
      isPickerFocused: false, // 标志是否已经聚焦过
      popperClass: 'only-nonaid-demo',
      dateTimeRange: ['2023-08-09T16:00:00.000Z', '2023-08-15T16:00:00.000Z'], // 默认回显的日期时间范围数据，开始时间和结束时间相同
      initialStartDate: new Date('2023-08-10 00:00:00'), // 初始开始日期时间示例
      pickerOptions: {
        disabledDate: this.disableStartDateSelection,
        disabledDateTime: this.disableStartDateTimeSelection
      }
    }
  },
  methods: {
    handleAvailableClick() {
      this.timeoutId = setTimeout(() => {
        const conf =  document.querySelectorAll('.only-nonaid-demo .el-picker-panel__footer button')[1]
        if(conf) {
          conf.click()
        }
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      })
    },
    handleBlur() {
      // 在失焦时移除事件监听器
      const elements = document.querySelectorAll('.only-nonaid-demo .available')
      elements.forEach((element) => {
        element.removeEventListener('click', this.handleAvailableClick)
      })

      this.isPickerFocused = false
    },

    handlePickerFocus() {
      if (!this.isPickerFocused) {
        this.isPickerFocused = true
        // 在这里执行逻辑
        console.log(1)
        // 其他逻辑
        this.$nextTick(() => {
           document.querySelector('.only-nonaid-demo .start-date').click()
          const elements = document.querySelectorAll('.only-nonaid-demo .available')
          elements.forEach((element) => {
            element.addEventListener('click', this.handleAvailableClick)
          })
        })
      }
    },
    disableStartDateSelection(date) {
      // 在这个方法中，禁止选择初始日期之前的日期
      return date < this.initialStartDate
    },
    disableStartDateTimeSelection(time) {
      // 在这个方法中，禁止选择初始开始时间之前的时间
      return (
        this.dateTimeRange[0].getTime() === this.initialStartDate.getTime() &&
        time < this.initialStartDate
      )
    },
    handleDateTimeRangeChange() {
      // 处理日期时间范围变更事件
      // 这里可以更新 dateTimeRange[1]（结束时间）或执行其他操作
      this.dateTimeRange[0] = this.initialStartDate
    }
  },
  mounted() {
    // 更新结束时间为默认回显的开始时间
    this.dateTimeRange[1] = this.dateTimeRange[0]
  }
}
</script>

<style>
</style>
