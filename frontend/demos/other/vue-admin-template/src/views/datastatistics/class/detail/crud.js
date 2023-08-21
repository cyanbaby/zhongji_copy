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
        key: 'studentName',
        search: {
          disabled: false
        }
      },
      {
        title: '手机号',
        key: 'mobile',
        search: {
          disabled: false
        }
      },
      {
        title: '身份证号',
        key: 'idCard',
        show: false,
        search: {
          disabled: false
        }
      },
      {
        title: '身份证号',

        key: 'idcardNu'
      },
      {
        title: '完成课时数',
        key: 'finishStudyTime'
      },
      {
        title: '录播课进度',
        key: 'classHourProgress'
      },
      {
        title: '录播课累计学习时长',
        key: 'videoLearningTimeStr'
      },
      {
        title: '直播课进度',
        key: 'liveHourProgress'
      },
      {
        title: '直播课累计观看时长',
        key: 'liveLearningTimeStr'
      },
      {
        title: '考试状态',
        key: 'isPass',
        type: 'select',
        show: false,
        search: {
          disabled: false,
          value: -1 // 默认选中下拉框
        },
        // rowSlot: true,
        // form: { slot: true },
        dict: {
          data: [
            {
              value: -1,
              label: '全部'
            },
            // {
            //   value: 2,
            //   label: '资格待发放',
            // },
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
        title: '考试结果',
        key: 'examQualification',
        type: 'select',
        show: true,
        // search: {
        //   disabled: false,
        //   value: -1, //默认选中下拉框
        // },
        rowSlot: true,
        // form: { slot: true },
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
        }
      },
      {
        title: '证书状态',
        key: 'certificateStatus',
        type: 'select',
        search: {
          disabled: false,
          value: -1 // 默认选中下拉框
        },
        dict: {
          data: [
            {
              value: -1,
              label: '全部'
            },
            {
              value: 1,
              label: '资格待发放'
            },
            {
              value: 2,
              label: '待申请'
            },
            {
              value: 3,
              label: '待审核'
            },
            {
              value: 4,
              label: '待打印'
            },
            {
              value: 5,
              label: '已打印'
            }
          ]
        }
      },
      {
        title: '证书编号',
        key: 'certificateNum'
      },
      {
        title: '结业状态',
        key: 'graduateStatus',
        type: 'select',
        search: {
          disabled: false,
          value: -1 // 默认选中下拉框
        },
        dict: {
          data: [
            {
              value: -1,
              label: '全部'
            },
            {
              value: 1,
              label: '已结业'
            },
            {
              value: 0,
              label: '未结业'
            }
          ]
        }
      },
      {
        title: '学习状态',
        key: 'studyFinish',
        type: 'select',
        show: false,
        search: {
          disabled: false,
          value: -1 // 默认选中下拉框
        },
        dict: {
          data: [
            {
              value: -1,
              label: '全部'
            },
            {
              value: 2,
              label: '已完成'
            },
            {
              value: 1,
              label: '学习中'
            }
          ]
        }
      },

      {
        title: '工作单位',
        key: 'companyName',
        search: {
          disabled: false
        }
      },
      {
        title: '职务',
        key: 'jobTitle'
      },
      {
        title: '所在地区',
        key: 'area',
        search: {
          slot: true
        }
      },
      {
        title: '入班时间',
        key: 'entryClassTimeStr'
      }
    ]
  }
}
