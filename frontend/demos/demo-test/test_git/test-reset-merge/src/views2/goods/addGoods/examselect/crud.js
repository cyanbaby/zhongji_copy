export const crudOptions = () => {
  return {
    rowHandle: {
      width: 80,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '选择',
          emit: 'choseBtn',
          type: 'text',
          size: 'small'
        }
      ]
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '考试',
        key: 'examName',
        search: {
          disabled: false
        }
      },
      {
        title: '考试时间',
        key: 'examTime'
      },
      {
        title: '创建时间',
        key: 'createTimeStr'
      }

    ]
  }
}
