export default {
  data () {
    return {
      /**
       * @description 被编辑行的索引
       */
      editIndex: 0,
      lineEditor: {
        active: false
      }
    }
  },
  watch: {
    data () {
      if (this.lineEditor.active === true) {
        this.lineEditor.active = false
      }
    }
  },
  methods: {
    /**
     * @description 编辑行数据
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     * @param templage
     */
    handleEdit (index, row, templage = null, modeContext) {
      this.formMode = 'edit'
      this.$emit('dialog-open', {
        mode: 'edit',
        row
      })
      this.editIndex = index
      if (!templage) {
        templage = this.editTemplate
      }
      return this.openDialog(index, row, templage, modeContext)
    },

    async lineEditAdd ({ addData = {}, templage }) {
      if (this.lineEditor.active) {
        this.$message('请先保存或取消上一个行编辑')
        return
      }
      let index = 0
      if (this.options && this.options.lineEdit && this.options.lineEdit.addRow) {
        index = this.options.lineEdit.addRow(this.d2CrudData, addData)
      } else {
        this.d2CrudData.unshift(addData)
      }

      if (this.defaultSort) {
        this.handleSortDataChange()
      }
      this.formMode = 'lineEdit'
      this.editIndex = index
      if (!templage) {
        templage = this.addTemplate
      }
      const { formData, formTemplateStorage } = await this.buildFormData(index, addData, templage)
      this.$set(this, 'lineEditor', {
        active: true,
        index: index,
        form: formData,
        template: formTemplateStorage,
        isAdd: true,
        rules: this.addRules,
        validation: this.options.lineEdit && this.options.lineEdit.validation
      })

      this.$emit('lineEdit.add', { index, data: this.d2CrudData, form: formData, row: addData })
    },
    /**
     * @description 进入行编辑模式
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     * @param templage
     */
    async handleLineEdit (index, row, templage = null) {
      if (this.lineEditor.active) {
        this.$message('请先保存或取消上一个行编辑')
        return
      }
      this.formMode = 'lineEdit'
      this.editIndex = index
      if (!templage) {
        templage = this.editTemplate
      }
      const { formData, formTemplateStorage } = await this.buildFormData(index, row, templage)
      this.$set(this, 'lineEditor', {
        active: true,
        index: index,
        form: formData,
        template: formTemplateStorage,
        rules: this.editRules,
        validation: this.options.lineEdit && this.options.lineEdit.validation
      })
      this.$emit('lineEdit.edit', { index, data: this.d2CrudData, form: formData, row })
    },

    handleLineEditCancel () {
      if (this.lineEditor == null) {
        throw new Error('当前不在行编辑模式')
      }
      this.$emit('lineEdit.cancel', { index: this.lineEditor.index, data: this.d2CrudData })
      if (this.lineEditor.isAdd) {
        this.handleRemoveRow(this.lineEditor.index)
      }
      this.lineEditor.active = false
    },
    handleLineEditSave (index, row) {
      if (this.lineEditor == null) {
        throw new Error('当前不在行编辑模式')
      }
      this.$emit('lineEdit.save', { index: index, data: this.d2CrudData, row })
      if (this.options.lineEdit && this.options.lineEdit.validation) {
        this.$refs.lineEditForm.validate((valid) => {
          if (!valid) {
            return false
          }
          this.doLineEditSave(index, row)
        })
      } else {
        this.doLineEditSave(index, row)
      }
    },
    doLineEditSave (index, row) {
      const rowData = this.buildEditSubmitData()
      if (this.lineEditor.isAdd) {
        const rowData = this.buildAddSubmitData()
        this.$emit('line-add', { index: index, row: rowData }, (param = {}) => {
          this.lineEditor.active = false
          this.handleUpdateRow(index, param.row)
        })
      } else {
        this.$emit('line-edit', {
          index,
          row: rowData
        }, (param = {}) => {
          this.lineEditor.active = false
          this.handleUpdateRow(index, param.row)
        })
      }
    }
  }
}
