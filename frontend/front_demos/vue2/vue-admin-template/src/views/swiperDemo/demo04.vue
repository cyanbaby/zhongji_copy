<template>
  <div>
    <!-- 定义一个滚动范围的父div 并绑定ref=all（方便下方方法中取得此元素最左边位置），必要样式：overflow: hidden; display: flex; justify-content: left; -->
    <div class="carousel" ref="all">
      <!-- 循环数组数据，并绑定ref=demoItem(方便取得循环的每一个元素的最左边位置，并动态添加transform样式) -->
      <div v-for="(item, index) in tableData" :key="index" class="carousel-item"
        :style="'transform: translateX(' + item.translateNum + 'px)'" ref="demoItem" @mouseover="mouseOver"
        @mouseleave="mouseLeave">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// https://blog.csdn.net/Junyaxx/article/details/120533531

export default {
  data() {
    return {
      tableData: [
        {
          name: '张三'
        }, {
          name: '李四'
        }, {
          name: '王五'
        }, {
          name: '赵六'
        }, {
          name: '钱七'
        },
      ],
      translateNum: 0,
      timer: null
    }
  },
  mounted() {
    this.search();
  },
  beforeDestroy() {
    // 销毁定时器，否则可能导致重载此组件时会有多个定时器同时执行，使得滚动变快
    window.clearTimeout(this.timer);
  },
  methods: {
    search() {
      // 循环给tableData数组每一个对象添加translateNum属性为0，这也是为了方便记录每一个对象滚动的宽度
      for (var i = 0; i < this.tableData.length; i++) {
        this.$set(this.tableData[i], 'translateNum', 0);
      }

      // 在元素完全渲染后再循环给每一个对象添加indexLeft属性，记录此对象初始位置，方便滚动超出父元素边界后，重新设置元素位置
      this.$nextTick(() => {
        for (var j = 0; j < this.tableData.length; j++) {
          this.$set(this.tableData[j], 'indexLeft', this.$refs.demoItem[j].offsetLeft);
        }

        // 调用滚动定时器
        this.roll();
      })
    },

    roll() {
      this.timer = setInterval(() => {
        // 循环给每一个对象修改translateNum属性值，从而动态修改页面元素的transform样式，达到滚动的效果
        for (var i = 0; i < this.tableData.length; i++) {

          /**
           * 判断此元素是否即将超出父级元素carousel-item的显示区域
           * 1400 = 父级元素carousel的宽度 + 一个子元素carousel-item的宽度（如果元素有间距也需要带上）即 1200 + 180 + 20(间距)
           * 修改父级元素与子元素样式时需要留意此处也应当一起修改
           */
          if (1400 - this.tableData[i].translateNum - this.tableData[i].indexLeft < 0) {

            /**
             * 如果超出，则将元素移动至父级元素显示区域的左方
             * 此处的200 对应着子元素carousel-item的样式宽度
             */
            this.$set(this.tableData[i], 'translateNum', this.$refs.all.offsetLeft - this.tableData[i].indexLeft - 200);
          }

          // 设置每个元素每次滚动的像素大小，像素越小越平滑,这里每次只移动一个像素
          this.$set(this.tableData[i], 'translateNum', this.tableData[i].translateNum + 1);

        }
      }, 30); // 30毫秒滚动一次，时间间隔越短滚动越平滑

    },

    /**
     * 鼠标悬停销毁定时器
     */
    mouseOver() {
      window.clearTimeout(this.timer);
    },

    /**
     * 鼠标离开再次执行定时器
     */
    mouseLeave() {
      this.roll();
    },


  }
}
</script>

<style scoped>
.carousel {
  background-color: gray;
  width: 1200px;
  height: 300px;
  margin: 20px auto;
  overflow: hidden;
  display: flex;
  justify-content: left;
}

.carousel-item {
  width: 180px;
  height: 280px;
  text-align: center;
  margin: 10px 20px;
  background-color: rgb(32, 136, 233);
}
</style>
