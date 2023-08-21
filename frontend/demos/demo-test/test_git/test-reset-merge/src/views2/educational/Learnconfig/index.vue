<template>
<d2-container>
    <template slot="header">
      <span class="page-title">{{this.$route.meta.title}}-{{this.$route.query.activityName}}</span>
      <el-button type="primary" plain style="float: right;border: 1px solid #1E90FF;" size="mini" @click="back">返回</el-button>
      <!-- <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper> -->
    </template>
    <el-steps
      :active="active"
      simple
      space="150"
      finish-status="success"
    >
      <el-step
        title="课程"
      />
      <el-step
        title="直播"
      />
      <el-step
        title="文章"
      />
      <el-step
        title="学习规则"
      />
    </el-steps>
    <component
      :is="`step${active + 1}`"
      @next="val => (active = val)"
    ></component>
</d2-container>
</template>
<script>
import step1 from './components/step1'
import step2 from './components/step2'
import step3 from './components/step3'
import step4 from './components/step4'
export default {
  components: { step1, step2, step3, step4 },
  data () {
    return {
      active: 0,
      planId: ''
    }
  },
  created () {
  },
  methods: {
    // 返回
    back () {
      this.$router.push({
        path: '/educational/class'
      })
    }
  }
}
</script>
