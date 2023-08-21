<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact, 'outer-box': true }">
    <template slot="header">
      <span class="page-title">{{ this.$route.meta.title }}</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper>
    </template>

    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @editUserInfo="editUserInfo"
      @resetDialog="resetDialog"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @reset="resetClick">
          <template slot="addressCodeSearchSlot">
            <el-row class="address-box-select">
              <el-col :span="24">
                <el-cascader
                  ref="adressRef"
                  v-model="formAddress.addressCode"
                  style="width: 100%"
                  :props="props"
                  :options="areaList"
                  placeholder="请选择地址"
                  @change="adressChange"
                  filterable
                />
              </el-col>
            </el-row>
          </template>

          <template slot="startTimeSearchSlot" slot-scope="scope">
            <span style="color: #606266; padding-right: 12px">注册时间</span>
            <el-date-picker
              v-model="scope.form.startTime"
              type="date"
              placeholder="开始日期"
              style="width: 150px"
            ></el-date-picker>
            <span style="color: #888; padding: 0 5px">至</span>
            <el-date-picker
              v-model="scope.form.endTime"
              type="date"
              placeholder="结束日期"
              style="width: 150px"
            ></el-date-picker>
          </template>
        </crud-search>

        <el-button size="small" type="primary" @click="importAccountDialog = true" style="margin-bottom: 10px">
          <i class="el-icon-plus"></i>
          导入用户
        </el-button>
        <el-button size="small" type="primary" @click="exportBtn">导出</el-button>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
      </div>
      <template slot="citySlot" slot-scope="scope">
        <span>{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}{{ scope.row.street }}</span>
      </template>
    </d2-crud-x>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span style="padding: 20px; line-height: 30px; font-size: 18px; letter-spacing: 1px">
        您正在将用户{{ nickName }}的账号密码重置为Aa123456，重置成功后将会以短信形式通知该用户。
      </span>
      <span slot="footer" style="text-align: center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </span>
    </el-dialog>

    <ImportUser
      :visible.sync="importAccountDialog"
      :import-api="'PLATFORMACCOUNT_NEW_IMPORTUSER'"
      :title="'导入用户'"
    />

    <edit-account
      ref="editAccountRef"
      :info="info"
      :major-select="majorSelect"
      :address-options="areaList"
      @save="editAccount"
    />
  </d2-container>
</template>
