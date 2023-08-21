<template>
  <view class="demo-wrap">
    <v-table
      :list="tableData"
      :columns="columns"
      :span-method="arraySpanMethod"
    >
    </v-table>
  </view>
</template>

<script>
import vTable from "@/components/vTable/table.vue";

export default {
  components: {
    vTable,
  },
  data() {
    return {
      columns: [
        { title: "ID", key: "id" },
        { title: "姓名", key: "name" },
        { title: "数值 1", key: "amount1" },
        { title: "数值 2", key: "amount2" },
        { title: "数值 3", key: "amount3" },
      ],
      tableData: [
        {
          id: "12987122",
          name: "王小虎0",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎1",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎2",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎3",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎4",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
    };
  },
  methods: {
    arraySpanMethod(row, column, rowIndex, columnIndex) {

      if (rowIndex === 1 && columnIndex === 0) {
        return {
          rowspan: 2,
          colspan: 1,
        };
      }
      if (rowIndex === 2 && columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 1,
        };
      }
      // TODO 一次只能合并一列

      // if (rowIndex === 1 && columnIndex === 1) {
      //   return {
      //     rowspan: 3,
      //     colspan: 1,
      //   };
      // }
      // if (rowIndex === 2 && columnIndex === 1) {
      //   return {
      //     rowspan: 0,
      //     colspan: 1,
      //   };
      // }
      // if (rowIndex === 3 && columnIndex === 1) {
      //   return {
      //     rowspan: 0,
      //     colspan: 1,
      //   };
      // }

      return {
        rowspan: 1,
        colspan: 1,
      };
      
    },
  },
};
</script>

<style>
.demo-wrap {
  padding: 20px 10px;
}
</style>
