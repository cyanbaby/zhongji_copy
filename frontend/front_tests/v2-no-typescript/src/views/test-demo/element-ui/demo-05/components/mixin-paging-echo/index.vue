<template>
  <div style="margin: 15px;">
    <h3>混入默认回显</h3>
    <ol>
      <li>模拟请求，混入原理</li>
    </ol>
    <el-table
      ref="multipleTable"
      :data="showTableData"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      border>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>

    <div style="text-align:left; margin-top: 15px;">
      <el-button @click="consoleLastSelection()">查看最终勾选数据是否正确【手动】</el-button>
      <pre v-text="auto_rely_names"></pre>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'
import tableData from './tableData'

var map = new Map();
var newList = [];

export default {
  name: 'TestElementUiDemo07View',
  data(){
    return {
      tableData: tableData,

      showTableData:[],

      currentPage: 1, //这个属性是页面加载时分页组件默认选中的页码
      pageTotal:0,
      pageSize: 5,
      multipleSelection: [],

      // tip 待混入的默认值， 也就是最终选择的数据(那么意味着每次获得分页数据，不管是多少页都需要把它考虑进去)
      auto_rely_names: [
        {
          id:'1',
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id:'26',
          date: '2016-05-03',
          name: '王小虎26',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],      
      // tip 组件的缓存数据(其实和外部的  map,newList 机制差不多)
      temp_auto_rely_names: [],
    }
  },
  mounted(){
    this.pageTotal = this.tableData.length;
    // this.showTableData = [ this.tableData[0] ] // 初始化默认赋值,为1条数据
    // this.showTableData = [ this.tableData[0] ] // 初始化默认赋值,为1条数据
    // todo 模拟用户首次请求
    this.showTableData = this.tableData.slice(0, 5)
    
    // 第一个页面的表格回显不用考虑清空，但是updateChoose()每个分页表格页面都要执行
    this.temp_auto_rely_names = _.cloneDeep(this.auto_rely_names);
    // 更新当前分页选中
    this.updateChoose()
  },
  methods:{
    consoleLastSelection() {
      const newList_result = _.cloneDeep(newList)
      // console.log('newList_result', newList_result)  // 这里的数据会有不全， 用户未操作到某一页
      
      const temp_auto_rely_names = _.cloneDeep(this.temp_auto_rely_names)
      // console.log('temp_auto_rely_names', temp_auto_rely_names)  // 用newList_result覆盖，才是最新修改呀

      const result = _.unionBy(newList_result, temp_auto_rely_names, 'id')
      // console.log('result', result)

      const result_values = result.map(item => item.id)  // 最终总的结果
      
      // 1. 在上一次选择结果中  删除用户取消勾选的
      this.auto_rely_names = this.auto_rely_names.filter(item => result_values.includes(item.id))
      

      // 3. 遍历push 【添加非原有的基础上的数据】
      const current_values = this.auto_rely_names.map( item => item.id)
      result.forEach(item => {
        if(!current_values.includes(item.id)) {
          this.auto_rely_names.push(item)
        }
      })
      // tip 当前方法是拿模态框嵌套表格的demo改造的(减法)的，不考虑数据流和外部el-tag的dagre动画，获取最终勾选不用这么复杂
      console.log('最终选择的数据', this.auto_rely_names)
    },
    /**
     * PageSize 修改页面默认显示条数
     * */
    handleSizeChange(val) {
      this.showTableData = this.tableData.slice(0,val);
      this.pageSize = val;

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

      this.updateChoose()
    },
    /**
     * 批量选中
     * */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.echoData()
    },

    updateChoose() {
      // alert(1)

      // 不能直接强制就让 auto_rely_names 勾选上，他有可能被用户取消啦。

      const newList_names = newList.map(item => item.id);

      this.temp_auto_rely_names.forEach(item => {  // 混入用户选择的数据
        if(!newList_names.includes(item.id)) {
          newList.push(_.cloneDeep(item))
        }
      })
      

      let list = [...newList];
      // console.log(`list`, list)
      this.$nextTick(()=>{
        this.showTableData.map(it =>{
          list.map(items=>{
            if (items.id == it.id){
              this.$refs.multipleTable.toggleRowSelection(it, true)
            }
          })
        })
      })
      
    },

    /**
     * 分页回显必须确定一个唯一健,不能有重复
     *
     * */
    echoData(){
      var temp = [];
      if(this.multipleSelection.length>0){
        var m = new Map();
        for (let i = 0; i < this.multipleSelection.length; i++) {
          m.set(this.multipleSelection[i].id,this.multipleSelection[i].id);
        }
        for (let i = 0; i < this.showTableData.length; i++) {
          if( m.get(this.showTableData[i].id) == null || !m.get(this.showTableData[i].id)){
            temp.push(this.showTableData[i].id);
            // tip 更新temp
            this.temp_auto_rely_names = this.temp_auto_rely_names.filter(item => item.id !== this.showTableData[i].id);
          }
        }
      }else{
        for (let i = 0; i < this.showTableData.length; i++) {
          temp.push(this.showTableData[i].id);
            // tip 更新temp
          this.temp_auto_rely_names = this.temp_auto_rely_names.filter(item => item.id !== this.showTableData[i].id);
        }
      }

      for (let i = 0; i <this.multipleSelection.length ; i++) {
        map.set(this.multipleSelection[i].id,this.multipleSelection[i]);
      }
      for (let i = 0; i <temp.length ; i++) {
        map.delete(temp[i]);
      }
      var  list = [];
      map.forEach(function(key){
        list.push(key)
      })
      newList = list;
    }
  }
}
</script>

<style scoped>

</style>