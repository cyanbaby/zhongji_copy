<template>
  <el-select v-model="internalValue" v-bind="$attrs" v-on="$listeners">
    <template #prefix>
      <template v-if="hasPrefix">
        <div class="prefix-wrapper">
          <slot name="prefix"></slot>
        </div>
      </template>
    </template>
    <template #empty>
      <template v-if="hasEmpty">
        <div class="empty-wrapper">
          <slot name="empty"></slot>
        </div>
      </template>
    </template>

    <template v-if="options.length">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </template>
    <slot v-else></slot>
  </el-select>
</template>

<script>
import { Select, Option } from 'element-ui'

export default {
  name: 'MySelect',
  components: {
    'el-select': Select,
    'el-option': Option
  },
  inheritAttrs: false,
  props: {
    value: {
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    prefix: String,
    emptyText: String
  },
  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    hasPrefix() {
      return !!this.$slots.prefix
    },
    hasEmpty() {
      return !!this.$slots.empty
    }
  }
}
</script>
