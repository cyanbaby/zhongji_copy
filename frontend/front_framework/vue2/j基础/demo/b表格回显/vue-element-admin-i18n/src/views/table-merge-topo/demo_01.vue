<template>
  <div class="content">
    111
    <el-table
      :data="tableData"
      border
      :span-method="objectSpanMethod"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        prop="local_device"
        label="Devie(local)"
        width="325"
      ></el-table-column>
      <el-table-column
        prop="local_trunk_name"
        label="AGGIF(local)"
      ></el-table-column>
      <el-table-column
        prop="local_ifname"
        label="interface(local)"
      ></el-table-column>
      <el-table-column
        prop="remote_ifname"
        label="interface(remote)"
      ></el-table-column>
      <el-table-column
        prop="remote_trunk_name"
        label="AGGIF(remote)"
      ></el-table-column>
      <el-table-column
        prop="remote_device"
        label="Devie(remote)"
        width="325"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
import _ from "lodash";

// 动态显示列
const data_display = [
  {
    title: "Devie(local)",
    value: "local_device",
  },
  {
    title: "AGGIF(local)",
    value: "local_trunk_name",
  },
  {
    title: "Interface(local)",
    value: "local_ifname",
  },
  {
    title: "Interface(remote)",
    value: "remote_ifname",
  },
  {
    title: "AGGIF(remote)",
    value: "remote_trunk_name",
  },
  {
    title: "Devie(remote)",
    value: "remote_device",
  },
];

const spanObj = data_display.reduce((acc, cur) => {
  if (!([cur.value] in acc)) {
    acc[cur.value] = {
      spanArr: [],
      pos: 0,
    };
  }
  return acc;
}, {});

// console.log(spanObj);

export default {
  name: "ElmMergeCell",

  data() {
    return {
      // spanArr: [],
      // pos: 0,
      spanObj: spanObj,

      tableData: [
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.169",
          local_ifname: "100GE2/0/1",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE1/2/0/2",
          local_trunk_name: "Eth-Trunk100",
          remote_trunk_name: "Eth-Trunk206",
        },
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.169",
          local_ifname: "100GE2/0/2",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE2/1/0/26(人工检查)",
          local_trunk_name: "Eth-Trunk100",
          remote_trunk_name: "Eth-Trunk206",
        },
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.169",
          local_ifname: "100GE2/0/3",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE2/2/0/26(人工检查)",
          local_trunk_name: "Eth-Trunk101",
          remote_trunk_name: "Eth-Trunk207",
        },
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.168",
          local_ifname: "100GE2/0/4",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE2/2/0/2(人工检查)",
          local_trunk_name: "Eth-Trunk101",
          remote_trunk_name: "Eth-Trunk207",
        },
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.169",
          local_ifname: "100GE1/0/1",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE1/1/0/2",
          local_trunk_name: "Eth-Trunk102",
          remote_trunk_name: "Eth-Trunk208",
        },
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.169",
          local_ifname: "100GE1/0/2",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE2/1/0/2",
          local_trunk_name: "Eth-Trunk102",
          remote_trunk_name: "Eth-Trunk208",
        },
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.169",
          local_ifname: "100GE1/0/3",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE1/1/0/26(人工检查)",
          local_trunk_name: "Eth-Trunk103",
          remote_trunk_name: "Eth-Trunk209",
        },
        {
          local_ip: "11.197.128.169",
          remote_ip: "11.197.128.18",
          local_device: "cnnorth2c-pod01-ce6865-tor_compute-11.197.128.168",
          local_ifname: "100GE1/0/4",
          remote_device: "cnnorth2c-pod01-ce12808-dsw-11.197.128.18",
          remote_ifname: "100GE1/2/0/26(人工检查)",
          local_trunk_name: "Eth-Trunk103",
          remote_trunk_name: "Eth-Trunk209",
        },
      ],
    };
  },
  created() {
    data_display.forEach((item) => {
      this.getSpanArr(this.tableData, item.value);
    });
  },
  // watch: {
  //   tableData: {
  //     handler() {
  //       data_display.forEach(item => {
  //          this.getSpanArr(this.tableData, item.value);
  //       })

  //     },
  //     immediate: true,
  //   },
  // },
  methods: {
    // 根据条件合并随意行数，因为合并的行数可能是不固定的（传入的data参数为从后台数据数据）
    getSpanArr(data, prop) {
      this.spanObj[prop].spanArr = [];
      this.spanObj[prop].pos = 0;

      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          this.spanObj[prop].spanArr.push(1);
          this.spanObj[prop].pos = 0;
        } else {
          if (data[i][prop] === data[i - 1][prop]) {
            // 如果prop相等就累加，并且push 0 （这里的判断视自己的判定依据改变）
            this.spanObj[prop].spanArr[this.spanObj[prop].pos] += 1;
            this.spanObj[prop].spanArr.push(0);
          } else {
            // 不相等push 1
            this.spanObj[prop].spanArr.push(1);
            this.spanObj[prop].pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 4 ||
        columnIndex === 5
      ) {
        // 用于设置要合并的列 0 表示第一列
        const cRow = this.spanObj[column.property].spanArr[rowIndex];
        const cCol = cRow > 0 ? 1 : 0;
        return {
          rowspan: cRow, // 合并的行数
          colspan: cCol, // 合并的列数，为0表示不显示
        };
      }
    },
  },
};
</script>

<style scoped>
.content {
  padding: 20px;
}
</style>