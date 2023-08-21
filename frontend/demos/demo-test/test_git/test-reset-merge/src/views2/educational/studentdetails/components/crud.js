export const crudOptions = () => {
  return {
    rowHandle: {
      width: 100,
      edit: {
        show: false
      },
      remove: {
        show: false
      },
      dropdown: {
        atLeast: 6, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
        text: '更多', // dropdown按钮文字
        type: 'primary',
        icon: 'el-icon-more'
      },
      custom: [
        {
          text: '手动完成',
          emit: 'complete',
          size: 'small',
          type: 'text'
        }
      ]
    },
    indexRow: false,
    pagination: false,
    /* pagination: {
      layout: 'total,prev, pager, next, jumper'
    }, */
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '章节名称',
        key: 'chapterName'
      },
      {
        title: '累计学习时长',
        key: 'studyTimeSecond',
        rowSlot: true
      },
      {
        title: '有效学习时长',
        key: 'studyEffectiveTimeSecond',
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
