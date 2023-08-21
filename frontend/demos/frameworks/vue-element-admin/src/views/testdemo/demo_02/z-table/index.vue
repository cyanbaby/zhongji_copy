<template>
  <div class="z-table">
    <div class="z-table__header">
      <div
        v-for="(th, thIndex) in columns"
        :key="thIndex"
        class="z-table__th z-table__cell"
        :style="{ width: th.width + 'px' }"
      >
        {{ th.title }}
      </div>
    </div>
    <div class="z-table__body">
      <div v-for="(row, rowIndex) in data" :key="rowIndex" class="z-table__tr">
        <div
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="z-table__td z-table__cell"
          :style="{ width: column.width + 'px' }"
        >
          {{ row[column.key] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO
// 1. 所有边框颜色用props传递  或者sass先写死
// 2. 列宽必须传递 所有行固定住的同一列固定住 暂不不考虑合并的情况
// 3. 可以考虑留插槽 指定index那种 使用input
// 4. 表头先不考虑合并

export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    columns: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  created() {
    console.log(this.columns)
  }
}
</script>

<style lang="scss">
.z-table {
  width: 100%;
  // border: 1px solid #ccc;  // 颜色用props写死
  &__header,
  &__body {
    display: flex;
  }
}
</style>
