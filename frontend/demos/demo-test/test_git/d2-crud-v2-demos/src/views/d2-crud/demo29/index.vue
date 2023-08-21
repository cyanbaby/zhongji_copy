<template>
  <d2-container>
    <template slot="header">分页</template>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
    <el-card shadow="never" class="d2-mb">
      <d2-markdown :source="doc"/>
    </el-card>
    <el-card shadow="never" class="d2-mb">
      <d2-highlight :code="code"/>
    </el-card>
    <d2-link-btn
      slot="footer"
      title="文档"
      link="https://d2.pub/zh/doc/d2-crud-v2"/>
  </d2-container>
</template>

<script>
import '../install'
import doc from './doc.md'
import code from './code.js'
import faker from 'faker/locale/zh_CN'
import { map, random } from 'lodash'

function DEMO_BUSINESS_TABLE_1_LIST ({ pageSize = 10 } = {}) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        page: {
          total: 1000
        },
        list: map(Array(pageSize), () => ({
          key: faker.random.uuid(),
          value: [10, 100, 200, 500][random(0, 3)],
          type: faker.random.boolean(),
          admin: faker.name.firstName() + faker.name.lastName(),
          adminNote: faker.random.words(),
          dateTimeCreat: faker.date.past(),
          used: faker.random.boolean(),
          dateTimeUse: faker.date.past()
        }))
      })
    }, 1000)
  })
}

export default {
  data () {
    return {
      doc,
      code,
      columns: [
        {
          title: '卡密',
          key: 'key',
          width: 320
        },
        {
          title: '面值',
          key: 'value'
        },
        {
          title: '管理员',
          key: 'admin'
        },
        {
          title: '创建时间',
          key: 'dateTimeCreat'
        },
        {
          title: '使用时间',
          key: 'dateTimeUse'
        }
      ],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      DEMO_BUSINESS_TABLE_1_LIST({
        ...this.pagination
      }).then(res => {
        this.data = res.list
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
  }
}
</script>
