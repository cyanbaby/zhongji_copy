<template>
  <div>

    <div style="text-align: left;padding: 15px 0 0 15px;">
      <el-button type="primary"  @click="clickOpenButton">打开嵌套表格的 Dialog</el-button>
    </div>

    <div style="border: 1px dashed #4d90fe; margin: 15px 0 0 15px; text-align: left;padding: 15px;">
      <draggable :list="auto_rely_names">
        <el-tag
          style="margin-right: 10px;"
          :key="tag.value"
          v-for="tag in auto_rely_names"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag.label}}
        </el-tag>
      </draggable>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table
        ref="multipleTable"
        :data="showTableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="字段名称">
          <template slot-scope="scope">{{ scope.row.field_name_cn }}</template>
        </el-table-column>
        <el-table-column
          label="字段编码">
          <template slot-scope="scope">{{ scope.row.field_name }}</template>
        </el-table-column>
      </el-table>
      <div style="height: 15px;"></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>

      <div slot="footer" class="dialog-footer">
        <el-button size="small"  @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="cacheHitFields">确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
/* eslint-disable */
import draggable from 'vuedraggable'
import _ from 'lodash'

var map = new Map();
var newList = [];

export default {
  name: 'erji',
  components: {
    draggable
  },
  data(){
    return {
      tableData: [
        {
          id: 110,
          field_name: "test_config_04",
          field_name_cn: "测试配置项字段_04",
          field_type: "configuration_item",
          field_belong_user: "lwx1020332",
          model_labeling: "null",
          create_time: "2021-03-15T14:33:41.742844",
          update_time: "2021-05-06T12:16:23.153061",
        },
        {
          id: 120,
          field_name: "test_config_05",
          field_name_cn: "测试配置项字段_05",
          field_type: "configuration_item",
          field_belong_user: "lwx1020332",
          model_labeling: "null",
          create_time: "2021-03-16T20:18:49.855381",
          update_time: "2021-04-29T18:09:13.799663",
        },
        {
          id: 248,
          field_name: "change_num",
          field_name_cn: "变更单号",
          field_type: "single_line",
          field_belong_user: "f00456297",
          model_labeling: "null",
          create_time: "2021-04-29T15:21:43.035420",
          update_time: "2021-04-29T15:21:43.035461",
        },
        {
          id: 125,
          field_name: "alarm_info",
          field_name_cn: "告警信息",
          field_type: "configuration_item",
          field_belong_user: "lwx1020332",
          model_labeling: "null",
          create_time: "2021-03-17T16:00:56.232462",
          update_time: "2021-04-27T18:47:09.918863",
        },
        {
          id: 147,
          field_name: "expected_time",
          field_name_cn: "期望完成时间",
          field_type: "datetime",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-03-23T09:46:57.119098",
          update_time: "2021-04-23T16:33:33.263490",
        },
        {
          id: 143,
          field_name: "problem_type",
          field_name_cn: "问题类型",
          field_type: "dropdown_menu",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-03-22T20:38:59.875826",
          update_time: "2021-04-23T15:55:41.596674",
        },
        {
          id: 247,
          field_name: "111111",
          field_name_cn: "测试复选",
          field_type: "multiple_choices",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-22T17:15:43.508867",
          update_time: "2021-04-22T17:15:43.508911",
        },
        {
          id: 123,
          field_name: "test_topology_01",
          field_name_cn: "拓扑结构",
          field_type: "configuration_item",
          field_belong_user: "lwx1020332",
          model_labeling: "null",
          create_time: "2021-03-17T11:06:06.664738",
          update_time: "2021-04-21T10:52:32.366493",
        }, {
          id: 246,
          field_name: "test_file_033",
          field_name_cn: "测试附件3",
          field_type: "attachments",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-20T12:01:29.791531",
          update_time: "2021-04-20T12:01:29.791565",
        },
        {
          id: 237,
          field_name: "product_choose",
          field_name_cn: "产品选择",
          field_type: "dropdown_menu",
          field_belong_user: "f00456297",
          model_labeling: "null",
          create_time: "2021-04-16T17:03:32.816584",
          update_time: "2021-04-19T21:28:48.273481",
        },
        {
          id: 226,
          field_name: "test_time_range",
          field_name_cn: "测试时间_范围",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T14:17:44.536928",
          update_time: "2021-04-19T14:24:14.717932",
        },
        {
          id: 245,
          field_name: "test_time_range_05",
          field_name_cn: "测试时间__范围_05",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-17T12:13:35.091900",
          update_time: "2021-04-17T12:13:35.091944",
        },
        {
          id: 244,
          field_name: "test_time_range_04",
          field_name_cn: "测试时间__范围_04",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-17T12:07:47.276044",
          update_time: "2021-04-17T12:07:47.276075",
        },
        {
          id: 243,
          field_name: "test_time_range_03",
          field_name_cn: "测试时间__范围_03",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-17T12:02:09.254417",
          update_time: "2021-04-17T12:02:09.254465",
        },
        {
          id: 242,
          field_name: "test_time_range_02",
          field_name_cn: "测试时间__范围_02",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-17T12:00:53.743101",
          update_time: "2021-04-17T12:00:53.743136",
        },
        {
          id: 241,
          field_name: "alarm_info_test_02",
          field_name_cn: "告警信息__测试__02",
          field_type: "configuration_item",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-17T10:51:16.986786",
          update_time: "2021-04-17T10:51:16.986823",
        },
        {
          id: 106,
          field_name: "test_cat_01",
          field_name_cn: "测试__单选框_默认值",
          field_type: "single_choice",
          field_belong_user: "lwx1020332",
          model_labeling: "null",
          create_time: "2021-03-11T22:16:58.599189",
          update_time: "2021-04-16T17:10:22.519823",
        },
        {
          id: 239,
          field_name: "test_cat_0111111",
          field_name_cn: "测试__单选框",
          field_type: "single_choice",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T17:10:19.390184",
          update_time: "2021-04-16T17:10:19.390224",
        },
        {
          id: 180,
          field_name: "test_selections_0001",
          field_name_cn: "测试___复选框",
          field_type: "multiple_choices",
          field_belong_user: "lwx1020332",
          model_labeling: "null",
          create_time: "2021-03-29T10:10:22.191489",
          update_time: "2021-04-16T17:08:09.600100",
        },
        {
          id: 238,
          field_name: "test_selections_0001__default",
          field_name_cn: "测试___复选框_默认值",
          field_type: "multiple_choices",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T17:07:39.928425",
          update_time: "2021-04-16T17:07:39.928457",
        },
        {
          id: 236,
          field_name: "test_dropdown_mul_default",
          field_name_cn: "测试下拉菜单__多选_默认值",
          field_type: "dropdown_menu",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T16:30:20.918577",
          update_time: "2021-04-16T16:30:20.918618",
        },
        {
          id: 235,
          field_name: "test_dropdown_mul",
          field_name_cn: "测试下拉菜单__多选",
          field_type: "dropdown_menu",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T16:29:26.271910",
          update_time: "2021-04-16T16:29:26.271957",
        },
         {
          id: 234,
          field_name: "test_dropdown_single_default",
          field_name_cn: "测试下拉菜单__单选_默认值",
          field_type: "dropdown_menu",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T16:28:22.557753",
          update_time: "2021-04-16T16:28:22.557791",
        },
        {
          id: 233,
          field_name: "test_dropdown_single",
          field_name_cn: "测试下拉菜单__单选",
          field_type: "dropdown_menu",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T16:25:26.770201",
          update_time: "2021-04-16T16:25:26.770237",
        },
        {
          id: 232,
          field_name: "test_noMultiple_01",
          field_name_cn: "测试下拉菜单__noMultiple_01",
          field_type: "dropdown_menu",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T16:12:21.050022",
          update_time: "2021-04-16T16:20:03.185353",
        },
        {
          id: 231,
          field_name: "test_noMultiple",
          field_name_cn: "测试下拉菜单__noMultiple",
          field_type: "dropdown_menu",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T16:00:51.310271",
          update_time: "2021-04-16T16:06:10.459345",
        },
        {
          id: 181,
          field_name: "test_dropdown_0001",
          field_name_cn: "测试下拉菜单2",
          field_type: "dropdown_menu",
          field_belong_user: "lwx1020332",
          model_labeling: "null",
          create_time: "2021-03-29T10:12:44.030949",
          update_time: "2021-04-16T15:06:15.728033",
        },
        {
          id: 227,
          field_name: "test_time_range_default",
          field_name_cn: "测试时间_范围_默认值",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T14:19:03.339066",
          update_time: "2021-04-16T14:19:03.339108",
        },
        {
          id: 225,
          field_name: "test_time_moment_default",
          field_name_cn: "测试时间_时刻_默认值",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T14:17:10.636801",
          update_time: "2021-04-16T14:17:10.636830",
        },
        {
          id: 224,
          field_name: "test_time_moment",
          field_name_cn: "测试时间_时刻",
          field_type: "datetime",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-16T14:16:15.242616",
          update_time: "2021-04-16T14:16:15.242666",
        },
        {
          id: 223,
          field_name: "shield_proofs",
          field_name_cn: "允许屏蔽证明",
          field_type: "attachments",
          field_belong_user: "f00456297",
          model_labeling: "null",
          create_time: "2021-04-15T19:22:10.536421",
          update_time: "2021-04-15T19:22:10.536459",
        },
        {
          id: 222,
          field_name: "alarm_info_test",
          field_name_cn: "告警信息__测试",
          field_type: "configuration_item",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-15T10:39:13.153580",
          update_time: "2021-04-15T10:39:13.153630",
        },
         {
          id: 221,
          field_name: "test_topology_01_test",
          field_name_cn: "拓扑结构__测试",
          field_type: "configuration_item",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-15T09:40:34.368801",
          update_time: "2021-04-15T09:59:47.863640",
        },
        {
          id: 218,
          field_name: "interface_status_test",
          field_name_cn: "接口状态__测试",
          field_type: "configuration_item",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-14T19:15:40.434675",
          update_time: "2021-04-14T20:19:10.283905",
        },
        {
          id: 220,
          field_name: "interface_info_test",
          field_name_cn: "接口信息__测试",
          field_type: "single_line",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-14T20:03:46.469743",
          update_time: "2021-04-14T20:03:46.469775",
        },
        {
          id: 219,
          field_name: "device_info_test",
          field_name_cn: "设备信息__测试",
          field_type: "configuration_item",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-14T19:18:40.266116",
          update_time: "2021-04-14T19:31:14.323596",
        },
        {
          id: 217,
          field_name: "bmc_ip_test",
          field_name_cn: "BMC IP 测试",
          field_type: "single_line",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-14T19:09:17.484970",
          update_time: "2021-04-14T19:09:17.485006",
        },
        {
          id: 216,
          field_name: "Automating_Logs",
          field_name_cn: "自动化执行日志",
          field_type: "multiline_text",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-14T15:43:04.319157",
          update_time: "2021-04-14T15:43:04.319157",
        },
        {
          id: 215,
          field_name: "Automating_Results",
          field_name_cn: "自动化执行结果",
          field_type: "multiline_text",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-14T15:42:09.794828",
          update_time: "2021-04-14T15:42:09.794828",
        },
        {
          id: 214,
          field_name: "system_log",
          field_name_cn: "系统日志",
          field_type: "multiline_text",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-12T11:35:55.724962",
          update_time: "2021-04-12T11:35:55.725010",
        },
        {
          id: 212,
          field_name: "Region_Name",
          field_name_cn: "Region_Name",
          field_type: "configuration_item",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-09T16:26:22.776384",
          update_time: "2021-04-09T16:26:22.776421",
        },
        {
          id: 211,
          field_name: "AZ_Name",
          field_name_cn: "AZ_Name",
          field_type: "single_line",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-09T11:24:31.075946",
          update_time: "2021-04-09T11:24:31.075975",
        },
        {
          id: 210,
          field_name: "AZ_ID",
          field_name_cn: "AZ_ID",
          field_type: "single_line",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-09T11:24:18.388122",
          update_time: "2021-04-09T11:24:18.388151",
        },
        {
          id: 209,
          field_name: "Region_ID",
          field_name_cn: "Region_ID",
          field_type: "single_line",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-09T11:23:35.485868",
          update_time: "2021-04-09T11:23:35.485903",
        },
        {
          id: 200,
          field_name: "urgency",
          field_name_cn: "紧急度",
          field_type: "single_choice",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-02T14:48:33.128898",
          update_time: "2021-04-09T09:05:56.302857",
        },
         {
          id: 207,
          field_name: "platform",
          field_name_cn: "平台名称",
          field_type: "single_choice",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-06T16:43:02.316045",
          update_time: "2021-04-06T16:43:02.316075",
        },
        {
          id: 206,
          field_name: "alarm_detail",
          field_name_cn: "告警详情",
          field_type: "multiline_text",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-06T16:39:39.381071",
          update_time: "2021-04-06T16:39:39.381099",
        },
        {
          id: 204,
          field_name: "rule_name",
          field_name_cn: "规则名称",
          field_type: "single_line",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-06T16:32:22.115295",
          update_time: "2021-04-06T16:32:22.115360",
        },
        {
          id: 202,
          field_name: "shield_reason",
          field_name_cn: "屏蔽原因",
          field_type: "multiline_text",
          field_belong_user: "z00452880",
          model_labeling: "null",
          create_time: "2021-04-06T16:25:45.243360",
          update_time: "2021-04-06T16:25:45.243397",
        },
        {
          id: 201,
          field_name: "alarm_info_222",
          field_name_cn: "告警信息_222",
          field_type: "configuration_item",
          field_belong_user: "zwx876495",
          model_labeling: "null",
          create_time: "2021-04-02T15:51:29.610372",
          update_time: "2021-04-02T15:51:29.610399",
        },
      ],

      showTableData:[],

      currentPage4: 1, //这个属性是页面加载时分页组件默认选中的页码
      pageTotal:0,
      pageSize: 5,
      multipleSelection: [],

      dialogTableVisible: false,
      auto_rely_names: [
        // {
        //   "label": "规则名称",
        //   "value": "rule_name"
        // },
        // {
        //   "label": "屏蔽原因",
        //   "value": "shield_reason"
        // },
        // {
        //   "label": "测试配置项字段_05",
        //   "value": "test_config_05"
        // }
      ],
      temp_auto_rely_names: [],
    }
  },
  mounted(){
    this.pageTotal = this.tableData.length;
    // this.showTableData = [ this.tableData[0] ] // 初始化默认赋值,为1条数据
    // this.showTableData = [ this.tableData[0] ] // 初始化默认赋值,为1条数据
    this.showTableData = this.tableData.slice(0, 5)
  },
  methods:{
    clickOpenButton() {
      this.dialogTableVisible = true;
      
      
      this.$nextTick(() => {

        // 初始化
        map = new Map();
          // map.clear()
        newList = [];
        this.$refs.multipleTable.clearSelection();
        this.temp_auto_rely_names = _.cloneDeep(this.auto_rely_names);
        
        // 更新当前分页选中
        this.updateChoose()

      })
      

    },

    cacheHitFields() {
      // console.log(`要保存了 newList`, newList)
      

      const newList_result = newList.map(item => {
        let temp = {};
        temp.label = item.field_name_cn;
        temp.value = item.field_name;
        return temp;
      });


      const sum = newList_result.concat(this.temp_auto_rely_names)

      const result = _.uniqBy(sum, 'value')  // 最终总的结果
      const result_values = result.map(item => item.value)  // 最终总的结果
      

      // console.log(`看看结果 对不对`, result)

      // 一把梭增删
      // this.auto_rely_names = result;

      // 按序增删(先filter删除的【原有的基础上】，然后遍历push【新勾选的】)
      this.auto_rely_names = this.auto_rely_names.filter(item => result_values.includes(item.value))
      // console.log(`this.auto_rely_names`, this.auto_rely_names)
      const current_values = this.auto_rely_names.map( item => item.value)
      result.forEach(item => {
        if(!current_values.includes(item.value)) {
          this.auto_rely_names.push(item)
        }
      })

      this.dialogTableVisible = false;
    },

    handleClose(tag) {
      let index = this.auto_rely_names.findIndex( item => item.value === tag.value);
      this.auto_rely_names.splice(index, 1);
    },

    /**
     * PageSize 修改页面默认显示条数
     * */
    handleSizeChange(val) {
      this.showTableData = this.tableData.slice(0,val);
      this.pageSize = val;

      // let list = [...newList];
      // this.$nextTick(()=>{
      //   this.showTableData.map(it =>{
      //     list.map(items=>{
      //       if (items.field_name == it.field_name){
      //         this.$refs.multipleTable.toggleRowSelection(it)
      //       }
      //     })
      //   })
      // })
      this.updateChoose()
    },
    /**
     * 修改页码
     * */
    handleCurrentChange(val) {
      this.showTableData = this.tableData.slice((val - 1) * Number(this.pageSize),val * Number(this.pageSize));
      //因为是模拟数据,所以只能在分页上进行回显,正常状态下应该是向后台重新拉取到数据列表的时候,切是在渲染表数据赋值之后进行
      // ==============================================以下皆为模拟后台返回数据之后进行

      // let list = [...newList];
      // this.$nextTick(()=>{
      //   this.showTableData.map(it =>{
      //     list.map(items=>{
      //       if (items.field_name == it.field_name){
      //         this.$refs.multipleTable.toggleRowSelection(it)
      //       }
      //     })
      //   })
      // })



      this.updateChoose();
      
    },

    updateChoose() {
      // alert(1)

      // 不能直接强制就让 auto_rely_names 勾选上，他有可能被用户取消啦。

      const newList_names = newList.map(item => item.field_name);

      this.temp_auto_rely_names.forEach(item => {  // 混入用户选择的数据
        if(!newList_names.includes(item.value)) {
          let temp = {};
          temp.field_name_cn = item.label;
          temp.field_name = item.value;
          newList.push(temp)
        }
      })
      

      let list = [...newList];
      console.log(`list`, list)
      this.$nextTick(()=>{
        this.showTableData.map(it =>{
          list.map(items=>{
            if (items.field_name == it.field_name){
              this.$refs.multipleTable.toggleRowSelection(it, true)
            }
          })
        })
      })
      
    },

    /**
     * 批量选中
     * */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.echoData()
      // alert(0)
    },
    /**
     * 分页回显必须确定一个唯一健,不能有重复
     *
     * */
    echoData(){
      // alert(`echoData执行了，因为勾选的change`)
      
      // console.log(`temp_auto_rely_names`, temp_auto_rely_names)

      var temp = [];
      if(this.multipleSelection.length > 0){  // 当前表格已有勾选(目标表格，分页后的表格数据中的勾选数据)

        var m = new Map();

        for (let i = 0; i < this.multipleSelection.length; i++) {  // 遍历 当前表格已有勾选 设置给临时Map
          m.set(this.multipleSelection[i].field_name, this.multipleSelection[i].field_name);
        }

        for (let i = 0; i < this.showTableData.length; i++) {  // 遍历 当前表格数据(分页后的)  从 临时Map 获取缓存判断 -> 然后缓存然后缓存未勾选的数据(temp)
          if(m.get(this.showTableData[i].field_name) == null || !m.get(this.showTableData[i].field_name)){
            // console.log(`this.showTableData[i]`, this.showTableData[i]) // 这些都是未勾选哒
            temp.push(this.showTableData[i].field_name);

            this.temp_auto_rely_names = this.temp_auto_rely_names.filter(item => item.value !== this.showTableData[i].field_name);
          }
        }
      } else{  // 当前表格没有勾选 直接缓存然后缓存未勾选的数据(temp)

        for (let i = 0; i < this.showTableData.length; i++) {
          temp.push(this.showTableData[i].field_name);
          this.temp_auto_rely_names = this.temp_auto_rely_names.filter(item => item.value !== this.showTableData[i].field_name);
        }

      }
      
      // console.log(`看看 this.temp_auto_rely_names 是否更新`, this.temp_auto_rely_names)
      
      for (let i = 0; i < this.multipleSelection.length ; i++) {  // 遍历 当前表格已有勾选 设置给最外层Map
        map.set(this.multipleSelection[i].field_name, this.multipleSelection[i]);
      }

      for (let i = 0; i < temp.length ; i++) {  // 从最外层Map  中 删除缓存未勾选的数据(temp)
        map.delete(temp[i]);
      }


      var  list = [];

      map.forEach(function(key) {  // 最外层Map 映射成一个新的数组 最终选择。
        list.push(key)
      })

      newList = list;
      
      // console.log(`map`, map)  // 分页还未切换到 一次性设置不了 总的用户已选择
    }
  }
}
</script>

<style scoped>

</style>