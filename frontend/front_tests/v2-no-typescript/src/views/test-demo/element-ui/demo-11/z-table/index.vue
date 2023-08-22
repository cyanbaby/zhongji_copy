<template>
  <div class="z-table">
    <div
      class="z-table__scroll"
    >
      <div>
        <div :style="{ width: totalWidth+'px' }" class="z-table__box">
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
            <div
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              class="z-table__tr"
              :style="{
                position: 'relative',
                height: '40px'
              }"
            >
              <div
                v-for="(column, columnIndex) in columns"
                :key="columnIndex"
                class="z-table__td z-table__cell"
                :style="{
                  width: getWidth(columnIndex, rowIndex, columns),
                  height: getHeight(columnIndex, rowIndex),
                  position: 'relative'
                }"
              >
                <div
                  v-if="
                    merge[columnIndex + '__postion__' + rowIndex].rowspan > 0 && merge[columnIndex + '__postion__' + rowIndex].colspan > 0
                  "
                  :style="{
                    zIndex: 1,
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    boxSizing: 'border-box',
                    borderRight: '0.5px #ddd solid',
                    borderBottom: '0.5px #ddd solid',
                    display: 'flex',
                    alignItems:'center'
                  }"
                  >
                      <div v-if="columnIndex === merge[columnIndex + '__postion__' + rowIndex].inputColumnIndex" style="width: 100%">
                        <div v-if="!row.isPower">{{ row[evaluate] || ''}}</div>
                        <uni-easyinput v-else class="uni-mt-5" trim="all" v-model="row.evaluate"></uni-easyinput>

                      </div>
                      <div v-else>
                        {{ row[column.key] || ''}}
                      </div>

                  </div>
                <div v-else></div>
              </div>
            </div>
          </div>
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
  name: 'ZIndex',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    merge: Object
  },
  data() {
    return {
      totalWidth: 0
    }
  },
  created() {
    const totalWidth = this.columns.reduce((pre, cur) => {
      return pre + cur.width
    }, 0)
    this.totalWidth = totalWidth
  },
  methods: {
    getWidth(columnIndex, rowIndex, columns) {
      const currentColspan = this.merge[columnIndex + '__postion__' + rowIndex].colspan
      if (currentColspan === 0) {
        return '0px'
      } else {
        let width = 0
        for (let index = 0; index < currentColspan; index++) {
          width += columns[columnIndex + index].width
        }
        return width + 'px'
      }
    },
    getHeight(columnIndex, rowIndex) {
      const currentRowspan = this.merge[columnIndex + '__postion__' + rowIndex].rowspan
      if (currentRowspan === 0) {
        return '0px'
      }
      return this.merge[columnIndex + '__postion__' + rowIndex].rowspan * 40 + 'px'
    }
  }
}
</script>

<style lang="scss">
.z-table {
  width: 100%;
  // border: 1px solid #ccc;  // 颜色用props写死
  &__box {
  }
  &__scroll {
    margin: 5px;
    // border: 1px #ebeef5 solid;
    border-left: 1px #ddd solid;
    border-right: 1px #ddd solid;
    border-top: 1px #ddd solid;
  }

  &__header,
  &__tr {
    display: flex;
  }

  &__tr {
    // border-bottom: 1px #ebeef5 solid;

    // border-bottom: 0.5px #ddd solid;
    background-color: #fff;
    &:hover {
      background-color: #f5f7fa;
    }
    // &:nth-child(2n + 1) {
    //   background-color: #fafafa;
    //   &:hover {
    //     background-color: #f5f7fa;
    //   }
    // }
  }
  &__header {
    // background-color: #fff;
    background-color: #eff3f5;
  }
  &__cell {
    // padding: 8px 10px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
    // line-height: 23px;
    box-sizing: border-box;
    // border-right: 1px #ebeef5 solid;

    // border-right: 0.5px #ddd solid;
  }
  &__cell.z-table__th {
    // border-bottom: 1px #ebeef5 solid;
    border-bottom: 0.5px #ddd solid;
  }
  &__th {
    font-size: 14px;
    font-weight: bold;
    color: #909399;
  }
}
.el-input__inner {
  &:focus {
    outline: none;
    border-color: #409eff;
  }
  .uni-input-input {
    input:focus {
      outline: none;
      border-color: #409eff;
    }
  }
}
</style>
