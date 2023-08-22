<template>
  <div>
    <h3>简单模态回显</h3>
    <ol>
      <li>模拟请求，数据流向</li>
    </ol>

    <div style="text-align: left;padding: 15px 0 0 15px;">
      <el-button type="primary"  @click="clickOpenButton">查看模态表格</el-button>
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

    <el-dialog title="表格回显" :visible.sync="dialogTableVisible">
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
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20, 50, 100]"
        :page-size="pageSize"
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
import tableData from './tableData'

var map = new Map();
var newList = [];

export default {
  name: 'TestElementUiDemo09View',
  components: {
    draggable
  },
  data(){
    return {
      tableData: tableData,

      showTableData:[],

      currentPage: 1, //这个属性是页面加载时分页组件默认选中的页码
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
      this.pageSize = val;
      this.showTableData = this.tableData.slice(0,val);

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
      this.currentPage = val
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