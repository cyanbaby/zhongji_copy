export const crudOptions = () => {
  return {
    rowHandle: {
      width: 140,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '详情',
          emit: 'checkDetail',
          type: 'text',
          size: 'small'
        }
      ]
    },
    pagination: {
      background: false
    },
    options: {
      // border: false,
      // stripe: false,
      headerCellStyle: { 'background-color': '#F7F7F7', border: '1px solid #EBEEF5' }
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '所属组织',
        key: 'orgId',
        show: false,
        type: 'select',
        search: {
          disabled: true,
          slot: true
          // value: '1001',
        }
      },
      {
        title: '年度',
        key: 'years',
        type: 'select',
        width: 80,
        search: {
          disabled: false, // 搜索
          slot: true
        },
        formatter (row, column, value, index) {
          if (row.years == 0) {
            return ''
          }
        }
      },
      {
        title: '班级名称',
        key: 'className',
        width: 400,
        search: {
          disabled: false
        }
      },
      {
        title: '学员人数',
        key: 'totalStudyNum'
      },
      {
        title: '学习完成人数',
        key: 'studyOkCount'
      },
      {
        title: '考试通过人数',
        key: 'examPassCount'
      },
      {
        title: '已获证人数',
        key: 'certOkCount'
      },
      {
        title: '结业学员数',
        key: 'graduateCount'
      },
      {
        title: '结业率',
        key: 'graduateRate'
      },

      {
        title: '工作单位',
        show: false,
        key: 'className',
        search: {
          disabled: true
        }
      },
      {
        title: '所在地区',
        key: 'area',
        show: false,
        search: {
          slot: true
        }
      }
    ]
  }
}
