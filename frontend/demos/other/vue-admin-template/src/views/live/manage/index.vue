<!--
 * @Author: 姚文彬
 * @Date: 2021-06-16 14:21:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-02 11:27:30
 * @FilePath: \o-front-admin\src\views\article\list\index.vue
-->
<template>
  <d2-container class="specific"
                :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{$route.meta.title}}</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn title="文档链接"
                       link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html" />
        </div>
      </d2-helper>
    </template>
    <el-container style="height: 100%;">
      <el-aside width="250px"
                class="aside">
        <div class="special">
          <el-input v-model="filterText"
                    placeholder="输入关键字过滤"
                    class="fiter"
                    suffix-icon="el-icon-search"
                    size="small"></el-input>
        </div>
        <el-tree ref="tree"
                 :data="list"
                 node-key="categoryId"
                 :props="props"
                 :expand-on-click-node="false"
                 :highlight-current="true"
                 :filter-node-method="filterNode"
                 @node-click="clickNode"
                 style="padding: 0 12px;">
          <span class="custom-tree-node"
                slot-scope="{ node }">
            <el-tooltip :content="node.label"
                        :disabled="isShowTooltip"
                        :open-delay="300"
                        placement="top"
                        effect="light">
              <span @mouseover="mouseOver($event)"
                    class="over-ellipsis">{{node.label }}</span>
            </el-tooltip>
          </span>
        </el-tree>
      </el-aside>
      <el-main class="main">
        <d2-crud-x ref="d2Crud"
                   v-bind="_crudProps"
                   v-on="_crudListeners"
                   @setting="goSetting"
                   @startlive="startlive"
                   @endlive="endlive"
                   @edit="editLive"
                   @liveSwitch="liveSwitch"
                   @liveLink="liveLink"
                   @chargeFor="chargeFor"
                   @dataStatistics="dataStatistics">
          <div slot="header">
            <crud-search ref="search"
                         :options="crud.searchOptions"
                         @submit="handleSearch" />
            <el-button size="small"
                       type="primary"
                       @click="addRow"
                       style="margin-bottom:10px">
              <i class="el-icon-plus"></i> 新增
            </el-button>
            <crud-toolbar style="margin-top:-40px"
                          v-bind="_crudToolbarProps"
                          v-on="_crudToolbarListeners" />
            <div style="margin-top:15px">
              <el-radio-group v-model="tabPosition"
                              @change="statusQuery">
                <el-radio-button v-for="(item, index) in status"
                                 :key="index"
                                 :label="item.value">
                  {{ item.label }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <template slot="coverImgSlot"
                    slot-scope="scope">
            <div class="imgNameCss">
              <el-image class="coverImg"
                        :src="scope.row.coverImg">
                <img slot="error"
                     class="coverImg"
                     src="@/assets/images/default.png" />
              </el-image>
              <span class="name">{{scope.row.name}}</span>
            </div>
          </template>
          <template slot="priceSlot"
                    slot-scope="scope">
            <span>{{scope.row.totalPrice}}元</span>
          </template>
          <template slot="categoryNameSlot"
                    slot-scope="scope">
            <ul v-if="scope.row.categoryName.length<=12">
              <li>{{scope.row.categoryName}}</li>
            </ul>
            <el-popover v-else
                        placement="right-start"
                        width="300"
                        trigger="hover">
              <ul>
                <li>{{scope.row.categoryName}}</li>
              </ul>
              <el-button slot="reference"
                         type="text">查看更多</el-button>
            </el-popover>
          </template>
          <template slot="watchStatusSlot"
                    slot-scope="scope">
            <span v-if="scope.row.watchStatus == 3 && scope.row.playBackType == 1">回放中</span>
            <span v-if="scope.row.watchStatus == 3 && scope.row.playBackType == 0 ">已结束</span>
            <span v-if="scope.row.watchStatus == 1">直播中</span>
            <span v-if="scope.row.watchStatus == 0">未开始</span>
            <span v-if="scope.row.watchStatus == 2 && scope.row.playBackType == 1">回放中</span>
            <span v-if="scope.row.watchStatus == 2 && scope.row.playBackType == 0 ">已结束</span>
          </template>
          <template slot="startTimeSlot" slot-scope="scope">
            <span v-if="scope.row.startTime">{{ moment(parseInt(scope.row.startTime)).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>

        </d2-crud-x>
        <el-dialog title="直播开关"
                   :visible.sync="dialogVisible"
                   width="20%">
          <el-radio-group v-model="watchStatus"
                          style="display:flex;flex-direction:column;height:60px;justify-content:space-between">
            <el-radio :label="1">开始直播</el-radio>
            <!-- <el-radio :label="2">回放</el-radio> -->
            <el-radio :label="3">结束直播</el-radio>
          </el-radio-group>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="直播链接"
                   :visible.sync="liveLinkDialog"
                   :close-on-click-modal=false
                   width="50%">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in liveTab"
                         :key="index"
                         :label="item.label"
                         :name="item.name">
              <div class="tab-box"
                   v-if="liveurlCurrent==0">
                <div class="url-box">
                  <span class="title">网页开播链接：</span>
                  <el-input size="mini"
                            class="url-input"
                            v-model="getLiveUrl.channelUrl"
                            controls-position="center"
                            style="width:60%"></el-input>
                  <!-- <el-button type="text" @click="goDiyLiveDetail">打开</el-button> -->
                  <el-link type="primary"
                           :href="getLiveUrl.channelUrl"
                           target="_blank">打开</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text"
                             @click="copyUrl(getLiveUrl.channelUrl)">复制</el-button>
                </div>
                <!-- <div class="url-box">
                       <span class="title">启动客户端链接：</span>
                       <el-input size="mini" class="url-input" v-model="lecturerClient" controls-position="center" style="width:60%"></el-input>
                       <el-button type="text">打开</el-button>
                       <el-divider  direction="vertical"></el-divider>
                       <el-button type="text"  @click="copyUrl('http://localhost/#/live/list2')">复制</el-button>
                   </div>
                   <div class="url-box">
                       <span class="title"></span>
                       <span class="des">频道号：343434</span>
                       <span>密码：aa123456</span>
                   </div> -->
              </div>
              <div class="tab-box"
                   v-if="liveurlCurrent==1">
                <div class="url-box">
                  <span class="title">网页开播链接：</span>
                  <el-input size="mini"
                            class="url-input"
                            v-model="getLiveUrl.channelUrl"
                            controls-position="center"
                            style="width:60%"></el-input>
                  <el-link type="primary"
                           :href="getLiveUrl.channelUrl"
                           target="_blank">打开</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text"
                             @click="copyUrl(getLiveUrl.channelUrl)">复制</el-button>
                </div>
              </div>
              <div class="tab-box"
                   v-if="liveurlCurrent==2">
                <div class="url-box">
                  <span class="title">助教后台链接：</span>
                  <el-input size="mini"
                            class="url-input"
                            v-model="getLiveUrl.channelUrl"
                            controls-position="center"
                            style="width:60%"></el-input>
                  <el-link type="primary"
                           :href="getLiveUrl.channelUrl"
                           target="_blank">打开</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text"
                             @click="copyUrl(getLiveUrl.channelUrl)">复制</el-button>
                </div>
                <!-- <div class="url-box">
                     <span class="title"></span>
                     <span class="des">频道号：343434</span>
                     <span>密码：aa123456</span>
                     <el-link type="primary" class="look-child">查看其他子频道</el-link>
                 </div> -->
              </div>
              <div class="tab-box"
                   v-if="liveurlCurrent==3">
                <div class="url-box">
                  <span class="title">门户：</span>
                  <el-select @change="pcChange"
                             style="width:60%"
                             v-model="pcSelect"
                             size="mini"
                             placeholder="请选择门户">
                    <el-option v-for="item in pcOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="url-box">
                  <span class="title">门户观看地址：</span>
                  <el-input size="mini"
                            class="url-input"
                            v-model="pcUrl"
                            controls-position="center"
                            style="width:60%"></el-input>
                  <el-link type="primary"
                           :href="pcUrl"
                           target="_blank">打开</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text"
                             @click="copyUrl(pcUrl)">复制</el-button>
                </div>
                <div class="url-box"
                     style="display:flex; align-items:center;">
                  <span class="title">移动端H5观看：</span>
                  <img src=""
                       style="width:100px;height:100px">
                  <span style="margin-left:20px;color:#409eff;font-size:18px;cursor:pointer;">下载</span>
                  <!-- <el-select @change="mChange" style="width:60%" v-model="mSelect" size="mini" placeholder="请选择">
                          <el-option
                            v-for="item in mOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select> -->
                </div>
                <!-- <div class="url-box">
                        <span class="title">H5观看地址：</span>
                        <el-input size="mini" class="url-input" v-model="mUrl" controls-position="center" style="width:60%"></el-input>
                        <el-button type="text" @click="copyUrl('http://localhost/#/live/list6')">复制</el-button>
                    </div> -->
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
        <el-dialog :title="'上架到' + platformFullName"
                   :visible.sync="chargeForDialog"
                   :close-on-click-modal=false
                   width="50%"
                   top="10px"
                   center>
          <div class="show">
            <el-image class="goodsImgDialog"
                      :src="rowData.coverImg">
              <img slot="error"
                   class="goodsImgDialog"
                   src="@/assets/images/default.png" />
            </el-image>
            <div>
              <div class="goodsName">{{rowData.name}}</div>
              <div class="category">{{rowData.categoryName}}</div>
            </div>
          </div>
          <el-form ref="form"
                   :model="form"
                   label-width="135px"
                   style="margin-top: 50px;"
                   :rules="rules">
            <vxe-table style="margin-bottom: 30px;"
                       border
                       resizable
                       show-overflow
                       :data="tableData"
                       :edit-config="{trigger: 'click', mode: 'row'}"
                       ref="xTable"
                       :edit-rules="validRules">
              <vxe-table-column type="checkbox"
                                width="60"></vxe-table-column>
              <vxe-table-column field="normName"
                                title="规格"></vxe-table-column>
              <vxe-table-column field="shelvesTotal"
                                title="上架数量"
                                :edit-render="{name: '$input', props: {type: 'number',min:1}}"></vxe-table-column>
              <vxe-table-column field="price"
                                title="销售价"
                                :edit-render="{name: '$input', props: {type: 'float', digits: 2,min:0.01}}"></vxe-table-column>
            </vxe-table>

            <el-form-item label="限购："
                          prop="limitQuantity">
              每个用户累计可购买数量
              <el-input size="mini"
                        v-model="form.limitQuantity"
                        controls-position="right"
                        disabled
                        style="width:100px"></el-input>
              件
              <br>
              <span class="explain">限购1件</span>
            </el-form-item>

            <el-form-item label="售后："
                          prop="isSupportRefund">
              <el-radio-group v-model="form.isSupportRefund">
                <el-radio :label="1">支持退款</el-radio>
                <el-radio :label="2">不支持退款</el-radio>
              </el-radio-group>
              <br>
              <span class="explain">若是不支持退款，直播详情页将展示“<span style="color:#6F9F9D;font-weight:bold;">此直播不支持退款</span>”字样</span>
            </el-form-item>
            <el-form-item label="下单页面限制："
                          prop="placeOrderLimit">
              <el-radio-group v-model="form.placeOrderLimit">
                <el-radio :label="1">不限制</el-radio>
                <el-radio :label="2">禁止购物车购买</el-radio>
              </el-radio-group>
              <br>
              <span class="explain">若是禁止购物车界面购买，买家将只能在直播详情页购买单个直播；交易设置中也可对全局进行设置，只有都不限制时，直播才会允许加入购物车</span>
            </el-form-item>
            <el-form-item label="可购物客户限制："
                          prop="buyCustLimit">
              <el-radio-group v-model="form.buyCustLimit">
                <el-radio :label="1">不限制</el-radio>
                <el-radio :label="2">仅会员</el-radio>
              </el-radio-group>
              <br>
              <span class="explain">你可在客户管理中对客户进行分组</span>
            </el-form-item>
            <div style="margin-left: 40%;">
              <el-button @click="chargeForDialog = false">取 消</el-button>
              <el-button type="primary"
                         @click="putLiveAway">上架</el-button>
            </div>
          </el-form>
        </el-dialog>
        <el-dialog title="提示"
                   :visible.sync="cancelDialog"
                   width="30%">
          <span>是否确认取消发布该直播</span>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="endliveAjax">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="提示"
                   :visible.sync="confirmDialog"
                   width="30%">
          <span>是否确认发布该直播</span>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="confirmliveAjax">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </d2-container>
</template>

<script>
/* eslint-disable */ 

import moment from 'moment'
import util from '@/libs/util'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { mapState } from 'vuex'
export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      cancelDialog: false,
      confirmDialog: false,
      liveLinkDialog: false,
      activeName: 'lecturer',
      liveurlCurrent: 0,
      lecturerWeb: '',
      lecturerClient: '',
      guestWeb: '',
      assistantWeb: '',
      getLiveUrl: {},
      pcOptions: [],
      mOptions: [{
        value: '选项3',
        label: '门户3'
      }, {
        value: '选项4',
        label: '门户4'
      }],
      pcSelect: '',
      mSelect: '',
      pcUrl: '',
      mUrl: '',
      liveTab: [
        {
          name: 'lecturer',
          label: '讲师'
        },
        {
          name: 'guest',
          label: '嘉宾'
        },
        {
          name: 'assistant',
          label: '助教'
        },
        {
          name: 'audience',
          label: '观众'
        }
      ],
      tabPosition: null,
      chargeForDialog: false,
      dialogVisible: false,
      filterText: '',
      myLiveId: '',
      list: [],
      props: {
        label: 'categoryName',
        value: 'categoryId',
        children: 'childrenLiveCategoryVO'
      },
      watchStatus: null,
      liveChannelId: '',
      categoryId: '',
      status: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 0,
          label: '未开始'
        },
        {
          value: 1,
          label: '正在直播'
        },
        {
          value: 2,
          label: '回放中'
        },
        {
          value: 3,
          label: '已结束'
        }
      ],
      isShowTooltip: false,
      liveUrl: '',
      form: {
        liveChannelId: '',
        limitQuantity: 1,
        isSupportRefund: 1,
        placeOrderLimit: 1,
        buyCustLimit: 1
        // liveChannelId: string, // 直播频道ID【必须】",
        // shelvesTotal: int, // 上架数量【必须】",
        // price: int, // 销售价，上架价格（单位：分）【必须】",
        // limitQuantity: int, // 限购数量【必须】",
        // isSupportRefund: int, // 售后，是否支持退款(支持：1，不支持：2)【必须】",
        // placeOrderLimi: int, // 下单限制（1：不限制，2：禁止购物车购买）【必须】",
        // buyCustLimit: int // 可购客户限制（1：不限制，2：仅会员）【必须】"
      },
      tableData: [
        {
          shelvesTotal: 0,
          price: 0.01,
          normName: '直播'
        }
      ],
      validRules: { // 表格校验
        shelvesTotal: [{ required: true, message: '上架数量必须填写' }],
        productPrice: [{ required: true, message: '销售价必须填写' }]
      },
      rules: {
        limitQuantity: [{ required: true, message: '限购数为必填项', trigger: 'blur' }],
        isSupportRefund: [{ required: true, message: '售后为必选项', trigger: 'blur' }],
        placeOrderLimit: [{ required: true, message: '下单页面限制为必选项', trigger: 'blur' }],
        buyCustLimit: [{ required: true, message: '可购物客户限制为必选项', trigger: 'blur' }]
      },
      rowData: {},
      platformFullName: util.cookies.get('title')

    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  created () {
    this.getColumn()
  },
  methods: {
    moment,
    // 超出显示
    mouseOver (event) {
      this.isShowTooltip = event.currentTarget.scrollWidth <= event.currentTarget.clientWidth
    },
    filterNode (value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    statusQuery (val) {
      this.handleSearch({
        watchStatus: val,
        categoryId: this.categoryId
      })
    },
    getColumn () {
      this.$api.QUERY_LIVE_MENU().then(({ data }) => {
        this.list = data
      })
    },
    addRow () {
      this.$router.push({
        path: 'live_create'
      })
    },
    clickNode (data) {
      this.categoryId = data.categoryId
      this.doRefresh()
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    confirm () {
      this.$api.HANDLE_CHANGE_LIVE_STATUS({
        liveChannelId: this.liveChannelId,
        watchStatus: this.watchStatus
      }).then(res => {
        if (res.code === '1') {
          this.$message.success('操作成功！')
          this.doRefresh()
        }
      })
      this.dialogVisible = false
    },
    // 详情
    goSetting (row) {
      this.$router.push({
        path: 'live_setting',
        query: {
          id: row.row.liveChannelId,
          releaseStatus: row.row.releaseStatus
        }
      })
    },
    startlive ({ row }) {
      this.confirmDialog = true
      this.myLiveId = row.liveChannelId
    },
    confirmliveAjax () {
      this.$api.CANCEL_LIVE_CHANNEL({
        liveChannelId: this.myLiveId
        // // verificationCode: this.codeForm.code,
        // userName: this.info.username || '',
        // headUrl: this.info.headUrl || ''
      }).then(res => {
        this.confirmDialog = false
        if (res.code === '1') {
          this.doRefresh()
          this.$message.success('发布成功！')
          // this.liveUrl = res.data
          // // location.href = this.liveUrl
          // window.open(this.liveUrl, '_blank')
        } else {
          this.$message.warning(res.msg)
          this.confirmDialog = false
        }
      }).catch(err => {
      })
    },
    endlive ({ row }) {
      this.cancelDialog = true
      this.myLiveId = row.liveChannelId
    },
    endliveAjax () {
      this.$api.CANCEL_LIVE({
        liveChannelId: this.myLiveId
        // verificationCode: this.codeForm.code,
        // userName: this.info.username || '',
        // headUrl: this.info.headUrl || ''
      }).then(res => {
        this.cancelDialog = false
        if (res.code === '1') {
          this.doRefresh()
          this.$message.success('取消发布成功！')
        } else {
          this.cancelDialog = false
        }
      })
    },
    editLive (row) {
      this.$router.push({
        path: 'live_create',
        query: {
          id: row.row.liveChannelId
        }
      })
      console.log(row)
    },
    liveSwitch (row) {
      console.log(row)
      this.watchStatus = row.row.watchStatus
      this.liveChannelId = row.row.liveChannelId
      this.dialogVisible = true
    },
    goDiyLiveDetail () {
      this.$router.push({
        path: '/liveLink'
      })
    },
    // 直播弹框展示
    liveLink (row) {
      this.liveLinkDialog = true
      console.log(row.row.liveChannelId)
      this.$api.QUERY_LIVE_LINK({ liveChannelId: row.row.liveChannelId, viewCondition: row.row.viewCondition }).then(res => {
        if (res.code === '1') {
          this.getLiveUrl = res.data
          this.pcOptions = this.getLiveUrl.audienceChannelUrlList.map(item => {
            return {
              label: item.terminalName,
              value: item.audienceChannelUrl
            }
          })
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    handleClick (value) { // 直播弹框tab切换
      this.liveurlCurrent = value.index
      console.log(value.index)
    },
    pcChange (value) { // 直播弹框 PC门户 下拉选择
      this.pcUrl = value
    },
    mChange (value) { // 直播弹框 h5门户 下拉选择
      console.log(value)
    },
    copyUrl (url) { // 复制直播链接
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
    },
    openLiveUrl () { // 打开直播链接
      const routeUrl = this.$router.resolve({
        path: '/liveLink'
        // query: {id:96}
      })
      window.open(routeUrl.href, '_blank')
    },
    // 设为收费
    chargeFor ({ row }) {
      console.log('我收费啦')
      this.rowData = row
      this.form = {
        liveChannelId: '',
        limitQuantity: 1,
        isSupportRefund: 1,
        placeOrderLimit: 1,
        buyCustLimit: 1
      }
      this.tableData = [
        {
          shelvesTotal: 0,
          price: 0.01,
          normName: '直播'
        }
      ]
      this.form.liveChannelId = row.liveChannelId
      this.chargeForDialog = true
    },
    // 数据统计
    dataStatistics () {
      console.log('统计一下吧')
    },
    // 上架该直播
    async putLiveAway () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      if (selectRecords.length > 0) {
        const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
        if (errMap) { // 必填项未填写
        } else { // 表格内信息校验成功
          this.$refs.form.validate((valid) => {
            if (valid) {
              const selectRecords = this.$refs.xTable.getCheckboxRecords()[0]
              this.$api.SET_LIVE_CHARGE({
                ...this.form,
                price: Number(selectRecords.price) * 100,
                shelvesTotal: Number(selectRecords.shelvesTotal)
                //  normForms: selectRecords
              }).then(res => {
                if (res.code === '1') {
                  this.$message.success('上架成功！')
                  this.chargeForDialog = false
                  this.doRefresh()
                }
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      } else {
        this.$message.warning('请选择课程规格')
      }
    },
    // 删除
    delRequest (row) {
      console.log(row)
      return this.$api.DELETE_LIVE({
        liveChannelId: row.liveChannelId
      })
    },

    // 列表查询
    pageRequest (query) {
      query.categoryId = this.categoryId
      query.watchStatus = this.tabPosition
      return this.$api.GET_LIVE_LIST(query)
    }
  }

}

</script>
<style lang="scss">
.special .el-input--small .el-input__inner {
  height: 30px;
  background: #f3f4f6;
  border-radius: 20px;
}
.el-tree-node__content {
  height: 40px;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  color: #1e90ff;
}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  .el-tree-node__expand-icon {
  color: #1e90ff;
}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  .el-tree-node__expand-icon.is-leaf {
  color: transparent;
}
.coverImg .el-image__inner {
  object-fit: cover;
}
</style>
<style lang="scss" scoped>
.onlyThree {
  overflow: hidden;
  text-overflow: ellipsis; //显示为省略号
  white-space: nowrap; //不换行
  text-align: left;
  padding-bottom: 2%;
  span {
    overflow: hidden;
    text-overflow: ellipsis; //显示为省略号
    white-space: nowrap;
  }
}
.main {
  width: 90%;
  border: 1px solid #cfd7e5;
  margin: 10px;
  padding: 10px;
  background: white;
}
.aside {
  border: 1px solid #cfd7e5;
  margin: 10px 0 10px 10px;
  background: white;
  overflow-x: hidden;
}
.fiter {
  width: 90%;
  margin: 10px 10px;
}
.imgNameCss {
  display: flex;
  text-align: left;
}
.coverImg {
  width: 70px;
  height: 40px;
  flex-shrink: 0;
}
.name {
  margin-left: 5px;
}
.over-ellipsis {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.show {
  margin-left: 25px;
  height: 100px;
  margin-bottom: -40px;
}
.explain {
  color: darkgray;
  font-size: 10px;
  line-height: 10px;
}
.goodsImgDialog {
  float: left;
  width: 100px;
  height: 80%;
  margin-right: 20px;
  object-fit: contain;
}
.goodsName {
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
}
.tab-box {
  margin-top: 20px;
  .url-box {
    margin-bottom: 16px;
    .title {
      width: 112px;
      display: inline-block;
    }
    .title,
    .url-input {
      margin-right: 16px;
    }
    .des {
      margin-right: 30px;
    }
    .look-child {
      margin-left: 20px;
    }
  }
}
</style>
