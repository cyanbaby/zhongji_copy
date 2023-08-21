<!--
 * @Author: 姚文彬
 * @Date: 2021-07-05 15:05:15
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-07-08 10:35:08
 * @FilePath: \o-front-admin\src\views\base\components\BaseInfo.vue
-->
<template>
   <el-dialog title="文件详情" :visible.sync="dialog" width="580px" :close-on-click-modal=false>
      <div class="info-content">
        文件名称：
        <em>{{ row.fileName }}</em>
        <br />文件ID：
        <em>{{ row.fileId }}</em>
        <br />存储路径：
        <em>{{ row.filePath }}</em>
        <br />文件类型:
        <em>{{ row.fileType }}</em>
        <br />文件大小:
        <em>{{ row.fileSize }}</em>
        <br />文件上传者：
        <em>{{ row.createrId }}</em>
        <br />所属平台:
        <em>{{ row.platformId }}</em>
        <br />所属组织:
        <em>{{ row.orgId }}</em>
        <br />所属目录：
        <em>{{ row.dirPath }}</em>
      </div>
    </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      row: {},
      dialog: false
    }
  },
  methods: {
    show (row) {
      this.dialog = true
      this.row = row
    }
  }
}
</script>
<style lang="scss" scoped>
.info-content {
  line-height: 28px;
  font-size: 16px;
  font-weight: 600;

  em {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
}
</style>
