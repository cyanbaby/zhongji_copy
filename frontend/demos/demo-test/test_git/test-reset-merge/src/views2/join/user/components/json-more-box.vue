<template>
  <div>
    <div
      style="margin-top:10px"
      v-for="(json, i) in jsonList"
      :key="i">
      <div v-if="formList[i] && formList[i].length">
        <div style="margin: 30px 0 10px 0;font-weight:bold;">{{structureList[i].default.busiObjName}}</div>
        <json-box
          v-if="!isList[i]"
            ref="jsonBox2"
            :json-url="json"
            :data="formList[i]"
          >
        </json-box>
        <div v-if="isList[i]">
          <list-box :tableData="formList[i]" :structure="structureList[i]"></list-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JsonBox from '@/components/json-box'
import ListBox from './list-box.vue'
export default {
  name: 'JsonMoreBox',
  components: {
    JsonBox,
    ListBox
  },
  props: {
    jsonList: {
      type: Array,
      default: () => []
    },
    formList: {
      type: Array,
      default: () => []
    },
    isList: {
      type: Array,
      default: () => []
    },
    structureList: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.$forceUpdate()
  }
}
</script>

<style>

</style>
