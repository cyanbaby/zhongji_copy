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
      // border: false,
      // stripe: false,
      headerCellStyle: { 'background-color': '#F7F7F7', border: '1px solid #EBEEF5' }
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [

      {
        title: '年度',
        key: 'goodsYear',
        type: 'select',
        align: 'center',
        width: 100,
        valueBuilder (row, key) {
          if (row.goodsYear == 0) {
            row.goodsYear = ''
          }
        }
      },
      {
        title: '年度',
        key: 'years',
        width: 100,
        show: false,
        search: {
          disabled: false, // 搜索
          slot: true,
          value: '' // 默认选中下拉框
        }
      },
      {
        title: '课程名称',
        key: 'goodsValue',
        width: 400,
        search: {
          disabled: false
        }
      },
      {
        title: '学员人数',
        key: 'totalStudyNum',
        align: 'center'

      },
      {
        title: '学习完成人数',
        key: 'studyOkCount',
        align: 'center'

      },
      {
        title: '考试通过人数',
        key: 'examPassCount',
        align: 'center'

      },
      {
        title: '课程完成人数',
        key: 'studyCompleteCount',
        align: 'center'

      },

      {
        title: '完成率',
        key: 'completeRate',
        align: 'center'

      },
      // {
      //   title: '所属组织',
      //   key: 'companyName',
      //   align: 'center',
      //   type: 'select',
      //   search: {
      //     slot: true
      //     // value: '1001',
      //   }

      // },
      // {
      //   title: '所属组织',
      //   key: 'orgId',
      //   align: 'center',
      //   show: false,
      //   type: 'select',
      //   search: {
      //     disabled: false,
      //     slot: true
      //     // value: '1001',
      //   }
      // },
      {
        title: '学员地区',
        key: 'area',
        show: false,
        search: {
          slot: true
        }
      }
    ]
  }
}
