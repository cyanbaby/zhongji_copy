<template>
  <div>
    <el-table :data="listData" border style="width: 100%" max-height="500">
      <template v-for="(item, i) in listAttrs">
        <el-table-column v-if="item.isListShow == 1" :key="i" :prop="item.fieldCode"
          :label="item.fieldName" :sortable="item.canSort == 1">
          <template slot-scope="scope">
            <div v-if="item.frontControll == 'image'">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row[item.fieldCode]"
                :preview-src-list="[scope.row[item.fieldCode]]">
              </el-image>
            </div>

            <div v-else-if="item.frontControll == 'dict'">
              {{scope.row[item.fieldCode+'Label']}}
            </div>
            <div v-else>{{scope.row[item.fieldCode]}}</div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ListBox',
  data () {
    return {
      listData: []
    }
  },
  props: ['tableData', 'structure'],
  computed: {
    listAttrs () {
      if (
        this.structure &&
        this.structure.default &&
        this.structure.default.attrs
      ) {
        return this.structure.default.attrs
      } else {
        return []
      }
    }
  },
  mounted () {
    this.refreshTableData()
  },
  methods: {
    refreshTableData () {
      const arr = []
      if (this.tableData) {
        this.tableData.forEach((d) => {
          const row = {}
          this.listAttrs.forEach((a) => {
            if (a.frontControll == 'dict') {
              row[a.fieldCode + 'Label'] = d[a.fieldCode + 'Label']
            }
            row[a.fieldCode] = d[a.fieldCode]
          })
          arr.push(row)
        })
      }
      this.listData = arr
    }
  }
}
</script>

<style>

</style>
