export const crudOptions = () => {
  return {
    rowHandle: {
      width: 80,
      dropdown: false,
      remove: { show: false },
      edit: { show: false },
      custom: [
        {
          text: '答题记录',
          emit: 'detailInfo',
          type: 'text',
          size: 'small'
        }
      ]
    },
    // indexRow: true,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '姓名',
        key: 'studentName',
        width: 200,
        search: {
          disabled: false
        },
        valueBuilder (row, key) {
          if (!row.studentName) {
            row.studentName = '--'
          }
        }
      },
      {
        title: '手机号',
        align: 'center',
        key: 'mobile',
        width: 200,
        search: {
          disabled: false
        },
        valueBuilder (row, key) {
          if (!row.mobile) {
            row.mobile = '--'
          }
        }
      },
      {
        title: '身份证号',
        align: 'center',
        width: 200,
        key: 'certNo',
        search: {
          disabled: false
        },
        valueBuilder (row, key) {
          if (!row.certNo) {
            row.certNo = '--'
          }
        }
      },
      {
        title: '总成绩',
        align: 'center',
        width: 100,
        key: 'testScore',
        rowSlot: true
      },
      {
        title: '最新考试时间',
        align: 'center',
        key: 'updateTime',
        width: 180,
        type: 'datetime'
      },
      {
        title: '工作单位',
        key: 'companyName',
        search: {
          disabled: false
        },
        valueBuilder (row, key) {
          if (!row.companyName) {
            row.companyName = '--'
          }
        }
      },
      {
        title: '所属地区',
        key: 'province',
        search: {
          slot: true
        }
      }
    ]
  }
}
