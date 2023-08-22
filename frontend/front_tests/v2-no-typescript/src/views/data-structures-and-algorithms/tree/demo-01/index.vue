<template>
  <div>
    <dl>
      <dt>城市树</dt>
      <dd>
        <el-button type="primary" size="small"> 查询 </el-button>

        <el-button type="primary" size="small" @click="findCity(110000000000)"> 查询顶级 first </el-button>
        <el-button type="primary" size="small" @click="findCity(710000000000)"> 查询顶级 last </el-button>

        <!-- <el-button type="primary" size="small"> 查询中间 first</el-button>
        <el-button type="primary" size="small"> 查询中间 last</el-button> -->

        <el-button type="primary" size="small" @click="findCity(450801000000)"> 查询叶子</el-button>
        <el-button type="primary" size="small" @click="findEmptyCity(450801000000)"> 查询空树</el-button>
      </dd>
    </dl>
    <div class="dashed-box">
      <dl>
        <dt>查询结果：</dt>
        <dd>城市 areaCode ： {{ cityObject.areaCode }}</dd>
        <dd>城市 level ： {{ cityObject.level }}</dd>
        <dd>城市 name ： {{ cityObject.name }}</dd>
      </dl>

    </div>
  </div>
</template>
<script>
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

export default {
  name: 'DataDemo01View',
  data() {
    return {
      cityList: [],
      cityValue: [],
      cityObject: {}
    }
  },
  created() {
    getCity().then((res) => {
      console.group('admin 城市数据')
      console.log(res)
      console.groupEnd()
      this.cityList = res
      // console.log(
      //   treeFind(this.cityList, (data) => data.areaCode === 110100000000)
      // )
    })
  },
  methods: {
    findCity(value) {
      let findResult = treeFind(this.cityList, (data) => data.areaCode === value)
      // parentCode
      const { areaCode, level, name } = findResult // todo 结构赋值同时组成一个新对象
      this.cityObject = { areaCode, level, name }
      // console.log(findResult)
      findResult = null
    },
    findEmptyCity(value) {
      let findResult = treeFind([], (data) => data.areaCode === value)
      console.log('findResult', findResult)
      // parentCode
      const { areaCode, level, name } = findResult // todo 结构赋值同时组成一个新对象
      this.cityObject = { areaCode, level, name }
      // console.log(findResult)
      findResult = null
    }
  }
}
</script>

<style lang="scss" scoped>
.dashed-box {
  padding: 6px;
  border: 1px dashed #409eff;
  border-radius: 6px;
}
</style>
