export default {
  methods: {
    /**
     * @description 外部暴露的更新单元格数据方法
     */
    updateCell (rowIndex, key, value) {
      this.$set(this.d2CrudData, rowIndex, {
        ...this.d2CrudData[rowIndex],
        [key]: value
      })
    },
    /**
     * @description 外部暴露的新增行方法
     */
    addRow (row) {
      this.handleAddRow(row)
    },
    /**
     * @description 外部暴露的编辑行方法
     */
    updateRow (index, row) {
      this.handleUpdateRow(index, row)
    },
    /**
     * @description 外部暴露的删除行方法
     */
    removeRow (index) {
      this.handleRemoveRow(index)
    },
    /**
     * @description 外部暴露的打开模态框方法
     */
    showDialog ({
      mode,
      rowIndex = 0,
      template = null,
      addData = null,
      modeContext = null
    }) {
      if (mode === 'edit') {
        this.handleEdit(rowIndex, this.d2CrudData[rowIndex], template, modeContext)
      } else if (mode === 'add') {
        this.handleAdd(template, addData, modeContext)
      } else if (mode === 'view') {
        this.handleView(rowIndex, this.d2CrudData[rowIndex], template, modeContext)
      } else {
        let row = addData
        if (rowIndex != null) {
          row = this.d2CrudData[rowIndex]
        }
        this.handleCustomDialog(mode, rowIndex, row, template, modeContext)
      }
    },
    handleCustomDialog (mode, rowIndex, row, template, modeContext) {
      this.formMode = mode
      this.$emit('dialog-open', {
        mode: mode,
        row
      })
      this.editIndex = rowIndex
      if (!template) {
        throw new Error('template不能为空')
      }
      return this.openDialog(rowIndex, row, template, modeContext)
    },
    /**
     * @description 外部暴露的关闭模态框方法
     */
    closeDialog () {
      this.handleCloseDialog()
    },

    /**
     * 获取当前表格数据
     */
    getTableData () {
      return this.$refs.d2Crud.d2CrudData
    }
  }
}
