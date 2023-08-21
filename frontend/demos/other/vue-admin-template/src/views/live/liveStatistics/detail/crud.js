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
        key: 'name',
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
        title: '学习完成状态',
        key: 'isFinish',
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              value: '已完成',
              label: '已完成'
            },
            {
              value: '未完成',
              label: '未完成'
            }
          ]
        }
      },
      {
        title: '总学习时长',
        key: 'watchTime'
      },
      {
        title: '直播观看时长',
        key: 'watchLiveTime'
      },
      {
        title: '回放观看时长',
        key: 'watchVideoTime'
      },
      {
        title: '工作单位',
        key: 'companyName',
        search: {
          disabled: false
        }
      },
      {
        title: '所在地区',
        key: 'region', // area
        search: {
          slot: true
        }
      },
      {
        title: '发言',
        key: 'numberOfSpeeches'
      },

      {
        title: '签到次数/总次数',
        key: 'proportion1'
      },
      {
        title: '答题次数/总次数',
        key: 'proportion2'
      },
      {
        title: '问卷提交数/总问卷数',
        key: 'proportion3',
        width: 140
      },
      {
        title: '首次进入时间',
        key: 'firstActiveTime'
      },
      {
        title: '来源',
        key: 'audienceSourceTypeEnum',
        type: 'select',
        dict: {
          data: [
            {
              value: 0,
              label: '无限制'
            },
            {
              value: 1,
              label: '登录'
            },
            {
              value: 2,
              label: '验证码观看'
            },
            {
              value: 3,
              label: '白名单观看'
            },
            {
              value: 4,
              label: '付费观看'
            },
            {
              value: 5,
              label: '名单导入'
            },
            {
              value: 6,
              label: '白名单'
            },
            {
              value: 7,
              label: '班级学员'
            }
          ]
        }
      }
    ]
  }
}
