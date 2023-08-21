<template>
  <d2-container>
    <div class="setting-container">
      <div class="img">
        <img
          :src="form.coverImg"
          alt=""
        >
      </div>
      <div class="content">
        <div class="content-title">
          {{ form.name }}
          <el-button
            class="live-url"
            type="text"
            @click="liveLink"
          >直播链接</el-button>
        </div>
        <div>直播间ID：{{ form.liveChannelId }}</div>
        <div>
          开播时间：{{ form.startTime }}（预计直播时长：{{
            form.planDuration
          }}分钟）
        </div>
        <div>
          {{ getSceneName() }} | {{ getDictDataName() }} |
          {{ getLinkLabel() }} |
          <span style="font-size: 14px; color: #666">观看时长要求：不少于100%实际直播时长
            <span style="color: #409eff; cursor: pointer" @click="handleClickUpdateClassRules">更新课时认定规则</span>
          </span>
        </div>
      </div>
      <div class="edit-live-btn">
        <el-button
          v-if="$route.query.releaseStatus == 0"
          type="primary"
          plain
          @click="editLive"
        >编辑直播</el-button>
        <el-button
          type="primary"
          size="small"
          @click="backClick"
        >返回</el-button>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="基础信息"
          name="first"
        >
          <div style="font-size: 14px; color: #666; padding-left: 20px">
            （注：如发布直播后调整直播间基础信息以及直播角色，请注意再次发布直播）
          </div>
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
            style="width: 70%"
          >
            <el-form-item
              label="直播间图标"
              prop="liveScene"
            >
              <el-image
                class="classImg"
                :src="form.channelLogoImage"
                @click="uploadImg"
              >
                <span
                  slot="error"
                  class="live-uploader"
                  @click="uploadImg"
                >
                  <img
                    :src="form.channelLogoImage"
                    alt=""
                  >
                </span>
              </el-image>
              <div style="color: #5e5e5e">
                为了保证显示效果，请上传 140 x 140px
                大小的图标，支持jpg、jpeg、png格式，文件大小不超过 2M
              </div>
            </el-form-item>
            <el-form-item
              label="主持人"
              prop="liveScene"
            >
              <el-input v-model="form.compere" />
            </el-form-item>

            <el-form-item label="暖场内容" prop="liveScenes">
              <div>
                <el-switch v-model="form.isWarmup" active-color="#409eff" inactive-color="#ff4949" />
                <span style="margin-left: 20px; font-size: 12px; color: #666">注：播放回放视频时将不显示暖场内容</span>
              </div>
              <div>
                <span style="margin-right: 20px">暖场类型</span>
                <el-radio v-model="form.warmupType" label="1">图片</el-radio>
                <el-radio v-model="form.warmupType" label="2">视频</el-radio>
              </div>
              <div>
                <el-upload v-if="form.warmupType == 1" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="form.dialogVisible">
                  <img width="100%" :src="form.warmupImageUrl">
                </el-dialog>
              </div>
            </el-form-item>

            <el-form-item
              label="介绍"
              prop="liveScene"
            >
              <vue-rich-text-editor
                v-model="form.remarkUrl"
                :height="60"
                :toolbars="toobars"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmitBase"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="角色设置"
          name="second"
        >
          <div style="width: 60%">
            <div>
              <h3>讲师设置</h3>
              <div style="color: #999; margin-bottom: 20px">
                讲师：唯一角色，一个直播间只有1个讲师，负责，负责上课和管理直播间信息
              </div>
              <el-table
                :data="teacherData"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="roleHeadImg"
                  label="讲师信息"
                  width="150"
                >
                  <template slot-scope="scope">
                    <div style="display: flex; align-items: center">
                      <img
                        :src="scope.row.roleHeadImg"
                        alt=""
                        style="width: 50px; height: 50px; margin-right: 10px"
                      >
                      <span>{{ scope.row.userName }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="nickName"
                  label="昵称"
                  width="120"
                />
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="doSet(scope.row, '讲师')"
                    >设置</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <h3>助教设置</h3>
              <div style="color: #999; margin-bottom: 20px">
                助教：使用子频道登录助教管理后台，能够观看直播、参与互动、进行聊天室管理，发送图文直播，监控直播等操作
              </div>
              <el-button
                type="primary"
                style="margin-bottom: 10px"
                size="small"
                @click="doSet(0, '助教', true)"
              >添加</el-button>
              <el-table
                :data="assistantData"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="date"
                  label="助教信息"
                  width="150"
                >
                  <template slot-scope="scope">
                    <div style="display: flex; align-items: center">
                      <img
                        :src="scope.row.roleHeadImg"
                        alt=""
                        style="width: 50px; height: 50px; margin-right: 10px"
                      >
                      <span>{{ scope.row.userName }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="nickName"
                  label="昵称"
                  width="120"
                />
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                >
                  <template slot-scope="scope">
                    <div style="width: 100%; height: 100%; display: flex">
                      <el-button
                        type="text"
                        size="small"
                        @click="doSet(scope.row, '设置', true)"
                      >设置</el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="doDel(scope.row)"
                      >删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <h3>嘉宾设置</h3>
              <div style="color: #999; margin-bottom: 20px">
                嘉宾：讲师和嘉宾可同时讲一堂课，支持连麦互动，需要使用最新开播端登录
              </div>
              <el-button
                type="primary"
                style="margin-bottom: 10px"
                size="small"
                @click="doSet(0, '嘉宾')"
              >添加</el-button>
              <el-table
                :data="guestData"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="date"
                  label="嘉宾信息"
                  width="150"
                >
                  <template slot-scope="scope">
                    <div style="display: flex; align-items: center">
                      <img
                        :src="scope.row.roleHeadImg"
                        alt=""
                        style="width: 50px; height: 50px; margin-right: 10px"
                      >
                      <span>{{ scope.row.userName }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="nickName"
                  label="昵称"
                  width="120"
                />
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="doSet(scope.row, '嘉宾')"
                    >设置</el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="doDel(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="回放设置"
          name="third"
        >
          <el-form
            ref="backform"
            :model="form"
            label-width="100px"
            style="width: 60%"
          >
            <el-form-item
              label="回放开关"
              prop="liveSwitch"
            >
              <el-switch
                v-model="liveSwitch"
                active-color="#409eff"
                inactive-color="#dcdfe6"
                @change="doChange"
              />
            </el-form-item>
            <!-- <el-form-item>
              <div style="color: #409eff; cursor: pointer" @click="handleClickPlayBackDownload">
                回放视频下载
              </div>
            </el-form-item> -->
            <!-- <el-form-item label="回放方式"
                          prop="playBackType"
                          v-if="liveSwitch">
              <el-radio-group v-model="backform.playBackType">
                <el-radio :label="1">单个回放</el-radio>
                <el-radio :label="2">列表回放</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="回放路径"
                          prop="playBackUrl"
                          v-if="liveSwitch">
              <el-input v-model="backform.playBackUrl" />
            </el-form-item> -->
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmitBack"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="观看限制条件"
          name="fouth"
        >
          <el-form
            ref="formRules"
            :model="formRules"
            label-width="110px"
            style="width: 60%"
            :rules="rules"
          >
            <el-button
              v-if="viewCondition == 3"
              size="small"
              type="primary"
              style="margin-bottom: 10px"
              @click.stop="addAudience(6)"
            >
              <i class="el-icon-plus" /> 导入白名单
            </el-button>
            <el-form-item
              label="选择观看条件"
              prop="viewCondition"
              :rules="rules"
            >
              <el-radio-group
                v-model="viewCondition"
                @change="change"
              >
                <el-radio :label="3">白名单观看</el-radio>
                <el-radio :label="2">验证码观看</el-radio>
                <el-radio :label="1">登录</el-radio>
                <el-radio :label="0">无限制</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="viewCondition == 2"
              label="验证码"
              prop="verificationCode"
            >
              <el-input
                v-model="verificationCode"
                @input="validCode"
              >
                <em slot="suffix">{{ verificationCode.length }} / 8</em>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          v-loading="loading"
          label="观众列表"
          name="five"
        >
          <div style="width: 70%; position: relative; padding-bottom: 60px">
            <el-button
              size="small"
              type="primary"
              style="margin-bottom: 10px"
              @click.stop="addAudience(5)"
            >
              <i class="el-icon-plus" /> 导入观众
            </el-button>
            <el-button
              type="text"
              @click="updataRule"
            >更新课时规则</el-button>
            <el-table
              :data="audienceForm"
              border
              :header-cell-style="{ background: '#f2f2f2' }"
            >
              <el-table-column
                prop="nickName"
                label="用户昵称"
              >
                <template slot-scope="scope">
                  <div class="imgNameCss">
                    <el-image
                      class="coverImg"
                      :src="scope.row.userHeadImg"
                    >
                      <img
                        slot="error"
                        class="coverImg"
                        src="@/assets/images/default.png"
                      >
                    </el-image>
                    <span class="name">{{ scope.row.nickName }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号"
              />
              <!-- <el-table-column prop="viewCondition" label="进入条件">
            <template  slot-scope="scope">
              <span v-if="scope.row.viewCondition === 0">无限制</span>
              <span v-if="scope.row.viewCondition === 1">登录</span>
              <span v-if="scope.row.viewCondition === 2">验证码观看</span>
              <span v-if="scope.row.viewCondition === 4">付费观看</span>
            </template>
          </el-table-column> -->
              <el-table-column
                prop="sourceName"
                label="来源"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.sourceName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sourceName"
                label="观看时长"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.watchTimeStr }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sourceName"
                label="完成状态"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.isFinishStudy ? "已完成" : "未完成"
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page.sync="queryInfo.pageNum"
              :page-size="queryInfo.pageSize"
              layout="total, sizes,prev, pager, next, jumper"
              :page-sizes="[5, 10, 20, 30, 40, 50]"
              :total="pageTotal"
              style="position: absolute; right: 0; bottom: 0"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogtype + dialogtitle"
      :visible.sync="dialog"
      width="50%"
    >
      <el-form
        ref="addform"
        :model="addform"
        label-width="90px"
        :rules="addrules"
      >
        <el-form-item
          label="成员"
          prop="userId"
        >
          <el-select
            ref="mamber"
            v-model="addform.userId"
            placeholder="请选择成员"
            style="width: 100%"
          >
            <el-option
              v-for="(t, i) in memberArr"
              :key="i"
              :label="t.memberName"
              :value="t.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="昵称"
          prop="nickName"
        >
          <el-input v-model="addform.nickName" />
        </el-form-item>
        <el-form-item
          label="角色头像"
          prop="roleHeadImg"
        >
          <el-upload
            :show-file-list="false"
            :action="url"
            :headers="{
              Authorization: token,
              OpDomain: opDomain,
            }"
            :on-success="handleAvatarSuccess"
            class="avatar-uploader"
          >
            <img
              v-if="addform.roleHeadImg"
              :src="addform.roleHeadImg"
              width="100"
              height="100"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
          <div style="color: #5e5e5e">
            请上传 140 x 140 大小的图标，文件大小不超过2M
          </div>
        </el-form-item>
        <!-- <el-form-item v-if="isTa" label="权限设置">
            <el-checkbox v-model="permissionsList.isPaging">翻页</el-checkbox>
            <el-checkbox v-model="permissionsList.isNotice">发布公告</el-checkbox>
            <el-checkbox v-model="permissionsList.isSignIn">发起签到</el-checkbox>
            <el-checkbox v-model="permissionsList.isVote">发起投票</el-checkbox>
          <div style="color: #999">（注：只能一个助教拥有翻页权限）</div>
        </el-form-item> -->
      </el-form>
      <div
        slot="footer"
        style="text-align: right"
      >
        <el-button @click="dialog = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="submitForm"
        > 保存 </el-button>
      </div>
    </el-dialog>
    <el-dialog title="回放文件下载" :visible.sync="Downloading" width="50%">
      <div>
        <div style="font-size: 18px; margin-bottom: 10px;">
          <span style="font-weight: bold;">直播名称：</span>
          <span> {{ form.name }}</span>
        </div>
        <div>
          <el-table
            v-loading="listLoading"
            :data="downloadTableList"
            border
            fit
            highlight-current-row
            style="width: 100%"
            :max-height="500"
          >
            <el-table-column label="直播开始时间">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="直播时长">
              <template slot-scope="scope">
                <span>{{ scope.row.duration }}</span>
              </template>
            </el-table-column>
            <el-table-column label="视频文件下载地址">
              <template slot-scope="scope">
                <el-link type="primary" :underline="false" @click="downFile(scope.row.fileUrl)">下载</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="listQuery.total > 0"
            :total="listQuery.total"
            :page.sync="listQuery.pageNum"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
    </el-dialog>
    <!-- 导入观众 -->
    <ImportAudience
      ref="ImportAudience"
      :dialog-audience="dialogAudience"
      @handleCanel="handleCanel"
      @uploadClick="uploadClick"
    />
    <!-- @pageRequest="statusQuery" -->
    <!-- @doRefresh="doRefresh" -->
    <el-dialog
      title="上传图片"
      :visible.sync="imgUploadDialog"
      width="650px"
      :close-on-click-modal="false"
    >
      <resource-uploader-v2
        ref="pictureResourceUploader"
        resource-name="图片"
        upload-code="Upload-file-img"
        :show-upload-button="true"
        :show-select-dir="false"
        :select-dir-by-suffix="true"
        :show-label="true"
        resource-suffix=".jpg,.png"
        file-type="img"
        resource-bind-id="test"
        @uploadComplete="uploadComplete"
      />
    </el-dialog>
    <el-dialog
      title="直播链接"
      :visible.sync="liveLinkDialog"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-tabs
        v-model="curName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, index) in liveTab"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <div
            v-if="liveurlCurrent == 0"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">网页开播链接：</span>
              <el-input
                v-model="getLiveUrl.channelUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <!-- <el-button type="text" @click="goDiyLiveDetail">打开</el-button> -->
              <el-link
                type="primary"
                :href="getLiveUrl.channelUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(getLiveUrl.channelUrl)"
              >复制</el-button>
            </div>
          </div>
          <div
            v-if="liveurlCurrent == 1"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">网页开播链接：</span>
              <el-input
                v-model="getLiveUrl.channelUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <el-link
                type="primary"
                :href="getLiveUrl.channelUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(getLiveUrl.channelUrl)"
              >复制</el-button>
            </div>
          </div>
          <div
            v-if="liveurlCurrent == 2"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">助教后台链接：</span>
              <el-input
                v-model="getLiveUrl.channelUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <el-link
                type="primary"
                :href="getLiveUrl.channelUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(getLiveUrl.channelUrl)"
              >复制</el-button>
            </div>
          </div>
          <div
            v-if="liveurlCurrent == 3"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">门户：</span>
              <el-select
                v-model="pcSelect"
                style="width: 60%"
                size="mini"
                placeholder="请选择门户"
                @change="pcChange"
              >
                <el-option
                  v-for="option in pcOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </div>
            <div class="url-box">
              <span class="title">门户观看地址：</span>
              <el-input
                v-model="pcUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <el-link
                type="primary"
                :href="pcUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(pcUrl)"
              >复制</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      title="直播链接"
      :visible.sync="liveLinkDialog"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-tabs
        v-model="curName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, index) in liveTab"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <div
            v-if="liveurlCurrent == 0"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">网页开播链接：</span>
              <el-input
                v-model="getLiveUrl.channelUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <!-- <el-button type="text" @click="goDiyLiveDetail">打开</el-button> -->
              <el-link
                type="primary"
                :href="getLiveUrl.channelUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(getLiveUrl.channelUrl)"
              >复制</el-button>
            </div>
          </div>
          <div
            v-if="liveurlCurrent == 1"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">网页开播链接：</span>
              <el-input
                v-model="getLiveUrl.channelUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <el-link
                type="primary"
                :href="getLiveUrl.channelUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(getLiveUrl.channelUrl)"
              >复制</el-button>
            </div>
          </div>
          <div
            v-if="liveurlCurrent == 2"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">助教后台链接：</span>
              <el-input
                v-model="getLiveUrl.channelUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <el-link
                type="primary"
                :href="getLiveUrl.channelUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(getLiveUrl.channelUrl)"
              >复制</el-button>
            </div>
          </div>
          <div
            v-if="liveurlCurrent == 3"
            class="tab-box"
          >
            <div class="url-box">
              <span class="title">门户：</span>
              <el-select
                v-model="pcSelect"
                style="width: 60%"
                size="mini"
                placeholder="请选择门户"
                @change="pcChange"
              >
                <el-option
                  v-for="option in pcOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </div>
            <div class="url-box">
              <span class="title">门户观看地址：</span>
              <el-input
                v-model="pcUrl"
                size="mini"
                class="url-input"
                controls-position="center"
                style="width: 60%"
              />
              <el-link
                type="primary"
                :href="pcUrl"
                target="_blank"
              >打开</el-link>
              <el-divider direction="vertical" />
              <el-button
                type="text"
                @click="copyUrl(pcUrl)"
              >复制</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </d2-container>
</template>

<script>
/* eslint-disable */ 

import { globalOpdomain, downFile } from '@/utils/index'
import { cloneDeep } from 'lodash'

import util from '@/libs/util'
import vueRichTextEditor from '@/components/rich-editor/vue-rich-text-editor.vue'
import ImportAudience from './components/importAudience'
import Pagination from '@/components/Pagination'

const { promiseBaseUrl } = document.querySelector('body').dataset
export default {
  components: {
    vueRichTextEditor,
    ImportAudience,
    Pagination
  },
  data () {
    const validTitle = (rule, value, callback) => {
      if (this.title) {
        callback()
      } else {
        callback(new Error('请输入欢迎标题'))
      }
    }
    const validCode = (rule, value, callback) => {
      if (this.verificationCode) {
        callback()
      } else {
        callback(new Error('请输入验证码'))
      }
    }
    return {
      loading: true,
      rules: {
        title: [
          {
            required: true,
            message: '请输入欢迎标题',
            trigger: 'blur',
            validator: validTitle
          }
        ],
        verificationCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
            validator: validCode
          }
        ]
      },

      liveLinkDialog: false,
      getLiveUrl: {},
      pcOptions: [],
      curName: 'lecturer',
      liveurlCurrent: 0,
      pcUrl: '',
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
      viewCondition: 0,
      imgUploadDialog: false,
      opDomain: globalOpdomain(),
      token: util.cookies.get('token'),
      url: `${promiseBaseUrl || process.env.VUE_APP_API
        }/baseservice/upload/uploadimg`,
      activeName: 'first',
      form: {
        compere: 20,
        channelLogoImage: '',
        isWarmup: true, // 暖场内容
        warmupType: '',
        dialogImageUrl: '',
        dialogVisible: false,
        remarkUrl: '',
        warmupImageUrl: '', // 暖场图片地址
        warmupVideoUrl: '' // 暖场视频地址
      },
      memberType: 0,
      verificationCode: '',
      title: '欢迎观看本次直播',
      formRules: {
        title: '欢迎观看本次直播',
        verificationCode: ''
      },
      Downloading: false,
      dialog: false,
      dialogAudience: false,
      audienceTypeShow: false, // 显示隐藏导入观众弹框
      dialogtype: '',
      dialogtitle: '',
      backform: {},
      addform: {},
      permissionsList: {
        isPaging: false,
        isNotice: false,
        isSignIn: false,
        isVote: false
      },
      teacherData: [],
      memberArr: [],
      liveSwitch: false,
      toobars: [
        [
          'fullscreen',
          '|',
          'undo',
          'redo',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'removeformat',
          'formatmatch',
          '|',
          'forecolor',
          'backcolor',
          'insertorderedlist',
          'insertunorderedlist',
          '|',
          'fontsize',
          'touppercase',
          'tolowercase',
          '|',
          'date',
          'time',
          'spechars'
        ]
      ],
      linkArr: [
        {
          label: '不使用连麦',
          value: 0
        },
        {
          label: '1v1',
          value: 1
        },
        {
          label: '1v2',
          value: 2
        },
        {
          label: '1v3',
          value: 3
        },
        {
          label: '1v4',
          value: 4
        },
        {
          label: '1v5',
          value: 5
        },
        {
          label: '1v6',
          value: 6
        },
        {
          label: '1v7',
          value: 7
        },
        {
          label: '1v8',
          value: 8
        },
        {
          label: '1v9',
          value: 9
        },
        {
          label: '1v10',
          value: 10
        },
        {
          label: '1v11',
          value: 11
        },
        {
          label: '1v12',
          value: 12
        },
        {
          label: '1v13',
          value: 13
        },
        {
          label: '1v14',
          value: 14
        },
        {
          label: '1v15',
          value: 15
        },
        {
          label: '1v16',
          value: 16
        }
      ],
      livescene: [],
      tempData: [],
      assistantData: [],
      guestData: [],
      addrules: {
        userId: [
          {
            required: true,
            message: '请选择成员',
            trigger: 'change'
          }
        ],
        nickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ]
      },
      queryInfo: {
        pageSize: 20,
        pageNum: 1
      },
      pageTotal: 0,
      audienceForm: [],
      isTa: false, // 当前设置弹框是否编辑助教
      rowId: '', // 暂存 doSet执行 行数据的id
      downloadTableList: [],
      listLoading: true,
      listQuery: {
        total: 0,
        pageNum: 1, // page: 1,
        pageSize: 20 // limit: 20
      }
    }
  },
  created () {
    this.form.liveChannelId = this.$route.query.id
    console.log(this.form.liveChannelId)
  },
  computed: {
    // sceneText () {
    //   let text1 = ''
    //   text1 = this.livescene.find(item => item.sceneCode == this.form.newScene).sceneName
    //   let text2 = ''
    //   text2 = this.tempData.find(item => item.dictDataValue == this.form.template).dictDataName
    //   let text3 = ''
    //   text3 = this.linkArr.find(item => item.value == this.form.linkMicLimit).label
    //   return text1 + '|' + text2 + '|' + text3
    // }
  },
  mounted () {
    this.getInfo()
    this.getliverolelist()
    this.getlivescene()
    this.getDict()
    this.ORG_USER_GET()
    this.getLiveAudiences()
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    backClick () {
      window.history.back()
    },
    editLive () {
      // 编辑直播
      this.$router.push({
        path: 'live_create',
        query: {
          id: this.$route.query.id,
          jumpUrlType: 1
        }
      })
      console.log(row)
    },
    pcChange (value) {
      // 直播弹框 PC门户 下拉选择
      this.pcUrl = value
    },
    copyUrl (url) {
      // 复制直播链接
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
    handleClick (value) {
      // 直播弹框tab切换
      this.liveurlCurrent = value.index
      console.log(value.index)
    },
    liveLink () {
      // 直播链接
      this.liveLinkDialog = true
      this.$api
        .QUERY_LIVE_LINK({
          liveChannelId: this.$route.query.id,
          viewCondition: this.form.viewCondition
        })
        .then((res) => {
          if (res.code === '1') {
            this.getLiveUrl = res.data
            this.pcOptions = this.getLiveUrl.audienceChannelUrlList.map(
              (item) => {
                return {
                  label: item.terminalName,
                  value: item.audienceChannelUrl
                }
              }
            )
          } else {
            this.$message.warning(res.msg)
          }
        })
    },
    onSubmit () {
      this.$refs.formRules.validate((valid) => {
        if (valid) {
          let code = ''
          if (this.viewCondition == 2) {
            code = this.verificationCode
          }
          this.$api
            .UPDATE_LIVE_VIEWCONDITION({
              liveChannelId: this.form.liveChannelId,
              viewCondition: this.viewCondition,
              verificationCode: code
            })
            .then((res) => {
              this.$notify({
                title: '提示',
                message: '保存成功!',
                type: 'success'
              })
            })
        } else {
          return false
        }
      })
    },
    validName () {
      if (this.title.length > 20) {
        this.title = this.title.slice(0, 20)
      }
    },
    validCode () {
      if (this.verificationCode.length > 8) {
        this.verificationCode = this.verificationCode.slice(0, 8)
      }
    },
    change (val) {
      console.log(val)
    },
    uploadComplete (params) {
      this.imgUploadDialog = false
      this.form.channelLogoImage = params.url
      console.log('文件上传完成：{}', params)
    },
    uploadImg () {
      this.imgUploadDialog = true
      this.$nextTick((params) => {
        this.$refs.pictureResourceUploader.clearFiles()
      })
    },
    addAudience (type) {
      // 导入观众 弹框
      this.memberType = type
      this.dialogAudience = true
      this.$refs.ImportAudience.show(this.$route.query.id)
    },
    updataRule () {
      // 更新课时规则
      this.loading = true
      this.$api
        .QUERY_UPDATE_RULE({
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          this.loading = false
          if (res.code === '1') {
            this.$notify({
              title: '提示',
              message: '更新成功',
              type: 'success'
            })
          } else {
            this.$message.warning(res.msg)
          }
        })
        .catch((res) => {
          this.loading = false
        })
    },
    handleCanel () {
      this.dialogAudience = false
    },
    uploadClick (form) {
      const formdata = new FormData() // 创建form对象
      formdata.append('liveChannelId', this.$route.query.id)
      formdata.append('file', form.file)
      formdata.append('importType', this.memberType)
      this.$api
        .QUERY_LIVE_AUDIENCE(formdata)
        .then((res) => {
          this.dialogAudience = false
          if (res.code === '1') {
            this.$notify({
              title: '提示',
              message: '导入成功',
              type: 'success'
            })
            this.getLiveAudiences()
          } else {
            this.$message.warning(res.msg)
          }
        })
        .catch((res) => {
          this.dialogAudience = false
        })
    },
    handleCanel () {
      this.dialogAudience = false
    },
    // 当pagesize（每页显示的数据条数）改变时
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getLiveAudiences()
    },
    // 当pagenum（当前页码值）改变时
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getLiveAudiences()
    },
    getInfo () {
      this.$api
        .getchannelbaseinfo({
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          this.form = res.data
          this.backform = res.data
          this.viewCondition = res.data.viewCondition // 观看添加类型
          this.verificationCode = res.data.verificationCode
            ? res.data.verificationCode
            : ''
          if (res.data.playBackType == 0) {
            // 0关闭 1打开
            this.liveSwitch = false
          } else {
            this.liveSwitch = true
          }
        })
    },
    doChange (flag) {
      if (flag) {
        this.backform.playBackType = 1
      } else {
        this.backform.playBackType = 0
      }
    },
    doSet (row, title, isTa) {
      // 添加助教标识
      if (isTa === undefined) {
        this.isTa = false
      } else {
        this.isTa = isTa
        if (row === 0) {
          this.permissionsList = {
            isPaging: false,
            isNotice: false,
            isSignIn: false,
            isVote: false
          }
        } else {
          const { isPaging, isNotice, isSignIn, isVote } = row
          this.permissionsList = {
            isPaging,
            isNotice,
            isSignIn,
            isVote
          }
        }
      }

      // 添加行数据id标识
      this.rowId = ''
      if (row?.id) {
        this.rowId = row.id + ''
      }

      this.dialogtitle = title
      this.dialog = true
      if (row) {
        this.addform = cloneDeep(row)
        this.dialogtype = '设置'
      } else {
        this.addform = {
          liveChannelId: this.$route.query.id,
          roleType: title == '嘉宾' ? 3 : 2
        }
        this.dialogtype = '添加'
      }
    },
    doDel (row) {
      this.$api
        .delliverole({
          liveRoleId: row.liveRoleId
        })
        .then((res) => {
          this.$notify({
            title: '提示',
            message: '删除成功!',
            type: 'success'
          })
          this.getliverolelist()
        })
    },
    onSubmitBack () {
      this.$api
        .editplayback({
          liveChannelId: this.form.liveChannelId,
          liveSwitch: this.backform.liveSwitch,
          playBackType: this.backform.playBackType,
          playBackUrl: this.backform.playBackUrl
        })
        .then((res) => {
          this.$notify({
            title: '提示',
            message: '保存成功!',
            type: 'success'
          })
        })
    },
    onSubmitBase () {
      this.$api
        .editchannelbaseinfo({
          liveChannelId: this.form.liveChannelId,
          compere: this.form.compere,
          channelLogoImage: this.form.channelLogoImage,
          remarkUrl: this.form.remarkUrl
        })
        .then((res) => {
          this.$notify({
            title: '提示',
            message: '保存成功!',
            type: 'success'
          })
        })
    },
    submitForm () {
      this.addform.userName = this.$refs.mamber.selectedLabel
      const id = this.rowId
      const form = Object.assign({}, this.addform)
      // const isTa = this.isTa
      // const request = isTa ? Object.assign(form, this.permissionsList) : form

      if (id) {
        // request.id = id
        form.id = id
      }
      this.$refs.addform.validate((valid) => {
        if (valid) {
          this.$api
            .addliverole({
              // ...request
              ...form
            })
            .then((res) => {
              if (res.code === '1') {
                this.$notify({
                  title: '提示',
                  message: res.msg,
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '提示',
                  message: res.msg,
                  type: 'warning'
                })
              }
              this.getliverolelist()
              this.dialog = false
            })
            .catch((_err) => {
              this.$notify({
                title: '提示',
                message: '接口异常，请联系管理员:  )',
                type: 'warning'
              })
              this.getliverolelist()
              this.dialog = false
            })
        }
      })
    },
    getLiveAudiences () {
      this.$api
        .GET_LIVE_AUDIEBCES({
          ...this.queryInfo,
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          if (!res) {
            res = []
          }
          if (res.code === '1') {
            this.audienceForm = res.data.list
            this.pageTotal = res.data.total
          }
        })
    },
    // 上传
    handleAvatarSuccess (val) {
      if (val.code === '1') {
        this.addform.roleHeadImg = val.data
        this.$forceUpdate()
        this.$notify({
          title: '提示',
          message: '上传成功!',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: val.msg,
          type: 'warning'
        })
      }
    },
    ORG_USER_GET () {
      this.$api
        .ORG_USER_GET({
          pageNum: 1,
          pageSize: 1000
        })
        .then((res) => {
          this.memberArr = res.data.list
        })
    },
    getlivescene () {
      this.$api.getlivescene().then((res) => {
        this.livescene = res.data
      })
    },
    getDict () {
      this.$api
        .SETTING_GET_DICT({
          typeCode: 'live_template'
        })
        .then((res) => {
          this.tempData = res.data
        })
    },
    getlivescene () {
      this.$api.getlivescene().then((res) => {
        this.livescene = res.data
      })
    },
    getDict () {
      this.$api
        .SETTING_GET_DICT({
          typeCode: 'live_template'
        })
        .then((res) => {
          this.tempData = res.data
        })
    },
    getliverolelist () {
      this.$api
        .getliverolelist({
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          this.teacherData = res.data.filter((res) => res.roleType == 1)
          this.assistantData = res.data.filter((res) => res.roleType == 2)
          this.guestData = res.data.filter((res) => res.roleType == 3)
        })
    },
    // 上传
    handleAvatarSuccess (val) {
      if (val.code === '1') {
        this.addform.roleHeadImg = val.data
        this.$forceUpdate()
        this.$notify({
          title: '提示',
          message: '上传成功!',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: val.msg,
          type: 'warning'
        })
      }
    },
    ORG_USER_GET () {
      this.$api
        .ORG_USER_GET({
          pageNum: 1,
          pageSize: 1000
        })
        .then((res) => {
          this.memberArr = res.data.list
        })
    },
    getLiveAudiences () {
      this.$api
        .GET_LIVE_AUDIEBCES({
          ...this.queryInfo,
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          if (!res) {
            res = []
          }
          if (res.code === '1') {
            this.audienceForm = res.data.list
            this.pageTotal = res.data.total
          }
        })
    },
    uploadClick (form) {
      const formdata = new FormData() // 创建form对象
      formdata.append('liveChannelId', this.$route.query.id)
      formdata.append('file', form.file)
      formdata.append('importType', this.memberType)
      this.$api
        .QUERY_LIVE_AUDIENCE(formdata)
        .then((res) => {
          this.dialogAudience = false
          if (res.code === '1') {
            this.$notify({
              title: '提示',
              message: '导入成功',
              type: 'success'
            })
            this.getLiveAudiences()
          } else {
            this.$message.warning(res.msg)
          }
        })
        .catch((res) => {
          this.dialogAudience = false
        })
    },
    doChange (flag) {
      if (flag) {
        this.backform.playBackType = 1
      } else {
        this.backform.playBackType = 0
      }
    },
    handleCanel () {
      this.dialogAudience = false
    },
    uploadClick (form) {
      const formdata = new FormData() // 创建form对象
      formdata.append('liveChannelId', this.$route.query.id)
      formdata.append('file', form.file)
      formdata.append('importType', this.memberType)
      this.$api
        .QUERY_LIVE_AUDIENCE(formdata)
        .then((res) => {
          this.dialogAudience = false
          if (res.code === '1') {
            this.$notify({
              title: '提示',
              message: '导入成功',
              type: 'success'
            })
            this.getLiveAudiences()
          } else {
            this.$message.warning(res.msg)
          }
        })
        .catch((res) => {
          this.dialogAudience = false
        })
    },
    getLiveAudiences () {
      this.$api
        .GET_LIVE_AUDIEBCES({
          ...this.queryInfo,
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          if (!res) {
            res = []
          }
          if (res.code === '1') {
            this.audienceForm = res.data.list
            this.pageTotal = res.data.total
          }
        })
    },
    // 上传
    handleAvatarSuccess (val) {
      if (val.code === '1') {
        this.addform.roleHeadImg = val.data
        this.$forceUpdate()
        this.$notify({
          title: '提示',
          message: '上传成功!',
          type: 'success'
        })
      } else {
        this.$notify({
          title: '提示',
          message: val.msg,
          type: 'warning'
        })
      }
    },
    ORG_USER_GET () {
      this.$api
        .ORG_USER_GET({
          pageNum: 1,
          pageSize: 1000
        })
        .then((res) => {
          this.memberArr = res.data.list
        })
    },
    getlivescene () {
      this.$api.getlivescene().then((res) => {
        this.livescene = res.data
      })
    },
    getDict () {
      this.$api
        .SETTING_GET_DICT({
          typeCode: 'live_template'
        })
        .then((res) => {
          this.tempData = res.data
        })
    },
    getliverolelist () {
      this.$api
        .getliverolelist({
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          this.teacherData = res.data.filter((res) => res.roleType == 1)
          this.assistantData = res.data.filter((res) => res.roleType == 2)
          this.guestData = res.data.filter((res) => res.roleType == 3)
        })
    },
    getliverolelist () {
      this.$api
        .getliverolelist({
          liveChannelId: this.$route.query.id
        })
        .then((res) => {
          this.teacherData = res.data.filter((res) => res.roleType == 1)
          this.assistantData = res.data.filter((res) => res.roleType == 2)
          this.guestData = res.data.filter((res) => res.roleType == 3)
        })
    },
    doChange (flag) {
      if (flag) {
        this.backform.playBackType = 1
      } else {
        this.backform.playBackType = 0
      }
    },
    handleCanel () {
      this.dialogAudience = false
    },
    uploadClick (form) {
      const formdata = new FormData() // 创建form对象
      formdata.append('liveChannelId', this.$route.query.id)
      formdata.append('file', form.file)
      formdata.append('importType', this.memberType)
      this.$api
        .QUERY_LIVE_AUDIENCE(formdata)
        .then((res) => {
          this.dialogAudience = false
          if (res.code === '1') {
            this.$notify({
              title: '提示',
              message: '导入成功',
              type: 'success'
            })
            this.getLiveAudiences()
          } else {
            this.$message.warning(res.msg)
          }
        })
        .catch((res) => {
          this.dialogAudience = false
        })
    },
    getSceneName () {
      console.log(this.livescene)

      return this.livescene.filter(
        (res) => res.sceneCode == this.form.newScene
      )[0]?.sceneName
    },
    getDictDataName () {
      return this.tempData.filter(
        (res) => res.dictDataValue == this.form.template
      )[0]?.dictDataName
    },
    getLinkLabel () {
      return this.linkArr.filter(
        (res) => res.value == this.form.linkMicLimit
      )[0]?.label
    },
    // 直播设置 - 更新课时认定规则
    handleClickUpdateClassRules () {
      // /live/updateliveplandurationratio?liveChannelId=
      const liveChannelId = this.form.liveChannelId
      this.$api
        .QUERY_UPDATE_RULE({ liveChannelId })
        .then((res) => {
          if (res.code === '1') {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'warning'
            })
          }
        })
        .catch((_err) => {
          this.$notify({
            title: '提示',
            message: '接口异常，请联系管理员:  )',
            type: 'warning'
          })
        })
    },
    // 回放视频下载
    handleClickPlayBackDownload () {
      this.Downloading = true
      this.getList()
    },
    getList () {
      const pageNum = this.listQuery.pageNum
      const pageSize = this.listQuery.pageSize

      this.listLoading = true
      this.$api
        .PLAYBACK_FILE_DOWNLOAD({ pageNum, pageSize })
        .then((res) => {
          this.listQuery.pageNum = res.data.currentPage
          this.listQuery.pageSize = res.data.pageSize
          this.listQuery.total = res.data.total
          this.downloadTableList = res.data.list
          this.listLoading = false
        })
    },
    downFile (url) {
      downFile(url)
    }
  }
}
</script>

<style lang="scss" scoped>
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

.setting-container {
  display: flex;
  margin-bottom: 20px;

  .edit-live-btn {
    flex: 1;
    text-align: right;
  }

  .img {
    margin-right: 20px;

    img {
      width: 250px;
      height: 150px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .content-title {
      font-weight: bold;

      .live-url {
        text-decoration: underline;
      }
    }
  }
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

.classImg {
  cursor: pointer;
  width: 140px;
  height: 140px;

  img {
    width: 140px;
    height: 140px;
  }
}
</style>
