<template>
  <div class="middle">
    <h3> Child 子组件</h3>
    <dl>
      <dt>数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>childUser:&nbsp;&nbsp;</b>
          <span>{{ JSON.stringify(childUser, null, 4) }}</span>
        </p>
      </dd>
    </dl>
    <Inner />
  </div>
</template>

<script lang="ts" setup>
import Inner from '../inner/inner.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    refUser?: any
  }>(),
  {
    refUser: () => {
      return {}
    }
  }
)

const childUser = computed(() => {
  return props.refUser
})

</script>

<style scoped>
.middle {
  background-color: #ecad9e;
  padding: 20px;
}
</style>