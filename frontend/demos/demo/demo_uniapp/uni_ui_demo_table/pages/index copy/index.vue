<template>
  <view class="demo-wrap">
    <v-table
      v-if="isShow"
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

const tableMergeMap = new Map()

export default {
  components: {
    vTable,
  },
  data() {
    return {
      isShow: false,
      columns: [
        { title: "姓名", key: "name" },
        { title: "年龄", key: "age" },
        { title: "数值 1", key: "amount1" },
        { title: "数值 2", key: "amount2" },
        { title: "数值 3", key: "amount3" },
        // { title: "ID", key: "id" },
      ],
      tableData: [
        {
          id: "12987122",
          name: "王小虎0",
          age: 18,
          amount1: "234",
          amount2: "30",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎0",
          age: 18,
          amount1: "234",
          amount2: "30",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎2",
          age: 19,
          amount1: "235",
          amount2: "30",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎3",
          age: 16,
          amount1: "621",
          amount2: "30",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎3",
          age: 16,
          amount1: "539",
          amount2: "30",
          amount3: 15,
        },
      ],
      columnsCooy: [],
      tableDataCopy: [],
    };
  },
  created() {
    
    function initRowSpan(key, columnIndex) {

      const values = this.tableDataCopy.map(row => row[key])

      let prev, startRowIndex

      values.forEach((value, rowIndex) => {
        if(rowIndex === 0) {
          tableMergeMap.set(columnIndex+'__postion__'+rowIndex, {
            value,
            rowspan: 1,
            colspan: 1,
          })
          startRowIndex = rowIndex
        } else {
          if (prev === value) {
            // 这里是必然存在
            const obj = tableMergeMap.get(columnIndex+'__postion__'+startRowIndex)
            obj.rowspan += 1
            tableMergeMap.set(columnIndex+'__postion__'+startRowIndex, obj)

            tableMergeMap.set(columnIndex+'__postion__'+rowIndex, {
              value,
              rowspan: 0,
              colspan: 1,
            })
          } else {
            startRowIndex = rowIndex
            tableMergeMap.set(columnIndex+'__postion__'+rowIndex, {
              value,
              rowspan: 1,
              colspan: 1,
            })
          }
        }
        prev = value

        // tableMergeMap.set(columnIndex+'__postion__'+rowIndex, {
        //   value,
        //   rowspan: 1,
        //   colspan: 1,
        // })
      });

    }
    this.columnsCooy = JSON.parse(JSON.stringify(this.columns));
    this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData))

    // .map(
    //   (row) => {
    //     for (var key in row) {
    //       const value = row[key];
    //       row[key] = {
    //         value,
    //         rowspan: 1,
    //         colspan: 1,
    //       };
    //     }
    //     return row;
    //   }
    // );

    // 先穷举 在循环, 写死 columnIndex
    // initRowSpan.call(this,"age", 0);
    // initRowSpan.call(this,"amount1", 3);
    // initRowSpan.call(this,"amount2", 4);
    initRowSpan.call(this,"name", 0);
    initRowSpan.call(this,"age", 1);
    initRowSpan.call(this,"amount1", 2);
    initRowSpan.call(this,"amount2", 3);
    initRowSpan.call(this,"amount3", 4);
    console.log(tableMergeMap)
    this.isShow = true;

    // console.log(this.tableDataCopy)
  },
  methods: {
    arraySpanMethod(row, column, rowIndex, columnIndex) {
      
      const obj= tableMergeMap.get(columnIndex+'__postion__'+rowIndex)
      console.log(obj)

      if(columnIndex === 0) {
        return obj
      } else {
         if(columnIndex === 1) {
            return obj
         } else {
          return { rowspan: 1, colspan: 1  }
         }
      }

      return { rowspan: 1, colspan: 1  }

    },
  },
};
</script>

<style>
.demo-wrap {
  padding: 20px 10px;
}
</style>
