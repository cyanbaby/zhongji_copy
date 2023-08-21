<template>
  <div>
    <div v-if="jsonUrl">
      <div style="margin: 0 0 10px 0;font-weight:bold;">{{busiObjName}}</div>
      <json-box
          ref="jsonBox1"
          :json-url="jsonUrl"
          :data="formData"
        >
      </json-box>
      <json-more-box v-if="formList.length" :jsonList="jsonList" :isList="isList" :formList="formList" :structureList="structureList"></json-more-box>
    </div>
  </div>
</template>

<script>
import JsonBox from '@/components/json-box'
import JsonMoreBox from './json-more-box'
export default {
  name: 'JsonMainBox',
  data () {
    return {
      jsonUrl: '',
      jsonList: [],
      formData: {},
      formList: [],
      isList: [],
      busiObjName: '',
      structureList: []
    }
  },
  watch: {
    $route () {
      if (this.$route.query.recordId) {
        this.recordId = this.$route.query.recordId
      }
      this.loadStructure('50341201170')
    }
  },
  components: {
    JsonBox,
    JsonMoreBox
  },
  mounted () {
    this.loadStructure('50341201170')
  },
  methods: {
    loadStructure (functionId) {
      const _this = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return this.$api.BUSI_OBJ_LOAD({
        functionId,
        recordId: this.$route.query.recordId,
        userId: this.$route.query.userId
      }).then((res) => {
        if (res.code == 1) {
          _this.formList = []
          res.data.returnData.default.photoUrl = [res.data.returnData.default.photoUrl]
          this.busiObjName = res.data.structure.default.busiObjName
          if (
            res.data.structure &&
          res.data.structure.default &&
          res.data.structure.default.attrs
          ) {
            res.data.structure.default.attrs.forEach((a) => {
              if (a.frontControll == 'dict') {
                res.data.returnData.default[a.fieldCode] = res.data.returnData.default[a.fieldCode + 'Label']
              }
            })
            _this.formData = res.data.returnData.default
          }
          // _this.$refs.jsonBox1.setData(res.data.returnData.default.photoUrl);
          _this.jsonUrl = res.data.jsons[0]
          for (let i = 0; i < res.data.functions.length; i++) {
            const element = res.data.functions[i]
            _this.isList.push(element.functionCode.indexOf('.list.') >= 0)
            _this.loadStructure1(element.functionId)
          }
          loading.close()
        }
      }).catch(e => {
        loading.close()
      })
    },
    loadStructure1 (functionId) {
      const _this = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return this.$api.BUSI_OBJ_LOAD({
        functionId,
        recordId: this.$route.query.recordId,
        userId: this.$route.query.userId
      }).then((res) => {
        if (res.code == 1) {
          if (res.data.returnData.default.length) {
            _this.formList.splice(_this.formList.length, 1, res.data.returnData.default)
            _this.jsonList.splice(_this.jsonList.length, 1, res.data.jsons[0])
            _this.structureList.push(res.data.structure)
          }
          _this.$forceUpdate()
          loading.close()
        }
      }).catch(e => {
        loading.close()
      })
    }
  }
}
</script>

<style>

</style>
