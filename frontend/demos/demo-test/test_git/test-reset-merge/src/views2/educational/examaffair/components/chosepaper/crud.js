export const crudOptions = () => {
  return {
    rowHandle: {
      width: 100,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '选择',
          emit: 'selectBtn',
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
        title: '试卷id',
        key: 'paperId',
        show: false
      },
      {
        title: '试卷名称',
        key: 'paperName',
        search: {
          disabled: false
        }
      },
      {
        title: '总分',
        key: 'totalScore'
      },
      {
        title: '分类',
        key: 'categoryName'
      },
      {
        title: '修改时间',
        key: 'updateTime'
      }

    ]
  }
}
