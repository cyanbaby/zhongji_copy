<template>
  <div>
    <div class="boxs">
      <div class="boxs_title">{{title}}</div>
    </div>
    <div class="forms">
      <table>
        <tr>
          <th v-for="(item,index) in formKey"
              :key="index">{{item}}</th>
        </tr>
        <tr v-for="(item,index) in formData"
            :key="index">
          <td v-for="(items, index) in formValue"
              :key="index">{{item[items]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ 

export default {
  props: {
    form: {
      type: Array,
      default: []
    },
    formData: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      formKey: ['课程名称', '首次学习时间'],
      formValue: ['goodsValue', 'planId']
    }
  },
  created () {
    this.form.forEach(item => {
      debugger
      this.formKey.push(item.label)
      this.formValue.push(item.prop)
    })
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border: solid 1px #ebeef5;
}
th {
	background: #f7f7f7;
}
th,td {
	padding: 15px 25px;
  border: solid 1px #ebeef5;
  margin: 0;
  text-align: center;
}

.boxs {
	margin-bottom: 20px;
	.boxs_title {
		height: 25px;
		border-left: solid 3px #409eff;
		line-height: 25px;
		font-weight: bold;
		padding-left: 15px;
	}
}
</style>
