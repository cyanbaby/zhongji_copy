export const crudOptions = vm => {
  return {
    rowHandle: false,
    indexRow: false, // 无序号
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '学员',
        key: 'photoUrl',
        type: 'avatar-uploader',
        width: 200,
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '学员姓名',
        key: 'studentName',
        show: false,
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
        title: '性别',
        key: 'sex',
        type: 'select',
        width: 60,
        dict: {
          data: [
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '0'
            },
            {
              label: '未知',
              value: '-1'
            }
          ]
        }
      },
      {
        title: '学分',
        key: 'classStudyScore'
      },
      {
        title: '已学/总课程',
        key: 'learnedCourseCount',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '直播',
        key: 'learnedLiveCount',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '考试成绩',
        key: 'testScore',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '证书状态',
        key: 'certStatus'
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
        title: '工作单位',
        key: 'companyName',
        search: {
          disabled: false
        }
      },
      {
        title: '入班方式',
        key: 'entryClassMode',
        width: 80,
        type: 'select',
        dict: {
          data: [
            {
              label: '报名',
              value: '1'
            },
            {
              label: '导入',
              value: '2'
            }
          ]
        }
      },
      {
        title: '移除原因',
        key: 'removeReason',
        show () {
          if (vm.isRenewShow()) {
            return true
          } else return false
        }
      },
      {
        title: '操作',
        key: 'operation',
        width: 150,
        rowSlot: true // 配置启用插槽自定义
      }

    ]
  }
}
