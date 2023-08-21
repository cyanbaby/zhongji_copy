export const crudOptions = () => {
  return {
    rowHandle: {
      width: 80,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '查看详情',
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
        align: 'center',
        width: 100,
        key: 'studentName',
        search: {
          disabled: false,
          order: 1,
          width: 235
        },
        valueBuilder (row, key) {
          if (!row.studentName) {
            row.studentName = '--'
          }
        }
      },
      {
        title: '手机号',
        key: 'mobile',
        align: 'center',
        width: 120,
        search: {
          disabled: false,
          order: 2,
          width: 235
        },
        valueBuilder (row, key) {
          if (!row.mobile) {
            row.mobile = '--'
          }
        }
      },
      {
        title: '身份证号',
        key: 'idcardNu',
        align: 'center',
        width: 200,
        valueBuilder (row, key) {
          if (!row.idcardNu) {
            row.idcardNu = '--'
          }
        }
      },
      {
        title: '身份证号',
        key: 'idcard',
        align: 'center',
        width: 160,
        show: false,
        search: {
          disabled: false,
          order: 3,
          width: 235
        }
      },
      {
        title: '累计学习时长',
        key: 'studyTimeSecondStr',
        align: 'center',
        width: 110,
        valueBuilder (row, key) {
          if (!row.studyTimeSecondStr) {
            row.studyTimeSecondStr = '--'
          }
        }
      },
      {
        title: '有效时长',
        key: 'studyEffectiveTimeStr',
        align: 'center',
        width: 100,
        valueBuilder (row, key) {
          if (!row.studyEffectiveTimeStr) {
            row.studyEffectiveTimeStr = '--'
          }
        }
      },
      {
        title: '学习进度',
        key: 'learningProgressStr',
        align: 'center',
        width: 100,
        valueBuilder (row, key) {
          if (!row.learningProgressStr) {
            row.learningProgressStr = '--'
          }
        }
      },
      {
        title: '首次学习时间',
        key: 'firstStudyTimeStr',
        align: 'center',
        width: 180,
        valueBuilder (row, key) {
          if (!row.firstStudyTimeStr) {
            row.firstStudyTimeStr = '--'
          }
        }
      },
      {
        title: '最近学习时间',
        key: 'lastStudyTimeStr',
        align: 'center',
        width: 180,
        valueBuilder (row, key) {
          if (!row.lastStudyTimeStr) {
            row.lastStudyTimeStr = '--'
          }
        }
      },

      {
        title: '考试结果',
        key: 'examQualification',
        align: 'center',
        width: 130,
        type: 'select',
        dict: {
          data: [
            {
              value: 0,
              label: '资格待发放'
            },
            {
              value: 1,
              label: '待考试'
            }
          ]
        },
        rowSlot: true
      },
      {
        show: false,
        title: '结业状态',
        key: 'graduateStatus',
        align: 'center',
        type: 'select',
        width: 100,
        search: {
          disabled: false,
          value: null, // 默认选中下拉框
          order: 6
          // width: 207
        },
        dict: {
          data: [
            {
              value: null,
              label: '全部'
            },
            {
              value: 0,
              label: '未结业'
            },
            {
              value: 1,
              label: '已结业'
            }
          ]
        }
      },
      {
        title: '完成状态',
        key: 'graduateStatus',
        align: 'center',
        type: 'select',
        width: 100,
        dict: {
          data: [
            {
              value: null,
              label: '全部'
            },
            {
              value: 0,
              label: '未结业'
            },
            {
              value: 1,
              label: '已结业'
            }
          ]
        }
      },
      {
        show: false,
        title: '学习状态',
        key: 'studyFinish',
        align: 'center',
        type: 'select',
        width: 100,
        search: {
          disabled: false,
          value: null, // 默认选中下拉框
          order: 7
          // width: 221
        },
        dict: {
          data: [
            {
              value: null,
              label: '全部'
            },
            {
              value: 1,
              label: '学习中'
            },
            {
              value: 2,
              label: '已完成'
            }
          ]
        }
      },
      {
        title: '类型',
        key: 'studentSourceType',
        align: 'center',
        width: 110,
        search: {
          disabled: false,
          value: null,
          order: 4,
          width: 235
        },
        type: 'select',
        dict: {
          data: [
            {
              value: null,
              label: '全部'
            },
            {
              value: 1,
              label: '班级学员'
            },
            {
              value: 2,
              label: '课程学员'
            }
          ]
        }
      },
      {
        title: '考试状态',
        key: 'isPass',
        align: 'center',
        width: 100,
        type: 'select',
        show: false,
        search: {
          disabled: false,
          value: null,
          order: 8
          // width: 235
        },
        dict: {
          data: [
            {
              value: null,
              label: '全部'
            },
            {
              value: 0,
              label: '待考试'
            },
            {
              value: 1,
              label: '合格'
            },
            {
              value: 2,
              label: '不合格'
            }
          ]
        }
      },
      {
        title: '工作单位',
        key: 'companyName',
        align: 'center',
        width: 150,
        search: {
          disabled: false,
          order: 9,
          // width: 207
          width: 235
        }
      },
      {
        title: '所在地区',
        key: 'area',
        align: 'center',
        width: 200,
        search: {
          slot: true,
          order: 10
        }
      },
      {
        title: '购课时间',
        key: 'gmtCreateStr',
        align: 'center',
        width: 200,
        valueBuilder (row, key) {
          if (!row.gmtCreateStr) {
            row.gmtCreateStr = '--'
          }
        },
        search: {
          slot: true,
          order: 5
        }
      }
    ]
  }
}
