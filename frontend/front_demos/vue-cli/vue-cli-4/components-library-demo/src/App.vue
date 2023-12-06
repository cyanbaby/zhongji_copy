<template>
  <div id="app">
    <!-- 需要设置设计器高度 -->
    <!-- <fm-making-form style="height: 500px" preview generate-code generate-json>
    </fm-making-form> -->
    <div>{{ list }}</div>

    <div>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button @click="allAlign = 'left'">居左</vxe-button>
          <vxe-button @click="allAlign = 'center'">居中</vxe-button>
          <vxe-button @click="allAlign = 'right'">居右</vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-table :align="allAlign" :data="tableData">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
      </vxe-table>
    </div>

    <div>
      <vxe-form
        title-colon
        ref="formRef"
        title-align="right"
        title-width="100"
        :data="formData"
        :rules="formRules"
        :loading="loading"
        @submit="submitEvent"
        @reset="resetEvent"
      >
        <vxe-form-gather span="12">
          <vxe-form-item title="名称" field="name" span="24"></vxe-form-item>
          <vxe-form-item title="昵称" span="24">
            <template #title>
              <span style="color: red">自定义标题</span>
            </template>
            <template #default="{ data }">
              <span>自定义 {{ data.nickname }}</span>
            </template>
          </vxe-form-item>
          <vxe-form-item
            title="标题貌似有点长呢"
            field="sex"
            span="24"
            :item-render="{}"
            title-overflow
          >
            <template #default="params">
              <vxe-select
                v-model="params.data.sex"
                placeholder="请选择性别"
                clearable
                @change="changeEvent(params)"
              >
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item
            title="标题貌似有点长呢"
            field="age"
            span="24"
            :item-render="{}"
            title-overflow="title"
          >
            <template #default="params">
              <vxe-input
                v-model="params.data.age"
                type="integer"
                placeholder="请输入年龄"
                clearable
                @change="changeEvent(params)"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            title="标题貌似有点长呢"
            field="date"
            span="24"
            :item-render="{}"
            title-overflow="ellipsis"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.date"
                type="date"
                placeholder="请选择日期"
                clearable
              ></vxe-input>
            </template>
          </vxe-form-item>
        </vxe-form-gather>
        <vxe-form-gather span="12">
          <vxe-form-item
            title="标题貌似有点长呢标题貌似有点长呢"
            field="address"
            span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-textarea
                v-model="data.address"
                placeholder="请输入地址"
                size="medium"
                clearable
              ></vxe-textarea>
            </template>
          </vxe-form-item>
        </vxe-form-gather>
        <vxe-form-item align="center" span="24">
          <template #default>
            <vxe-button
              type="submit"
              status="primary"
              content="基本表单"
            ></vxe-button>
            <vxe-button type="reset" content="重置"></vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </div>

    <div>
      <el-table :data="elementTableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>

    <div style="height: 1000px">
      <MakingFormSignup
        ref="makingForm"
        clearable
        upload
        preview
        generate-code
        generate-json
        :global-config="globalConfig"
        cache
        :init-from-template="initFromTemplate"
        :field-models="fieldModels"
        :base-url="baseUrl"
        :base-headers="baseHeaders"
      >
        <el-button
          slot="action"
          class="el-button el-button--text el-button--default"
        >
          <i class="iconfont icon-sync1"></i>
          保存1</el-button
        >
      </MakingFormSignup>
    </div>

    <div style="height: 800px;overflow:hidden;">
      <ckeditor5
        ref="ckeditor5"
        :inputOption1="inputOption1"
        :inputOption2="inputOption2"
      >
      </ckeditor5>
    </div>

    <div>
      <div id="main" style="width: 600px; height: 400px"></div>
    </div>

    <div>
      <pdf src="https://static.peixunyun.cn/1635824385392779264_213d5fdd-4a66-46f6-82f7-6f92c3863c87.pdf" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { chunk } from 'lodash'
// import _ from 'lodash'
import { VXETable } from 'vxe-table'

import { MakingForm as MakingFormSignup } from '@jjy-npm/form-making-signup'
import '@jjy-npm/form-making-signup/dist/FormMaking.css'

import ckeditor5 from '@/components/ckeditor5/ckeditor5.vue'

// import pdf from 'vue-pdf'
import pdf from '@/components/pdf/dist/pdf.umd.js'
console.log(pdf)

export default {
  name: 'App',
  components: {
    MakingFormSignup,
    ckeditor5,
    pdf
  },
  data() {
    return {
      // list: []
      list: ['a', 'b', 'c', 'd'],

      // vxe-table
      allAlign: null,
      tableData: [
        {
          id: 10001,
          name: 'Test1',
          role: 'Develop',
          sex: 'Man',
          age: 28,
          address: 'test abc'
        },
        {
          id: 10002,
          name: 'Test2',
          role: 'Test',
          sex: 'Women',
          age: 22,
          address: 'Guangzhou'
        },
        {
          id: 10003,
          name: 'Test3',
          role: 'PM',
          sex: 'Man',
          age: 32,
          address: 'Shanghai'
        },
        {
          id: 10004,
          name: 'Test4',
          role: 'Designer',
          sex: 'Women',
          age: 24,
          address: 'Shanghai'
        }
      ],

      // vxe-form start
      loading: false,
      formData: {
        name: 'test1',
        nickname: 'Testing',
        sex: '',
        age: 26,
        date: '',
        address: '左右布局'
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        sex: [{ required: true, message: '请选择性别' }],
        age: [
          { required: true, message: '请输入年龄' },
          {
            validator({ itemValue }) {
              // 自定义校验
              if (Number(itemValue) > 35 || Number(itemValue) < 18) {
                return new Error('年龄在 18 ~ 35 之间')
              }
            }
          }
        ],
        date: [{ required: true, message: '必填校验' }]
      },
      // ve-form end

      // element-ui table start
      elementTableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // element-ui table end

      // from-making-siginup start
      globalConfig: {
        dataSource: [
          {
            key: 'upload',
            name: 'Get Upload Token',
            url: 'https://tools-server.making.link/api/uptoken',
            method: 'GET',
            auto: true,
            responseFunc: 'return res.uptoken;'
          },
          {
            key: 'getoptions',
            name: 'Get Options',
            url: 'https://tools-server.making.link/api/new/options',
            method: 'GET',
            auto: true,
            responseFunc: 'return res.data;'
          }
        ]
      },
      initFromTemplate: false,

      fieldModels: [
        { fieldId: 'name', fieldLabel: '用户姓名(name)' },
        { fieldId: 'sex', fieldLabel: '用户性别(sex)' },
        { fieldId: 'mobile', fieldLabel: '手机(mobile)' },
        { fieldId: 'id_card', fieldLabel: '身份证号(id_card)' },
        { fieldId: 'email', fieldLabel: '电子邮箱(email)' },
        { fieldId: 'area', fieldLabel: '所在地区(area)' },
        { fieldId: 'company_job', fieldLabel: '工作单位(company_job)' },
        { fieldId: 'work_years', fieldLabel: '工作年限(work_years)' },
        { fieldId: 'political_text', fieldLabel: '政治面貌(political_text)' },
        { fieldId: 'degree_text', fieldLabel: '学历(degree_text)' },
        { fieldId: 'specialty', fieldLabel: '所学专业(specialty)' },
        { fieldId: 'photo_url', fieldLabel: '个人照片(photo_url)' },
        { fieldId: 'front_id_card', fieldLabel: '身份证正面(front_id_card)' },
        {
          fieldId: 'reverse_id_card',
          fieldLabel: '身份证反面(reverse_id_card)'
        },
        { fieldId: 'post_code', fieldLabel: '邮政编码(post_code)' },
        { fieldId: 'address', fieldLabel: '通讯地址(address)' },
        {
          fieldId: 'company_job_org_id',
          fieldLabel: '工作单位所在组织(company_job_org_id)'
        },
        { fieldId: 'weixin', fieldLabel: '微信号(weixin)' },
        { fieldId: 'company_name', fieldLabel: '单位名称(company_name)' },
        { fieldId: 'tool', fieldLabel: '新媒体账号(tool)' },
        { fieldId: 'credit_code', fieldLabel: '统一社会信用代码(credit_code)' },
        {
          fieldId: 'singleselect_nganqbj7',
          fieldLabel: '报名人类型(singleselect_nganqbj7)'
        }
      ],
      baseUrl: 'http://localhost/api',
      baseHeaders: {
        Authorization: '69a0803a714b49dd9063ae3789cec327',
        OpDomain: 'o01.universitycloud.cn',
        OpDomainCode: 'org'
      },
      // from-making-siginup end

      // ckeditor5 start
      inputOption1: [],
      inputOption2: []
      // ckeditor5 end
    }
  },
  created() {
    this.list = chunk(['a', 'b', 'c', 'd'], 2)
    // this.list = _.chunk(['a', 'b', 'c', 'd'], 2);
  },

  methods: {
    // vxe-form start
    changeEvent(params) {
      const $form = this.$refs.formRef
      if ($form) {
        $form.updateStatus(params)
      }
    },
    submitEvent() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        VXETable.modal.message({ content: '保存成功', status: 'success' })
      }, 1000)
    },
    resetEvent() {
      VXETable.modal.message({ content: '重置事件', status: 'info' })
    },
    // vxe-form end

    // echarts
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: 'ECharts 示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>

<style>
@import url(./app.css);
</style>