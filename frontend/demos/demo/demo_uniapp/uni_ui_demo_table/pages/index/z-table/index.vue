<template>
  <view class="z-table">
    <scroll-view
      scroll-x="true"
      scroll-left="0"
      scroll-anchoring="true"
      class="z-table__scroll"
    >
      <view>
        <view :style="{ width: '1000px' }" class="z-table__box">
          <view class="z-table__header">
            <view
              v-for="(th, thIndex) in columns"
              :key="thIndex"
              class="z-table__th z-table__cell"
              :style="{ width: th.width + 'px' }"
            >
              {{ th.title }}
            </view>
          </view>
          <view class="z-table__body">
            <view
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              class="z-table__tr"
              :style="{  position: 'relative' }"
            >
              <view
                v-for="(column, columnIndex) in columns"
                :key="columnIndex"
                class="z-table__td z-table__cell"
                :style="{
                  width: column.width + 'px',
                  height: (merge.get(columnIndex + '__postion__' + rowIndex).rowspan * 40)+'px',
                  padding: merge.get(columnIndex + '__postion__' + rowIndex).rowspan === 0 ? '0px 10px' : '8px 10px'
                }"
              >
                <view :style="{ position: 'absolute' }">{{ row[column.key] }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
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
      default: function () {
        return [];
      },
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      },
    },
    merge: {
      type: Map,
      default: null,
    },
    mergeChanged: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.columns);
  },
  watch: {
    mergeChanged(newVal) {
      this.$forceUpdate()
    },
  },
};
</script>

<style lang="scss">
.z-table {
  width: 100%;
  // border: 1px solid #ccc;  // 颜色用props写死
  &__box {
  }
  &__scroll {
    margin: 5px;
    border: 1px #ebeef5 solid;
  }

  &__header,
  &__tr {
    display: flex;
  }
  &__tr {
    border-bottom: 1px #ebeef5 solid;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  &__cell {
    padding: 8px 10px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
    // line-height: 23px;
    box-sizing: border-box;
    border-right: 1px #ebeef5 solid;
  }
  &__cell.z-table__th {
    border-bottom: 1px #ebeef5 solid;
  }
  &__th {
    font-size: 14px;
    font-weight: bold;
    color: #909399;
  }
}
</style>
