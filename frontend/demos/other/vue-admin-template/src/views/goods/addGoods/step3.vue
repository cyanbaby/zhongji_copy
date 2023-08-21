<template>
  <div>
    <el-card v-loading="mask">
        <span>请完善课程规格</span>
        <vxe-button style="margin-left:10px" @click="insertEvent(-1)">新增规格</vxe-button>
        <vxe-table
        style="margin-top: 20px;"
        border
        show-overflow
        keep-source
        ref="xTable"
        auto-resize
        :edit-rules="specsValid"
        :data="specsTable"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
        <vxe-table-column field="normName" title="规格名"
        :edit-render="{name: 'input',placeholder: '请输入课程规格名'}"
        >
        <template #edit="{ row }">
            <el-input v-model="row.normName" class="myinput" :disabled="row.flag" />
        </template>
        </vxe-table-column>
        <vxe-table-column field="normImgUrl" title="规格图">
            <template #default="{ row }">
            <el-image
            class="normImg"
            :src="row.normImgUrl"
            @click="upload(row)"
            >
            <img
                slot="error"
                class="normImg"
                src="@/assets/images/default.png"
                @click="upload(row)"
            />
            </el-image>
            </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="200" show-overflow>
        <template #default="{ row }">
            <vxe-button type="text"  @click="moveTableRowUp(row)" :disabled="rowIsNotFirst(row)">上移</vxe-button>
            <vxe-button type="text" @click="removeEvent(row)">删除</vxe-button>
        </template>
        </vxe-table-column>
        </vxe-table>
        <el-button type="primary" @click="thirdBtn" class="nextBtn">{{distinguish}}</el-button>
    </el-card>
    <el-dialog title="上传图片" :visible.sync="imgUploadDialog" width="800px" :close-on-click-modal=false>
            <resource-uploader-v2
            ref="pictureResourceUploader"
            resource-name="图片"
            upload-code="Upload-file-img"
            resource-suffix=".jpg,.png,.ico"
            :show-upload-button="true"
            :show-select-dir="true"
            :select-dir-by-suffix="true"
            :show-label="true"
            :file-type="fileType"
            :resourceBindId="currentResourceBindId"
            @uploadComplete="uploadComplete"
            />
    </el-dialog>
  </div>
</template>
<script>
import { moveUpById, findItemInArrayByProperty } from '@/utils/array-utils'
export default {
  props: {
    goodsId: {
      type: String,
      default: ''
    },
    catIds: [],
    distinguish: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgUploadDialog: false,
      menu: [],
      currentResourceBindId: '',
      specsTable: [],
      record: {
        normId: '',
        id: String(new Date().getTime()),
        normName: '',
        normImgUrl: '',
        flag: false
      },
      specsValid: {
        normName: [
          { required: true, message: '请输入规格名' }
        ]
      },
      fileType: 'img',
      mask: false
    }
  },
  created () {
    this.queryNormByCatId()
    this.queryNorm()
  },
  methods: {
    async insertEvent (row) {
      const $table = this.$refs.xTable
      const time = new Date().getTime()
      const record = {
        id: String(time),
        normId: '',
        normName: '',
        normImgUrl: '',
        flag: false
      }
      await $table.insertAt(this.record, row)
      this.record = record
    },
    moveTableRowUp (row) {
      const table = this.$refs.xTable
      console.log('before：', this.$refs.xTable.getTableData().visibleData)
      const arr = this.$refs.xTable.getTableData().visibleData
      moveUpById(arr, row.id)
      table.remove(table.getInsertRecords())
      table.insert(arr)
      console.log('after: ', this.$refs.xTable.getTableData().visibleData)
    },
    rowIsNotFirst (row) {
      const index = this.$refs.xTable.getVTRowIndex(row)
      return index === 0
    },
    removeEvent (row) {
      this.$confirm('您确定要删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const $table = this.$refs.xTable
        $table.remove(row)
      })
    },
    upload (row) {
      if (!row.flag) {
        this.currentResourceBindId = row.id
        this.imgUploadDialog = true
        this.$nextTick(params => {
          this.$refs.pictureResourceUploader.clearFiles()
        })
      }
    },
    uploadComplete (params) {
      this.imgUploadDialog = false
      console.log('文件上传完成：{}', params)
      const arr = this.$refs.xTable.getTableData().visibleData
      const item = findItemInArrayByProperty(arr, params.resourceBindId)
      item.normImgUrl = params.url
    },
    // 课程规格
    async thirdBtn () {
      const $table = this.$refs.xTable
      if ($table.getTableData().visibleData.length == 0) {
        this.$message({
          message: '请添加课程规格',
          type: 'warning'
        })
      } else {
        const errMap = await $table.validate().catch(errMap => errMap)
        if (errMap) {
          console.log('校验不通过')
        } else {
          const $table = this.$refs.xTable
          const insertRecords = $table.getTableData().visibleData
          this.mask = true
          this.$api.ADD_GOODSNORM({
            goodsId: this.goodsId,
            goodsNorms: insertRecords
          }).then(res => {
            if (this.$route.query.goodsId) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.$emit('activeNameChange', '6')
            } else {
              this.$emit('activeNameChange', '6')
            }
            this.mask = false
          }).catch(() => {
            this.mask = false
          })
        }
      }
    },
    // 查询课程规格信息
    queryNorm () {
      if (this.$route.query.goodsId) {
        this.goodsId = this.$route.query.goodsId
        this.mask = true
        this.$api.GET_NORM_LIST({
          goodsId: this.goodsId
        }).then(res => {
          res.data.forEach(item => {
            this.record.normId = item.normId
            this.record.id = item.normId
            this.record.flag = false
            this.record.normName = item.normName
            this.record.normImgUrl = item.normImgUrl
            this.insertEvent(-1)
          })
          this.mask = false
        }).catch(() => {
          this.mask = false
        })
      }
    },
    queryNormByCatId () {
      if (!this.$route.query.goodsId) {
        this.$api.GET_NORM_BYCATID({
          catIds: this.catIds
        }).then(res => {
          res.data.forEach((item, index) => {
            this.record.id = index + 1
            this.record.flag = true
            this.record.normName = item.normName
            this.record.normImgUrl = item.normImgUrl
            this.insertEvent(-1)
          })
        })
      }
    }
  }
}
</script>
<style scoped>
.normImg{
    width: 50px;
    height: 25px;
    object-fit: cover;
}
</style>
