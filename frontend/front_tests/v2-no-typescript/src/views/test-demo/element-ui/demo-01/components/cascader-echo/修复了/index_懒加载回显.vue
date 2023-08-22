<template>
  <div>
    <div class="block">
      <span class="demonstration">单选选择任意一级选项</span>
      <br />
      <br />
      value {{ value }}
      <br />
      <br />
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ checkStrictly: true }"
        clearable
      ></el-cascader>

      <el-checkbox v-model="checked" style="margin-left: 15px"
        >只查看本级</el-checkbox
      >
    </div>

    <br />
    <br />
    value2 {{ value2 }}
    <br />
    <br />

    <div class="block">
      <el-cascader v-model="value2" :props="props"></el-cascader>
    </div>
  </div>
</template>

<script>
let id = 0

export default {
  name: 'TestElementUiDemo13View',
  data() {
    return {
      checked: false,
      // value: [],
      value: ['zhinan', 'shejiyuanze', 'yizhi'],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        }
      ],

      value2: [1, 2, 4],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map((item) => ({
              value: ++id,
              label: `选项${id}`,
              leaf: level >= 2
            }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  methods: {}
}
</script>
