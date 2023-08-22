<template>
  <div class="fiexd-container">
    <div style="width: 100%; height: 100%">
      <div class="func-rank func-rank--19CAAD">
        <div>
          <el-link type="primary" :underline="false" style="margin-right: 15px; font-weight: bold;">setup-1</el-link>
          <el-link type="success" :underline="false" style="font-weight: bold;">rank-1</el-link>
        </div>
        <dl>
          <dt>数据</dt>
          <dd>
            <span>str:</span>
            <span>{{ str }}</span>
          </dd>
        </dl>
        <dl>
          <dt>操作</dt>
          <dd>
            <el-button @click="changeStr">Change Str</el-button>
          </dd>
        </dl>

        <rank2 :str="str" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import rank2 from './ranks/rank-2.vue'

export default {
  name: 'setup1Func',
  components: {
    rank2
  },
  setup(props, context) {
    const str = ref('你好世界')
    const changeStr = () => {
      str.value = str.value === '你好世界' ? 'Hello World' : '你好世界'
    }
    return {
      str,
      changeStr
    }
  }
}
</script>

<style lang="scss" scoped>
.func-rank {
  padding: 10px;
  border-width: 2px;
  border-style: dashed;

  &--19CAAD {
    position: relative;
    border-color: #19caad;
    height: 100%;
    box-sizing: border-box;
  }
}

.fiexd-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
