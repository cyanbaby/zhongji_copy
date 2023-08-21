<template>
  <div>
    <dl>
      <dt>cmp.vue 数据:&nbsp;&nbsp;</dt>
      <dd>

        <p>
          <b>cssData:&nbsp;&nbsp;</b>
          <pre>{{ progressBarConfig }}</pre>
        </p>

      </dd>
    </dl>
  </div>
</template>  

<script lang="ts" setup>
const props = defineProps({
  progressBarConfig: Object
})

</script>

