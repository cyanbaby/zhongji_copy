<template>
  <view class="demo-wrap">
    <v-table
      :list="tableData"
      :columns="columns"
      :span-method="arraySpanMethod"
      :slot-cols="['name', 'amount1']"
    >
      <!-- TODO 和 合并的内容 一起显示了, 好消息是 合并后的单元格里只显示了一个 -->
      <!-- <template v-slot="{ row }">
        <view style="font-weight: blod; color: red">
          {{ row.name }}
        </view>
      </template>
      <template v-slot="{ row }">
        <view style="font-weight: blod; color: red">
          {{ row.amount1 }}
        </view>
      </template> -->
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
        { title: "年龄", key: "age" },
        { title: "ID", key: "id" },
        { title: "姓名", key: "name" },
        { title: "数值 1", key: "amount1" },
        { title: "数值 2", key: "amount2" },
        { title: "数值 3", key: "amount3" },
      ],
      tableData: [
        {
          age: 18,
          id: "12987122",
          name: "王小虎0",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          age: 18,
          id: "12987123",
          name: "王小虎1",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          age: 18,
          id: "12987124",
          name: "王小虎2",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          age: 18,
          id: "12987125",
          name: "王小虎3",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          age: 18,
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
      // console.log(column)
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
      // return {
      //   rowspan: 1,
      //   colspan: 1,
      // };

      // TODO
      // 这里的合并是实现了，但是和elementUI效果不一样，elementUI是正确的，这里先return 的{ rowspan: 0, colspan: 0,  }, 会
      // 看起来合并了，其实没有合并，只是没有给底色而已

      if (columnIndex === 0) {
        if (
          rowIndex > 0 &&
          row[column.key] === this.tableData[rowIndex - 1][column.key]
        ) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        } else {
          let rows = 1;
          for (let i = rowIndex; i < row.length; i++) {
            if (row[column.key] === row[i + 1][column.key]) {
              rows++;
            }
          }

          return {
            rowspan: rows,
            colspan: 1,
          };
        }
      }

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
