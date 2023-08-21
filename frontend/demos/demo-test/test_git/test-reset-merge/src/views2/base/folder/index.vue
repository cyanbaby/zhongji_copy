<!--
 * @Author: 姚文彬
 * @Date: 2021-06-16 18:02:16
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-07-05 10:56:08
 * @FilePath: \o-front-admin\src\views\folder\index.vue
-->
<template>
  <d2-container>
    <template slot="header">
      <el-radio-group v-model="currentType">
        <el-radio-button
          v-for="item in sourceType"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
    </template>

    <Picture v-if="currentType == 'img'" :sourceType="currentType" />
    <Video v-if="currentType == 'media'" :sourceType="currentType" />
  </d2-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Picture from './picture'
import Video from './video'

export default {
  components: { Picture, Video },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  data () {
    return {
      currentType: 'media',
      sourceType: [
        {
          label: '视频',
          value: 'media'
        },
        {
          label: '图片',
          value: 'img'
        }
      ]
    }
  },
  methods: {
    ...mapActions('d2admin/account', ['logout']),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// ::v-deep .d2-container-full__header {
//   border-bottom: none !important;
// }
// ::v-deep .theme-d2 .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full .d2-container-full__header{
//   border-bottom-width: 0px !important;
// }
// ::v-deep .d2-layout-header-aside-group .d2-layout-header-aside-content .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full .d2-container-full__header{
//   padding: 0 10px !important;
// }
.user-center {
  background: #f5f5f9;

  .page-title {
    display: flex;
    align-items: center;
    font-size: 17px;
    color: #909399;
    .icon {
      font-size: 22px;
      margin-right: 10px;
      color: #909399;
    }
  }
  .head-img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .header {
    display: flex;
    height: 100%;
    align-items: center;
    height: 50px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 24%);
    z-index: 15;
    justify-content: space-between;
    background-color: #fff;
  }

  .main {
    height: calc(100vh - 90px);
    overflow-y: scroll;
    padding: 20px;
  }
}
</style>
