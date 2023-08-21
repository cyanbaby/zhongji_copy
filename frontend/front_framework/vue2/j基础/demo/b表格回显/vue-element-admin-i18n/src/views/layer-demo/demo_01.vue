<template>
  <div class="box">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120"
      ></el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      ></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="openRowTable(scope.row)" type="text" size="small"
            >表格</el-button
          >
          <el-button @click="openRowInfo(scope.row)" type="text" size="small"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";

export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      table_data: [
        {
          id: "2bebeb",
          name: "史超",
          age: 25,
          email: "s.pyqoduaejx@tnnnmgtysj.bb",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "f4fe9a",
          name: "黄强",
          age: 34,
          email: "k.lxtkgeihx@wkgycnfqdl.hk",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "ebbdfd",
          name: "方洋",
          age: 28,
          email: "k.lpo@pmbbe.zm",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "1c7508",
          name: "阎刚",
          age: 43,
          email: "y.jjvgbjcqu@zbku.ag",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "dce343",
          name: "彭平",
          age: 23,
          email: "k.iwnlgmthg@dmj.su",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "f7abcd",
          name: "雷秀兰",
          age: 21,
          email: "x.nqttxcjzch@ucjcdkpnu.al",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "2b8c9e",
          name: "何军",
          age: 35,
          email: "p.ogdh@brot.uy",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb0",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb1",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb2",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb3",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb4",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb5",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb6",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb7",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb8",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb9",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb10",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb11",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb12",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
        {
          id: "fe6bb13",
          name: "徐伟",
          age: 39,
          email: "x.xcskqjkis@ksodjl.za",
          test1:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
          test2:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试   8888888888",
        },
      ],
    };
  },
  created() {
    // 模拟id,一般接口会把数据库的id带过来，解决open方法重复多开问题。
    this.tableData.forEach((item, index) => {
      item.id = "table_" + index;
    });
  },
  mounted() {},
  methods: {
    openRowTable(row) {},

    openRowInfo(row) {
      console.log(row.id);
      // 单行的字符串
      // const pre_str = jsonTohtmlStr(this.table_data)
      const pre_str = `<table id="${row.id}"></table>`;
      const _this = this;

      //多窗口模式，层叠置顶
      layer.open({
        id: row.id + "_openBox",
        type: 1,
        title: "当你选择该窗体时，即会在最顶端",

        // 530px要比 bootstrap-table 配置的height 高一丢丢，不然会出现两个滚动条。
        area: ["900px", "530px"],

        shade: 0,
        offset: [
          //为了演示，随机坐标
          Math.random() * ($(window).height() - 300),
          Math.random() * ($(window).width() - 390),
        ],
        maxmin: true,
        content: pre_str,

        btn: ["继续弹出", "全部关闭"], //只是为了演示
        yes: function () {
          // alert(1)
          // $(that).click(); //此处只是为了演示，实际使用可以剔除
        },
        btn2: function () {
          // alert(2)
          layer.closeAll();
        },

        zIndex: layer.zIndex, //重点1
        success: function (layero) {
          // alert(0)
          layer.setTop(layero); //重点2
          _this.$nextTick(() => {
            $(`#${row.id}`).bootstrapTable({
              // 这里的 columns 和 data 送分题，自己做。
              // 定义表头
              columns: [
                { title: "工号", field: "id", align: "center", width: 90 },
                { title: "姓名", field: "name" },
                { title: "年龄", field: "age", sortable: true },
                { title: "邮箱", field: "email", titleTooltip: "电子邮箱" },
                { title: "测试1", field: "test1" },
                { title: "测试2", field: "test2" },
              ],

              // 定义表体
              data: _this.table_data,

              // 固定表头
              height: 400,
            });
          });
        },
        resizing: function (layero) {
          $(`#${row.id}`).bootstrapTable("resetView");
        },
      });
    },
  },
};
</script>

<style scoped>
.box {
  padding: 25px;
  overflow-x: auto;
}
</style>