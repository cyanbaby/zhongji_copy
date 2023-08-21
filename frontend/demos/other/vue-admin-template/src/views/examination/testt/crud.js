export const crudOptions = () => {
  return {
    rowHandle: {
      width: 100,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '查看详情',
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
      headerCellStyle: { 'background-color': '#F7F7F7', border: '1px solid #EBEEF5' }
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '考试名称',
        key: 'examName',
        width: 400,
        search: {
          disabled: false
        }
      },
      {
        title: '考试时间',
        align: 'center',
        key: 'startTime',
        width: 300,
        rowSlot: true
      },
      {
        title: '考试状态',
        align: 'center',
        key: 'examStatus',
        width: 110,
        type: 'select',
        dict: {
          data: [
            {
              value: 1,
              label: '待排考'
            }, {
              value: 2,
              label: '待排座'
            }, {
              value: 3,
              label: '待公布准考证'
            }, {
              value: 4,
              label: '待考试'
            }, {
              value: 5,
              label: '考试中'
            }, {
              value: 6,
              label: '待公布成绩'
            }, {
              value: 7,
              label: '考试完成'
            }
          ]
        }
      },
      {
        title: '考生人数',
        align: 'center',
        width: 100,
        key: 'examTotal',
        valueBuilder (row, key) {
          if (row.examTotal == 0) {
            row.examTotal = '--'
          }
        }
      },
      {
        title: '实际参考人数',
        align: 'center',
        width: 110,
        key: 'examExact',
        valueBuilder (row, key) {
          if (row.examExact == 0) {
            row.examExact = '--'
          }
        }
      },
      {
        title: '考试通过人数',
        align: 'center',
        width: 110,
        key: 'examPassNum',
        valueBuilder (row, key) {
          if (row.examPassNum == 0) {
            row.examPassNum = '--'
          }
        }
      },
      {
        title: '通过率',
        align: 'center',
        width: 100,
        key: 'examPassRadioStr',
        rowSlot: true
      },
      {
        title: '平均分',
        align: 'center',
        width: 100,
        key: 'avgTestScore',
        valueBuilder (row, key) {
          if (!row.avgTestScore) {
            row.avgTestScore = '--'
          } else {
            row.avgTestScore = (row.avgTestScore).toFixed(2)
          }
        }
      },
      {
        title: '来源',
        align: 'center',
        key: 'examOrigin',
        valueBuilder (row, key) {
          if (!row.examOrigin) {
            row.examOrigin = '--'
          }
        }
      },
      {
        title: '工作地区',
        key: 'area',
        show: false,
        search: {
          slot: true
        }
      }
    ]
  }
}
