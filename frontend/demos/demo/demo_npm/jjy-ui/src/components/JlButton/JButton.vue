<template>
  <button class="el-button" :class="buttonClass">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    name: 'JlButton',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      buttonClass() {
        return [
          `el-button--${this.type}`,
          this.size && `el-button--${this.size}`,
          this.disabled && 'is-disabled'
        ]
      }
    }
  }
</script>
<style>
  .el-button {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
  }
  .el-button--primary {
    background-color: #409EFF;
    color: #fff;
    border-color: #409EFF;
  }
  .el-button--success {
    background-color: #67C23A;
    color: #fff;
    border-color: #67C23A;
  }
  .el-button--warning {
    background-color: #E6A23C;
    color: #fff;
    border-color: #E6A23C;
  }
  .el-button--danger {
    background-color: #F56C6C;
    color: #fff;
    border-color: #F56C6C;
  }
  .el-button--small {
    font-size: 12px;
    padding: 8px 16px;
  }
  .el-button--mini {
    font-size: 10px;
    padding: 6px 12px;
  }
  .is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
