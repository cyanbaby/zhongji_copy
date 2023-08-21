<template>
  <conditional-renderer :condition="isLoading">
    <div class="el-select el-select--default">
      <div class="el-input el-input--default is-disabled el-input--suffix">
        <input
          type="text"
          disabled="disabled"
          readonly="readonly"
          autocomplete="off"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-loading"></i>
        </span>
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
          </span>
        </span>
      </div>
    </div>
    <el-select v-model="internalValue" @change="handleChange" v-bind="$attrs">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </conditional-renderer>
</template>

<script>
import ConditionalRenderer from './ConditionalRenderer'

export default {
  name: 'JlSelect',
  components: { ConditionalRenderer },
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: [String, Number, Object],
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      internalValue: this.value
    }
  },
  watch: {
    value(newVal) {
      this.internalValue = newVal
    },
    internalValue(newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>