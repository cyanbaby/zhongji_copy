<template>
  <div>
    <dl>
      <dt style="margin-bottom: 15px">表格计算</dt>
      <dd>
        <el-button type="primary" size="small" @click="handleClickAdd">
          弹窗新增
        </el-button>
        <el-button type="primary" plain size="small" @click="handleClickAddRow">
          新增空行
        </el-button>
        <el-button type="info" plain size="small" @click="handleClickReset">
          重置表格
        </el-button>
      </dd>
    </dl>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="Actions">
        <template slot-scope="{ $index, row }">
          <template v-if="row.edit">
            <el-button
              type="success"
              size="small"
              icon="el-icon-check"
              @click="confirmEdit()"
            >
              保存
            </el-button>
            <el-button
              style="margin-left: 15px"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <template v-else>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleClickLeftEdit($index, row)"
            >
              编辑
            </el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <div style="display: flex">
              <el-input
                v-model="row_copy.name"
                class="edit-input"
                size="small"
              />
            </div>
          </template>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <div style="display: flex">
              <el-input
                v-model="row_copy.age"
                class="edit-input"
                size="small"
              />
            </div>
          </template>
          <span v-else>{{ row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="income" label="收入">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <div style="display: flex">
              <el-input
                v-model="row_copy.income"
                class="edit-input"
                size="small"
              />
            </div>
          </template>
          <span v-else>{{ row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" label="支出">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <div style="display: flex">
              <el-input
                v-model="row_copy.expend"
                class="edit-input"
                size="small"
              />
            </div>
          </template>
          <span v-else>{{ row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="计算结果">
        <template slot-scope="{ $index }">
          <!-- <span v-if="$index === 0">{{ calc_result }}</span> -->
          <span v-if="$index === 0">{{ calcResFixed }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible">
      <el-form :model="row_copy" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="row_copy.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="row_copy.age"></el-input>
        </el-form-item>
        <el-form-item label="收入">
          <el-input v-model="row_copy.income"></el-input>
        </el-form-item>
        <el-form-item label="支出">
          <el-input v-model="row_copy.expend"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep, mean } from 'lodash'
import NP from 'number-precision'

const tableData = [
  {
    name: '小明',
    age: 1,
    income: 1,
    expend: 1
  },
  {
    name: '小红',
    age: 2,
    income: 2,
    expend: 2
  },
  {
    name: '小雷',
    age: 3,
    income: 3,
    expend: 3
  },
  {
    name: '小花',
    age: 4,
    income: 4,
    expend: 4
  },
  {
    name: '包子',
    age: 5,
    income: 5,
    expend: 5
  }
]

/**
 * @description 左侧操作，点击编辑 √
 * @return void
 */
const fixed2Number = (x) => {
  let s = x.toString() // 把一个逻辑值转换为字符串，并返回结果；
  let rs = s.indexOf('.') // 返回某个指定的字符串值在字符串中首次出现的位置；如果字符串值没有出现，返回-1；

  // 没有小数点时：
  if (rs < 0) {
    // console.log('没有小数点时：')
    rs = s.length
    s += '.'
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  } else {
    const [v] = s.match(/^\d+(?:\.\d{0,2})?/)
    return v || x
  }
}

export default {
  name: 'TestVue2Demo02View',
  data() {
    return {
      // 弹窗控制器
      dialogFormVisible: false,

      // 弹窗名
      dialogName: '编辑行',

      // 弹窗状态: 编辑 或者 新增 或者 为空
      dialogState: '',

      // 表格数据
      tableData: tableData,

      // 当前正在编辑的行索引
      currentEditIndex: -1,

      // 正在编辑的行 备份
      row_copy: {},

      // 计算结果
      calc_result: 0
    }
  },
  computed: {
    calcResFixed() {
      return fixed2Number(this.calc_result)
    }
  },
  created() {
    this.init()
  },
  methods: {
    /**
     * @description 初始化表格 √
     * @return void
     */
    init() {
      // 给所有行初始化一个响应式数据 edit 标识 √
      this.tableData = cloneDeep(tableData).map((row) => {
        row.edit = false
        return row
      })
    },
    /**
     * @description 左侧操作，点击编辑 √
     * @return void
     */
    handleClickLeftEdit(index, row) {
      this.row_copy = cloneDeep(row)

      this.tableData.forEach((row) => {
        row.edit = false
      })
      row.edit = true

      this.currentEditIndex = index
    },

    /**
     * @description 左侧操作，点击取消 √
     * @return void
     */
    cancelEdit(row) {
      row.edit = false

      this.row_copy = {}
      this.currentEditIndex = -1

      this.$message({
        message: '行已恢复',
        type: 'warning'
      })
    },

    /**
     * @description 左侧操作，点击保存 √
     * @return void
     */
    confirmEdit() {
      this.tableData.splice(this.currentEditIndex, 1, this.row_copy)
      this.$message({
        message: '行已经更新',
        type: 'success'
      })
    },

    /**
     * @description 右侧操作，点击编辑 √
     * todo: if edit & add  如果新增和编辑共用弹窗的话，注意区分。
     * @return void
     */
    handleEdit(index, row) {
      // this.dialogName = '编辑行'
      this.currentEditIndex = index

      if (row.edit) {
        row.edit = false
      }

      this.row_copy = cloneDeep(row)
      this.dialogName = '编辑行'
      this.dialogState = '编辑'
      this.dialogFormVisible = true
    },

    /**
     * @description 右侧操作，点击删除 √
     * @return void
     */
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
      this.$message({
        message: '行已删除',
        type: 'success'
      })
    },

    /**
     * @description 弹窗操作，点击确定保存 √
     * todo: if edit & add  如果新增和编辑共用弹窗的话，注意区分。
     * @return void
     */
    save() {
      const message = this.dialogState === '新增' ? '行已新增' : '行已更新'

      if (this.dialogState === '新增') {
        this.tableData.push(this.row_copy)
      } else {
        this.tableData.splice(this.currentEditIndex, 1, this.row_copy)
      }

      this.$message({
        message,
        type: 'success'
      })
      this.dialogFormVisible = false
    },

    /**
     * @description 弹窗操作，点击取消 √
     * @return void
     */
    cancel() {
      this.row_copy = {}
      this.currentEditIndex = -1
      this.dialogFormVisible = false
    },

    /**
     * @description 顶部操作，弹窗新增 √
     * @return void
     */
    handleClickAdd() {
      this.dialogName = '新增行'
      this.dialogState = '新增'
      this.dialogFormVisible = true
      this.row_copy = {
        edit: false
      }
    },

    /**
     * @description 顶部操作，新增空行 √
     * @return void
     */
    handleClickAddRow() {
      this.row_copy = {}
      this.currentEditIndex = -1

      this.tableData.forEach((row) => {
        row.edit = false
      })

      this.tableData.push({
        edit: true
      })
    },

    /**
     * @description 顶部操作，重置 √
     * @return void
     */
    handleClickReset() {
      // 弹窗控制器
      this.dialogFormVisible = false

      // 弹窗名
      this.dialogName = '编辑行'

      // 弹窗状态:编辑 或者 新增 或者 为空
      this.dialogState = ''

      // 表格数据
      this.tableData = tableData

      // 当前正在编辑的行索引
      this.currentEditIndex = -1

      // 正在编辑的行 备份
      this.row_copy = {}

      // 计算结果
      this.calc_result = 0

      this.init()
      this.$message({
        message: '表格重置成功！',
        type: 'success'
      })
    },

    /**
     * @description 计算平均值 √
     * @return {Number}
     */
    calcResult() {
      // 表格需要参与计算的key
      const dialogKeys = ['age', 'income', 'expend']

      const lastRow = dialogKeys.map((key) => {
        let isCalc = false
        let colCount = 0
        let n = 0

        this.tableData.forEach((row) => {
          if (
            row[key] === undefined ||
            row[key] === null ||
            row[key].toString().replace(/\s*/g, '') === ''
          ) {
            console.log('单元格数据不存在')
          } else {
            isCalc = true
            colCount = NP.plus(colCount, Number(row[key]))
            n += 1
          }
        })
        // console.log(colCount)

        const averageValue = NP.divide(colCount, n)
        // console.log(typeof averageValue) // number, 如果涉及高精度数值保存的话 显示请用其他变量映射(例: computed)
        console.group(`${key}列`)
        console.log('平均数', averageValue)
        console.groupEnd()

        return isCalc ? [averageValue] : []
      })

      return mean(lastRow.flat())
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler(val) {
        this.calc_result = this.calcResult()
      },
      immediate: true
    }
  }
}
</script>

<style></style>
