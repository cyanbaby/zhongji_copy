<template>
  <div>
    <div style="text-align: left; padding: 15px 0 0 15px">
      <el-button type="primary" @click="clickOpenButton"
        >打开嵌套表格的 Dialog</el-button
      >
    </div>

    <div
      style="
        border: 1px dashed #4d90fe;
        margin: 15px 0 0 15px;
        text-align: left;
        padding: 15px;
      "
    >
      <draggable :list="auto_rely_names">
        <el-tag
          style="margin-right: 10px"
          :key="tag.field_name"
          v-for="tag in auto_rely_names"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          <el-tooltip effect="light" placement="top">
            <div slot="content">
              <span>字段编码：</span><span>{{ tag.field_name }}</span>
              <br />
              <br />
              <span>类型类型：</span><span>{{ tag.field_type }}</span>
              <br />
              <br />
              <span>字段名：</span><span>{{ tag.field_name_cn }}</span>
              <br />
              <br />
              <span>是否必填：</span
              ><span>{{ tag.inheritance_options | isRequired }}</span>
              <br />
              <br />
              <span>选择的值：</span><span>{{ tag.temp_only }}</span>
            </div>
            <span>{{ tag.field_name_cn }}</span>
          </el-tooltip>
        </el-tag>
      </draggable>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-input
        v-model="input_value"
        placeholder="请输入内容"
        @change="handleChangeSearch"
        size="mini"
        style="width: 200px; margin-bottom: 20px"
      ></el-input>
      <el-table
        ref="multipleTable"
        :data="showTableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="字段名称">
          <template slot-scope="scope">{{ scope.row.field_name_cn }}</template>
        </el-table-column>
        <el-table-column label="字段编码">
          <template slot-scope="scope">{{ scope.row.field_name }}</template>
        </el-table-column>
        <el-table-column label="选项">
          <template slot-scope="scope">
            <el-radio-group
              v-model="scope.row['temp_only']"
              @change="handleChange(scope.row)"
            >
              <el-radio
                v-for="item in scope.row.inheritance_options"
                :label="item.name"
                :key="item.name"
                >{{ item.cn_desc }}</el-radio
              >
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 15px"></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogTableVisible = false"
          >取 消</el-button
        >
        <el-button size="small" type="primary" @click="cacheHitFields"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import draggable from "vuedraggable";
import _ from "lodash";

var map = new Map();
var newList = [];

export default {
  name: "erji",
  components: {
    draggable,
  },
  filters: {
    isRequired: function (inheritance_options) {
      let state = inheritance_options.filter((item) => item.checked);
      if (state.length) {
        return state[0]["cn_desc"];
      }
    },
  },
  data() {
    return {
      input_value: "",

      tableData: [
        {
          id: 167,
          field_name: "device_infor",
          field_name_cn: "设备信息",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-25T15:15:14.547410",
          update_time: "2021-05-20T14:52:43.414112",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 278,
          field_name: "failure_component_No.",
          field_name_cn: "故障件序号",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00564773",
              cn_name: "潘骅",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-17T14:32:33.079864",
          update_time: "2021-05-17T14:32:33.079902",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 277,
          field_name: "order_tittle_simple [hardware_fault]",
          field_name_cn: "测试兼容不合法属性",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "zWX876495",
              cn_name: "张国",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-14T15:50:50.743528",
          update_time: "2021-05-14T15:50:50.743563",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 276,
          field_name: "order_tittle_simple_hardware_fault",
          field_name_cn: "标题示例",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-14T15:46:33.729829",
          update_time: "2021-05-14T15:46:33.729863",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 134,
          field_name: "component_SN",
          field_name_cn: "部件SN",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-22T18:58:14.914197",
          update_time: "2021-05-14T15:17:35.777893",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 275,
          field_name: "failure_componen_BOM",
          field_name_cn: "故障件BOM",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00564773",
              cn_name: "潘骅",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-14T15:00:39.494036",
          update_time: "2021-05-14T15:00:39.494068",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 274,
          field_name: "failure_component_type",
          field_name_cn: "故障件类型",
          field_type: "dropdown_menu",
          field_belong_user: [
            {
              w3id: "p00564773",
              cn_name: "潘骅",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-14T14:55:21.560597",
          update_time: "2021-05-14T14:55:21.560635",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 264,
          field_name: "slot",
          field_name_cn: "故障件槽位",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T16:01:05.293024",
          update_time: "2021-05-14T14:30:04.494972",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 273,
          field_name: "component_SN1",
          field_name_cn: "故障件SN",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-14T11:27:53.471511",
          update_time: "2021-05-14T14:29:28.773034",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 212,
          field_name: "Region_Name",
          field_name_cn: "Region_Name",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-04-09T16:26:22.776384",
          update_time: "2021-05-13T15:13:27.831664",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 124,
          field_name: "interface_status",
          field_name_cn: "接口状态 ",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "lWX1020332",
              cn_name: "李绍定",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-17T15:10:43.453764",
          update_time: "2021-05-13T15:13:01.977462",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 123,
          field_name: "test_topology_01",
          field_name_cn: "拓扑结构",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "lWX1020332",
              cn_name: "李绍定",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-17T11:06:06.664738",
          update_time: "2021-05-13T15:12:32.334083",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 125,
          field_name: "alarm_info",
          field_name_cn: "告警信息",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "lWX1020332",
              cn_name: "李绍定",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-17T16:00:56.232462",
          update_time: "2021-05-13T15:12:13.003899",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 270,
          field_name: "RecordProgress",
          field_name_cn: "记录进展",
          field_type: "multiline_text",
          field_belong_user: [
            {
              w3id: "cWX1011207",
              cn_name: "陈柄坤",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-12T17:38:11.293839",
          update_time: "2021-05-12T17:38:11.293874",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 269,
          field_name: "update_progress",
          field_name_cn: "更新进展内部字段",
          field_type: "multiline_text",
          field_belong_user: [
            {
              w3id: "zWX876495",
              cn_name: "张国",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-12T15:33:47.016068",
          update_time: "2021-05-12T15:33:47.016107",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 267,
          field_name: "updatetime",
          field_name_cn: "进展更新时间",
          field_type: "datetime",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-12T09:57:36.699857",
          update_time: "2021-05-12T09:57:36.699891",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 256,
          field_name: "solutionowner",
          field_name_cn: "选择问题工单责任人",
          field_type: "personnel",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T14:37:20.264928",
          update_time: "2021-05-12T09:38:46.129376",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 174,
          field_name: "deal_person",
          field_name_cn: "问题处理人",
          field_type: "personnel",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-26T14:26:03.092606",
          update_time: "2021-05-12T09:38:09.658581",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 263,
          field_name: "Approval comments",
          field_name_cn: "审批意见",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T14:59:33.265899",
          update_time: "2021-05-11T14:59:33.265925",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 262,
          field_name: "permissionbool",
          field_name_cn: "闭环同意与否",
          field_type: "dropdown_menu",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T14:59:15.498612",
          update_time: "2021-05-11T14:59:15.498652",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 261,
          field_name: "disposalproof",
          field_name_cn: "问题处理证明",
          field_type: "attachments",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T14:55:52.036414",
          update_time: "2021-05-11T14:55:52.036453",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 260,
          field_name: "Disposaldescription",
          field_name_cn: "问题处理说明",
          field_type: "multiline_text",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T14:55:02.753164",
          update_time: "2021-05-11T14:55:02.753207",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 258,
          field_name: "progress",
          field_name_cn: "问题处理进展更新",
          field_type: "multiline_text",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T14:48:46.400173",
          update_time: "2021-05-11T14:48:46.400214",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 257,
          field_name: "problemsolution",
          field_name_cn: "工单处理方案",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-11T14:41:38.263779",
          update_time: "2021-05-11T14:41:38.263814",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 255,
          field_name: "person",
          field_name_cn: "人员",
          field_type: "personnel",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-07T21:39:35.471292",
          update_time: "2021-05-07T21:39:35.471325",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 254,
          field_name: "sport_time",
          field_name_cn: "运动时间",
          field_type: "datetime",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-07T20:09:25.455138",
          update_time: "2021-05-07T20:09:25.455171",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 253,
          field_name: "distance",
          field_name_cn: "公里",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-07T20:08:02.571886",
          update_time: "2021-05-07T20:08:02.571921",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 120,
          field_name: "test_config_05",
          field_name_cn: "测试配置项字段_05",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "lWX1020332",
              cn_name: "李绍定",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-16T20:18:49.855381",
          update_time: "2021-05-07T16:47:56.585303",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 252,
          field_name: "FailureDetails",
          field_name_cn: "故障详情",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-07T14:56:54.066630",
          update_time: "2021-05-07T14:56:54.066659",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 251,
          field_name: "failuretype",
          field_name_cn: "故障类型",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-07T14:46:25.255749",
          update_time: "2021-05-07T14:46:25.255786",
          temp_only: "mandatory",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
      ],

      showTableData: [],

      // default_page: 1, //这个属性是页面加载时分页组件默认选中的页码
      page: 1, //这个属性是页面加载时分页组件默认选中的页码
      pageTotal: 0,
      pageSize: 5,
      multipleSelection: [],

      dialogTableVisible: false,
      auto_rely_names: [
        {
          id: 167,
          field_name: "device_infor",
          field_name_cn: "设备信息",
          field_type: "configuration_item",
          field_belong_user: [
            {
              w3id: "z00452880",
              cn_name: "张建业",
            },
          ],
          model_labeling: "null",
          create_time: "2021-03-25T15:15:14.547410",
          update_time: "2021-05-20T14:52:43.414112",
          temp_only: "optional",
          inheritance_options: [
            {
              name: "optional",
              checked: true,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: false,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 278,
          field_name: "failure_component_No.",
          field_name_cn: "故障件序号",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00564773",
              cn_name: "潘骅",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-17T14:32:33.079864",
          update_time: "2021-05-17T14:32:33.079902",
          temp_only: "optional",
          inheritance_options: [
            {
              name: "optional",
              checked: true,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: false,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },
        {
          id: 277,
          field_name: "order_tittle_simple [hardware_fault]",
          field_name_cn: "测试兼容不合法属性",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "zWX876495",
              cn_name: "张国",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-14T15:50:50.743528",
          update_time: "2021-05-14T15:50:50.743563",
          temp_only: "optional",
          inheritance_options: [
            {
              name: "optional",
              checked: true,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: false,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ],
        },

        // 最后选一个
        {
          id: 251,
          field_name: "failuretype",
          field_name_cn: "故障类型",
          field_type: "single_line",
          field_belong_user: [
            {
              w3id: "p00584846",
              cn_name: "潘攀",
            },
          ],
          model_labeling: "null",
          create_time: "2021-05-07T14:46:25.255749",
          update_time: "2021-05-07T14:46:25.255786",
          temp_only: "read",
          inheritance_options: [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: false,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: true,
              cn_desc: "只读",
            },
          ],
        },
      ],
      temp_auto_rely_names: [],
    };
  },
  created() {
    // setTimeout(() => {
    //   this.showTableData[0]['inheritance_options'][2]['checked'] = true;
    //   console.log("this.showTableData[0]['inheritance_options']", this.showTableData[0]['inheritance_options'])
    // }, 5000)
  },
  mounted() {
    this.pageTotal = this.tableData.length;
    // this.showTableData = [ this.tableData[0] ] // 初始化默认赋值,为1条数据
    // this.showTableData = [ this.tableData[0] ] // 初始化默认赋值,为1条数据
    this.showTableData = this.tableData.slice(0, 5);
  },
  methods: {
    handleChange(row) {
      let name = row.temp_only;
      row.inheritance_options.forEach((element) => {
        if (element.name === name) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      });
      // console.log('row', row)
      // console.log('this.multipleSelection', this.multipleSelection)

      // $emit
      // this.handleSelectionChange( _.cloneDeep(this.multipleSelection) )
    },

    clickOpenButton() {
      this.dialogTableVisible = true;

      this.$nextTick(() => {
        // console.log('this.showTableData', this.showTableData)

        // 初始化
        map = new Map();
        // map.clear()
        newList = [];
        this.$refs.multipleTable.clearSelection();
        this.temp_auto_rely_names = _.cloneDeep(this.auto_rely_names);

        // 更新当前分页选中
        this.updateChoose();
      });
    },
    cacheHitFields__bak() {
      // console.log(`要保存了 newList`, newList)

      const newList_result = _.cloneDeep(newList);
      console.log("newList_result", newList_result);
      console.log("temp_auto_rely_names", this.temp_auto_rely_names);

      const sum = newList_result.concat(this.temp_auto_rely_names);
      const result = _.uniqBy(sum, "field_name"); // 最终总的结果

      const result_values = result.map((item) => item.field_name); // 最终总的结果

      // console.log(`看看结果 对不对`, result)

      // 一把梭增删
      // this.auto_rely_names = result;

      // 按序增删(先filter删除的【原有的基础上】，然后遍历push【新勾选的】)
      this.auto_rely_names = this.auto_rely_names.filter((item) =>
        result_values.includes(item.field_name)
      );
      // console.log(`this.auto_rely_names`, this.auto_rely_names)

      // 遍历push 【非原有的基础上的数据】
      const current_values = this.auto_rely_names.map(
        (item) => item.field_name
      );
      result.forEach((item) => {
        if (!current_values.includes(item.field_name)) {
          this.auto_rely_names.push(item);
        }
      });

      this.dialogTableVisible = false;
    },

    cacheHitFields() {
      const newList_result = _.cloneDeep(newList);
      // console.log('newList_result', newList_result)  // 这里的数据会有不全， 用户未操作到某一页

      const temp_auto_rely_names = _.cloneDeep(this.temp_auto_rely_names);
      // console.log('temp_auto_rely_names', temp_auto_rely_names)  // 用newList_result覆盖，才是最新修改呀

      const result = _.unionBy(
        newList_result,
        temp_auto_rely_names,
        "field_name"
      );
      console.log("result", result);

      const result_values = result.map((item) => item.field_name); // 最终总的结果

      // 1. 在上一次选择结果中  删除用户取消勾选的
      this.auto_rely_names = this.auto_rely_names.filter((item) =>
        result_values.includes(item.field_name)
      );

      // 2. 更新用户保留上一次选择结果中 操作的其他行数据
      this.auto_rely_names.forEach((item) => {
        newList_result.forEach((element) => {
          if (item.field_name === element.field_name) {
            item.temp_only = element.temp_only;
            item.inheritance_options = _.cloneDeep(element.inheritance_options);
          }
        });
      });

      // 3. 遍历push 【添加非原有的基础上的数据】
      const current_values = this.auto_rely_names.map(
        (item) => item.field_name
      );
      result.forEach((item) => {
        if (!current_values.includes(item.field_name)) {
          this.auto_rely_names.push(item);
        }
      });

      this.dialogTableVisible = false;
    },

    handleClose(tag) {
      let index = this.auto_rely_names.findIndex(
        (item) => item.field_name === tag.field_name
      );
      this.auto_rely_names.splice(index, 1);
    },

    handleChangeSearch(val) {
      if (val) {
        const cn_name_result = this.tableData.filter(
          (row) => row.field_name_cn.search(val) !== -1
        );
        const name_result = this.tableData.filter(
          (row) => row.field_name.search(val) !== -1
        );
        if (cn_name_result.length || name_result.length) {
          const result = _.uniqWith(
            cn_name_result.concat(name_result),
            _.isEqual
          );
          this.showTableData = _.cloneDeep(result);
          this.updateChoose();
        }
      } else {
        const temp_data = this.tableData.slice(0, this.pageSize);
        this.page = 1;
        this.showTableData = _.cloneDeep(temp_data);
        this.updateChoose();
      }
    },

    /**
     * PageSize 修改页面默认显示条数
     * */
    handleSizeChange(val) {
      const temp_data = this.tableData.slice(0, val);
      this.showTableData = _.cloneDeep(temp_data);
      this.pageSize = val;
      this.page = 1;

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
    /**
     * 修改页码
     * */
    handleCurrentChange(val) {
      const temp_data = this.tableData.slice(
        (val - 1) * Number(this.pageSize),
        val * Number(this.pageSize)
      );
      this.showTableData = _.cloneDeep(temp_data);
      this.page = val;
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
      // 不能直接强制就让 auto_rely_names 勾选上，他有可能被用户取消啦。

      const newList_names = newList.map((item) => item.field_name);

      this.temp_auto_rely_names.forEach((item) => {
        // 混入用户选择的数据
        if (!newList_names.includes(item.field_name)) {
          newList.push(_.cloneDeep(item));
        }
      });

      let list = [...newList];
      // console.log(`list`, list)
      this.$nextTick(() => {
        this.showTableData.forEach((it, index, arr) => {
          list.forEach((items) => {
            if (items.field_name == it.field_name) {
              it.inheritance_options = _.cloneDeep(items.inheritance_options);
              it.temp_only = items.temp_only;
              this.$refs.multipleTable.toggleRowSelection(it, true);
            }
          });
        });
        // console.log('this.showTableData', this.showTableData)
      });
    },

    /**
     * 批量选中
     * */
    handleSelectionChange(val) {
      // 回显的toggleRowSelection() 也会触发我
      // console.log('勾选和取消事件')
      // console.log(val)

      this.multipleSelection = val;
      this.echoData();
    },
    /**
     * 分页回显必须确定一个唯一健,不能有重复
     *
     * */
    echoData() {
      // alert(`echoData执行了，因为勾选的change`)

      // console.log(`temp_auto_rely_names`, temp_auto_rely_names)

      var temp = [];
      if (this.multipleSelection.length > 0) {
        // 当前表格已有勾选(目标表格，分页后的表格数据中的勾选数据)

        var m = new Map();

        for (let i = 0; i < this.multipleSelection.length; i++) {
          // 遍历 当前表格已有勾选 设置给临时Map
          m.set(
            this.multipleSelection[i].field_name,
            this.multipleSelection[i].field_name
          );
        }

        for (let i = 0; i < this.showTableData.length; i++) {
          // 遍历 当前表格数据(分页后的)  从 临时Map 获取缓存判断 -> 然后缓存然后缓存未勾选的数据(temp)
          if (
            m.get(this.showTableData[i].field_name) == null ||
            !m.get(this.showTableData[i].field_name)
          ) {
            // console.log(`this.showTableData[i]`, this.showTableData[i]) // 这些都是未勾选哒
            temp.push(this.showTableData[i].field_name);
            this.temp_auto_rely_names = this.temp_auto_rely_names.filter(
              (item) => item.field_name !== this.showTableData[i].field_name
            );

            this.showTableData[i]["temp_only"] = "mandatory";
            this.showTableData[i]["inheritance_options"] = [
              {
                name: "optional",
                checked: false,
                cn_desc: "选填",
              },
              {
                name: "mandatory",
                checked: true,
                cn_desc: "必填",
              },
              {
                name: "read",
                checked: false,
                cn_desc: "只读",
              },
            ];
          }
        }
      } else {
        // 当前表格没有勾选 直接缓存然后缓存未勾选的数据(temp)

        for (let i = 0; i < this.showTableData.length; i++) {
          temp.push(this.showTableData[i].field_name);
          this.temp_auto_rely_names = this.temp_auto_rely_names.filter(
            (item) => item.field_name !== this.showTableData[i].field_name
          );

          this.showTableData[i]["temp_only"] = "mandatory";
          this.showTableData[i]["inheritance_options"] = [
            {
              name: "optional",
              checked: false,
              cn_desc: "选填",
            },
            {
              name: "mandatory",
              checked: true,
              cn_desc: "必填",
            },
            {
              name: "read",
              checked: false,
              cn_desc: "只读",
            },
          ];
        }
      }

      // console.log(`看看 this.temp_auto_rely_names 是否更新`, this.temp_auto_rely_names)

      for (let i = 0; i < this.multipleSelection.length; i++) {
        // 遍历 当前表格已有勾选 设置给最外层Map
        map.set(
          this.multipleSelection[i].field_name,
          this.multipleSelection[i]
        );
      }

      for (let i = 0; i < temp.length; i++) {
        // 从最外层Map  中 删除缓存未勾选的数据(temp)
        map.delete(temp[i]);
      }

      var list = [];

      map.forEach(function (key) {
        // 最外层Map 映射成一个新的数组 最终选择。
        list.push(key);
      });

      newList = list;

      // console.log(`map`, map)  // 分页还未切换到 一次性设置不了 总的用户已选择
    },
  },
};
</script>

<style scoped>
</style>