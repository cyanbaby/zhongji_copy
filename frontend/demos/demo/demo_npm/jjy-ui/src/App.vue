<template>
  <div>
    <my-select
      v-model="selected"
      size="mini"
      @change="handleChange"
      @visible-change="handleVisibleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label + '哈哈哈'"
        :value="item.value"
      ></el-option>
    </my-select>
  </div>
</template>

<script>
import MySelect from './components/TestSelect'

export default {
  components: {
    MySelect
  },
  data() {
    return {
      selected: {
        label: 'label 3',
        value: 'Option 3'
      },
      bak_options: ['Option 1', 'Option 2', 'Option 3'],
      // options: [{
      //   v: 'Option 1',
      //   label: 'label 1'
      // },
      // {
      //   v: 'Option 2',
      //   label: 'label 2'
      // },{
      //   v: 'Option 3',
      //   label: 'label 3'
      // }]
      options: [
        {
          value: 'Option 1',
          label: 'label 1'
        },
        {
          value: 'Option 2',
          label: 'label 2'
        },
        {
          value: 'Option 3',
          label: 'label 3'
        }
      ]
    }
  },
  methods: {
    handleChange(v) {
      console.log(v)
    },
    handleVisibleChange(v) {
      console.log(v)
    }
  }
}
</script>
