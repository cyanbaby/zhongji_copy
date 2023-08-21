<template>
  <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
    <template slot="header">
      <span class="page-title">{{ $route.meta.title }}</span>
      <d2-helper title="帮助文档">
        <div>
          <d2-link-btn
            title="文档链接"
            link="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html"
          />
        </div>
      </d2-helper>
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @checkDetail="checkDetail"
    >
      <div slot="header" style="position: relative">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
          @reset="resetSearch"
        >
          <template slot="addressCodeSearchSlot">
            <el-cascader
              v-model="address"
              :options="options"
              :props="props"
              clearable
            />
          </template>
          <template slot="yearsSearchSlot" slot-scope="scope">
            <el-date-picker
              v-model="scope.form.years"
              type="year"
              placeholder="选择年"
              value-format="yyyy"
            />
          </template>
        </crud-search>
        <div class="export-btn">
          <el-button
            size="small"
            type="primary"
            style="margin-bottom: 10px; float: right; margin-right: 20px"
            @click="exportBtn"
          >导出</el-button>
        </div>
      </div>
      <template slot="startTimeSlot" slot-scope="scope">
        {{ parseTime(scope.row.startTime) }}
      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
/* eslint-disable */

import { crudOptions } from "./crud";
import { d2CrudPlus } from "d2-crud-plus";
import { parseTime } from "@/utils/index";

export default {
  mixins: [d2CrudPlus.crud],
  data() {
    return {
      address: [],
      options: [],
      props: {
        value: "areaCode",
        label: "name",
        checkStrictly: true,
      },
      years: "",
      isDataPermission: "",
    };
  },
  created() {
    this.doRefresh();
    this.$api.CHECK_DATA_PERMISSION().then((res) => {
      this.isDataPermission = res.data;
      if (this.isDataPermission) {
        // 自定义配置
        this.$api.GET_USER_AREA().then((res) => {
          if (res.data && res.data.length > 0) {
            this.options = res.data;
            console.log("options", this.options);
          }
        });
      } else {
        // 全部地区选择
        this.$api.getArea().then((res) => {
          if (res && res.length > 0) {
            this.options = res;
            console.log("options", this.options);
          }
        });
      }
    });
  },
  methods: {
    parseTime,
    // 导出
    exportBtn() {
      const searchData = this.getSearch().getForm();
      this.$api
        .LIVE_STATISTICS_LIVELISTIMPORT({
          ...searchData,
        })
        .then((res) => {
          window.location = res.data;
        });
    },
    doLoad() {},
    // crud配置
    getCrudOptions() {
      return crudOptions(this);
    },
    // 查询
    pageRequest(query) {
      if (this.address.length > 0) {
        this.addressCode = this.address[this.address.length - 1];
        this.level = this.address.length - 1;
        query.addressCode = this.addressCode;
        query.level = this.level;
      }

      if (query.orgId >= 0) {
        query.orgId = query.orgId;
      } else {
        // query.orgId = '';
      }
      return this.$api.LIVE_STATISTICS_LIVELIST(query);
    },
    // 详情
    checkDetail({ row }) {
      const liveChannelId = row.liveChannelId;
      this.$router.push({
        path: "/live/livetudydetail",
        query: { liveChannelId },
      });
    },
    resetSearch() {
      this.address = [];
      this.addressCode = undefined;
      this.level = undefined;
    },
  },
};
</script>
<style scoped>
.export-btn {
  width: 100px;
  position: absolute;
  top: 10px;
  right: 0;
}
</style>
