<template>
  <view>
    <!-- <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
      <view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
      <view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
      <view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
    </scroll-view> -->

    <scroll-view class="uni-container" scroll-x="true">
      <!-- <uni-table
        ref="table"
        border
        stripe
        emptyText="暂无更多数据"
      >
        <uni-tr>
          <uni-th width="150" align="center">日期</uni-th>
          <uni-th width="150" align="center">姓名</uni-th>
          <uni-th width="150" align="center">外号</uni-th>
          <uni-th align="center">地址</uni-th>
        </uni-tr>
        <uni-tr v-for="(item, index) in tableData" :key="index">
          <uni-td>{{ item.date }}</uni-td>
          <uni-td :colspan="2">
            <view class="name">{{ item.name }}</view>
          </uni-td>
          <uni-td>
            <view class="name">{{ item.alias }}</view>
          </uni-td>
          <uni-td align="center">{{ item.address }}</uni-td>
        </uni-tr>
      </uni-table> -->

      <uni-table border stripe emptyText="暂无更多数据">
        <!-- 表头行 -->
        <uni-tr>
          <uni-th align="center">日期</uni-th>
          <uni-th align="center">姓名</uni-th>
          <uni-th align="left">地址</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr>

          <uni-td>2020-10-20</uni-td>
          
          <uni-td></uni-td>
          <!-- <uni-td>Jeson</uni-td> -->

          <uni-td>北京市海淀区</uni-td>

        </uni-tr>
        <uni-tr>
          <uni-td>2020-10-21</uni-td>
          <uni-td>HanMeiMei</uni-td>
          <uni-td>北京市海淀区</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>2020-10-22</uni-td>
          <uni-td>LiLei</uni-td>
          <uni-td>北京市海淀区</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>2020-10-23</uni-td>
          <uni-td>Danner</uni-td>
          <uni-td>北京市海淀区</uni-td>
        </uni-tr>
      </uni-table>
    </scroll-view>
  </view>
</template>

<script>
import tableData from "./tableData.js";
const tableList = tableData.splice(0, 20).map((item) => {
  item.alias = item.name;
  return item;
});
export default {
  data() {
    return {
      tableData: tableList,
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style></style>
