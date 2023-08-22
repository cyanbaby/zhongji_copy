<template>
  <div>
    <dl>
      <dt>解决 el-cascader 卡死</dt>
      <dd></dd>
    </dl>
    <div>
      <div class="box-shadow--blue">
        <el-cascader
          v-model="cityValue"
          :props="props"
          @change="handleChange"
        ></el-cascader>
        {{ cityValue }}
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
  name: 'CascaderLazy',
  data() {
    return {
      cityList: [],
      cityValue: [],

      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          setTimeout(() => {
            alert(1)
            if (node.root) {
              getCity().then((res) => {
                this.cityList = res.length ? res : []
                resolve(
                  this.cityList.map((item) => {
                    return {
                      value: item.areaCode,
                      label: item.name,
                      leaf: !item.children
                    }
                  })
                )
              })
            } else {
              const findResult = treeFind(
                this.cityList,
                (data) => data.areaCode === node.value
              )
              const options = findResult?.children?.length
                ? findResult.children
                : []
              resolve(
                options.map((item) => {
                  return {
                    value: item.areaCode,
                    label: item.name,
                    leaf: !item.children
                  }
                })
              )
            }
          }, 1000)
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
  mounted() {},
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
