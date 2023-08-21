<!--
 * @Author: your name
 * @Date: 2021-04-08 11:36:24
 * @LastEditTime: 2021-06-07 13:42:34
 * @LastEditors: 姚文彬
 * @Description: 个人中心
 * @FilePath: \组织\src\views\user-center\index.vue
-->
<template>
  <el-container class="user-center">
    <el-header
      class="header"
      height="50"
    >
      <!-- <div class="page-title">
        <i class="el-icon-s-grid icon" /> 单位中心
      </div> -->
      <div>
        <el-dropdown
        >
          <img
            :src="info.headUrl"
            class="head-img"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,i) in menuList"
              :key="i"
              @click.native="changeView(item.pageUrl,item.functionId)"
            >
              {{ item.functionName }}
            </el-dropdown-item>
            <el-dropdown-item @click.native="logOff" divided>
              <d2-icon
                name="power-off"
                class="d2-mr-5"
              />安全退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <el-aside
        width="200px"
        class="aside"
      >
        <ul class="manageItems">
          <li
            v-for="(item, index) in menus"
            :key="index"
          >
            <template v-if="item.children.length > 0">
              <h2 class="title">
                {{ item.functionName }}
              </h2>
              <div
                v-for="(c, i) in item.children"
                :key="i"
                @click="changeView(c.pageUrl, c.functionId)"
              >
                <div
                  class="item"
                  :class="{ activeItem: c.pageUrl === activeIndex }"
                >
                  <i
                    :class="c.iconUrl"
                    class="iconName"
                  />
                  <div class="subName"></div>
                  {{ c.functionName }}
                </div>
              </div>
            </template>
            <template v-else>
              <div
                class="item"
                :class="{ activeItem: item.pageUrl === activeIndex }"
                @click="changeView(item.pageUrl, item.functionId)"
              >
                <i
                  :class="item.iconUrl"
                  class="iconName"
                />
                <div class="subName"></div>
                {{ item.functionName }}
              </div>
            </template>
          </li>
        </ul>
      </el-aside>

      <!-- 视图切换，动态组件 -->
      <el-main>
        <div class="main">
          <component :is="componentName" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Home from './home'
import Reset from './reset'
import Phone from './phone'
import Base from './base'
import Org from './org'
import util from '@/libs/util.js'
import { mapState, mapActions } from 'vuex'
import merge from 'webpack-merge'

export default {
  components: {
    Home,
    Reset,
    Phone,
    Base,
    Org
  },
  data () {
    return {
      menus: [],
      componentName: 'Home',
      activeIndex: '',
      actions: {
        index: 'Home',
        user_info: 'Base',
        upd_pwd: 'Reset',
        upd_mobile_no: 'Phone',
        my_org: 'Org'
      },
      type: 'Home',
      customCenterName: '',
      menuList: []
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },

  watch: {
    $route () {
      this.componentName = this.$route.query.componentName
      for (const key in this.actions) {
        if (Object.hasOwnProperty.call(this.actions, key)) {
          if (this.actions[key] === this.componentName) {
            this.activeIndex = key
          }
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log(from)
    if (from.fullPath === '/login' || from.fullPath === '/') {
      next(vm => {
        vm.getOrgList()
      })
    } else {
      next()
    }
  },
  mounted () {
    this.componentName = this.$route.query.componentName || 'Home'

    for (const key in this.actions) {
      if (Object.hasOwnProperty.call(this.actions, key)) {
        if (this.actions[key] === this.componentName) {
          this.activeIndex = key
        }
      }
    }

    this.$api.USER_MENU_GET({ appId: '5001' }).then(res => {
      this.menus = res.data || []
      this.menuList = res.data
      console.log('个人中心菜单加载', this.menus)
    })
    this.getCustomCenterName()
  },
  created () {
    if (this.$route.query.type) {
      this.changeView(this.$route.query.type)
    }
  },
  methods: {
    ...mapActions('d2admin/account', ['logout']),
    ...mapActions('d2admin/page', ['closeAll']),
    getCustomCenterName () {
      this.$api.SETTING_GET_DICT(
        { typeCode: 'platform_show_custom_center_name' }
      ).then(({ data }) => {
        if (data.length > 0) {
          this.customCenterName = data.list[0].name
        }
      })
    },
    async initAppList (opOrgId) {
      const { data } = await this.$api.HEADE_GET({
        orgId: opOrgId
      })
      this.appList = []

      data.forEach(item => {
        // 个人中心不展示
        if (item.appCode !== 'my') {
          this.appList.push({
            title: item.appName,
            icon: item.appIconUrl,
            appId: item.appId,
            path: item.appCode || '/index'
          })
        }
      })
      // 初始化顶部应用 设置顶栏菜单
      await this.$store.dispatch(
        'd2admin/menu/appSet',
        [
          {
            title: '首页',
            icon: 'home',
            path: '/index'
          },
          ...this.appList
        ],
        { root: true }
      )

      // 清空侧栏
      this.$store.dispatch('d2admin/menu/funcSet', [])
      this.$router.push({
        path: '/index'
      })
    },
    getOrgList () {
      this.$api.USER_APP_GET().then(res => {
        const list = res.data.list
        if (list) {
          // '1'是默认组织  '2'不是
          const defaultOrg = list.find(item => item.orgDefault == '1')
          if (defaultOrg) {
            const { orgId, orgIconUrl, orgFullName } = defaultOrg
            this.$router.push({
              path: '/index'
            })
            util.cookies.set('logo', orgIconUrl)
            util.cookies.set('orgFullName', orgFullName)
            this.closeAll()
            this.initAppList(orgId)
          } else {
            console.log('没有默认组织')
          }
        }
      })
    },
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    /**
     * @description 切换视图
     */
    changeView (index, id) {
      this.type = index
      localStorage.setItem('functionId', id)
      this.$router.push({
        query: merge(this.$route.query, {
          componentName: this.actions[index],
          type: index
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-center {
  background: #f5f5f9;

  .manageItems {
    padding-top: 10px;
    .title {
      color: #9e9e9e;
      font-size: 12px;
      margin-top: 20px;
      padding-left: 20px;
    }
    .item {
      height: 40px;
      min-width: 40px;
      display: flex;
      align-items: center;
      text-decoration: none;
      padding-left: 20px;
      margin-right: 20px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      transition: margin 0.2s, border-radius padding-left 0.2s 0.2s;
      .subName {
        color: rgba(0, 0, 0, 0.87) !important;
      }
      .iconName {
        color: #9e9e9e;
        margin-right: 10px;
      }
    }
    .activeItem {
      background-color: #1294f7 !important;
      color: #fff !important;
      .iconName {
        color: #fff !important;
      }
    }
  }

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
    justify-content: flex-end;
    background-color: #fff;
  }
  .aside {
    // 减去顶部 50
    height: calc(100vh - 50px);
    background: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 24%);
  }
  .main {
    background: #fff;
    height: 100%;
    // 减去顶部，减去上下margin 20+20 + 50
  }
}
</style>
<style scoped>
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #409EFF !important;
    color: #FFF !important;
}
</style>
