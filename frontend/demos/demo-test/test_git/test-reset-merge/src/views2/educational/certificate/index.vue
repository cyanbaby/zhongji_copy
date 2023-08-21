<template>
<d2-container>
    <template slot="header">
      <span class="page-title">配置证书</span>
    </template>
    <el-button type="primary" size="medium" style="margin-bottom: 10px;" @click="associateCert" :disabled="disabled">关联证书</el-button>
    <el-table
    :data="selectedTable"
    border
    style="width: 100%;">
     <el-table-column
      prop="certId"
      label="证书id"
      v-if="false"
    >
    </el-table-column>
    <el-table-column
      prop="certName"
      label="证书名称"
    >
    </el-table-column>
    <!-- <el-table-column
      prop="cIdentifier"
      label="证书编号"
    >
    </el-table-column> -->
    <el-table-column
      prop="orgName"
      label="发证主体">
    </el-table-column>
    <el-table-column
      prop="gmtCreate"
      label="创建时间"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      width="100px"
    >
      <template slot-scope="scope">
        <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" size="medium" style="margin-top: 20px;margin-left: 45%;" @click="saveCert" :loading="saveloading">保存</el-button>
  <el-dialog
    title="关联证书"
    :visible.sync="dialogVisible"
    :close-on-click-modal=false
    width="50%"
   >
    <cert-chose
    ref="choseCertRef"
    @closeDialog="closeDialog"
    @tableDate="tableDate"
    ></cert-chose>
    </el-dialog>
</d2-container>
</template>
<script>
import CertChose from './chosecert/cert-chose.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    CertChose
  },
  data () {
    return {
      selectedTable: [],
      dialogVisible: false,
      disabled: true,
      saveloading: false
    }
  },
  watch: {
    selectedTable: {
      handler (val) {
        if (val.length == 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },
      immediate: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('d2admin/page', ['close']),
    // 回显
    init () {
      this.$api.GET_CERT({
        sourceId: this.$route.query.classId,
        sourceType: 1
      }).then(res => {
        if (res.certId) {
          this.selectedTable.push(res)
        } else {
          console.log('无证书')
        }
      })
    },
    // 关联证书弹窗
    associateCert () {
      this.dialogVisible = true
    },
    closeDialog (val) {
      this.dialogVisible = val
    },
    tableDate (val) {
      if (val) {
        this.selectedTable = []
        this.selectedTable.push(val)
      }
    },
    deleteClick (row) {
      this.selectedTable = []
    },
    saveCert () {
      if (this.selectedTable.length === 0) {
        this.$message.warning('请选择证书！')
      } else {
        this.saveloading = true
        this.$api.SAVE_CERT({
          certId: this.selectedTable[0].certId,
          sourceType: 1, // 来源类型,1、班级，2、课程
          sourceId: this.$route.query.classId
        }).then(res => {
          this.$notify({
            title: '提示',
            message: '关联证书配置成功!',
            type: 'success'
          })
          const tagName = this.$route.fullPath
          this.close({ tagName }).then(item => { this.$router.push({ path: '/educational/class' }) })
        }).catch(e => {
          this.saveloading = false
        })
      }
    }
  }
}
</script>
