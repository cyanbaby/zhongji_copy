<template>
  <div>
    <dl>
      <dt>演示 el-cascader 卡死</dt>
      <dd>
        <el-button type="primary" size="small" @click="handleClickAdd">
          新增
        </el-button>
      </dd>
    </dl>
    <div>
      <div class="box-shadow--blue" v-for="city in cityCtrol" :key="city.id">
        <el-cascader
          v-model="city.cityValue"
          :options="city.cityList"
          :props="{
            value: 'areaCode',
            label: 'name',
            checkStrictly: true
          }"
          clearable
        />
        {{ city.cityValue }}
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { getCity } from '@/api'

export default {
  name: 'CascaderMemoryOverflow',
  data() {
    return {
      cityCtrol: [],
      cityJson: []
    }
  },
  created() {
    getCity().then((res) => {
      this.cityJson = res
      this.cityCtrol.push({ cityList: this.cityJson, cityValue: [], id: uuidv4() })
    })
  },
  methods: {
    uuidv4,
    handleClickAdd() {
      this.cityCtrol.push({ cityList: this.cityJson, cityValue: [], id: uuidv4() })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-shadow--blue {
  margin: 6px;
  padding: 6px;
  border: 1px dashed #409eff;
  border-radius: 6px;
}
</style>
