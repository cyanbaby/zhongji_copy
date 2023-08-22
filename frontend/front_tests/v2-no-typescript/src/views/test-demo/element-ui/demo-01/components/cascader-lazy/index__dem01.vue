<template>
  <div>
    <dl>
      <dt>解决 el-cascader 卡死</dt>
      <dd></dd>
    </dl>
    <div>
      <div class="box-shadow--blue">
        <el-cascader :props="props" @change="handleChange"></el-cascader>
      </div>
    </div>
  </div>
</template>

<script>
//*
import { getCity } from '@/api'

function treeFind(tree, func) {
  for (const data of tree) {
    if (func(data)) return data
    if (data.children) {
      const res = treeFind(data.children, func)
      if (res) return res
    }
  }
  return null
}
// */

// let id = 0

export default {
  name: 'TestElementUiDemo01View',
  data() {
    return {
      cityList: [],
      cityValue: [],

      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          /*
          console.group('node')
          console.log(node)
          console.groupEnd()
          // */

          /*
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map((item) => ({
              value: ++id,
              label: `选项${id}`,
              leaf: false
            }))
            console.group('nodes')
            console.log(nodes)
            console.groupEnd()
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
          // */

          //*
          console.group('node')
          console.log(node)
          console.groupEnd()
          const { level } = node
          // todo 不用leval 判断
          // todo 缓存 res 不过多请求
          if (level === 0) {
            getCity().then((res) => {
              const list = res.map((item) => {
                return {
                  value: item.areaCode,
                  label: item.name,
                  leaf: !item.children
                }
              })
              resolve(list)
            })
          } else {
            // todo node
            getCity().then((res) => {
              const findResult = treeFind(
                res,
                (data) => data.areaCode === node.value
              )
              if (findResult.children) {
                resolve(
                  findResult.children.map((item) => {
                    return {
                      value: item.areaCode,
                      label: item.name,
                      leaf: !item.children
                    }
                  })
                )
              } else {
                resolve([])
              }
            })
          }
          // */
        }
      }
    }
  },
  created() {
    // getCity().then((res) => {
    //   // console.log(res)
    //   this.cityList = res
    // })
  },
  mounted() {

  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        const dom = document.getElementsByClassName('el-radio is-checked')[0]
        const brother = dom.nextElementSibling
        brother.click()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-shadow--blue {
  padding: 6px;
  border: 1px dashed #409eff;
  border-radius: 6px;
}
</style>
