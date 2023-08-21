export const crudOptions = () => {
  return {
    rowHandle: {
      width: 80,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '详情',
          emit: 'detailInfo',
          type: 'text',
          size: 'small'
        }
      ]
    },
    indexRow: false,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '学员',
        width: 260,
        key: 'studentImg',
        type: 'avatar-uploader',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '姓名',
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
        title: '课程规格',
        key: 'normName'
      },
      {
        title: '购课时间',
        key: 'purchaseTime',
        type: 'datetime'
      },
      {
        title: '开始学习时间',
        key: 'startStudyTime',
        type: 'datetime'
      },
      {
        title: '最后学习时间',
        key: 'lastStudyTime',
        type: 'datetime'
      },
      {
        title: '有效学习时长',
        key: 'vaildStudyTime',
        rowSlot: true
      },
      {
        title: '累计学习时长',
        key: 'totalStudyTime',
        rowSlot: true
      },
      {
        title: '进度',
        key: 'learningProgress',
        rowSlot: true
      }
    ]
  }
}
