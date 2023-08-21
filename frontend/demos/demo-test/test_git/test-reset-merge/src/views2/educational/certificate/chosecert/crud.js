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
        title: '证书id"',
        key: 'certId',
        show: false
      },
      {
        title: '证书名称',
        key: 'certName',
        search: {
          disabled: false
        }
      },
      /* {
        title: '证书编号',
        key: 'cIdentifier'
      }, */
      {
        title: '发证主体',
        key: 'orgName'
      },
      {
        title: '创建时间',
        key: 'gmtCreate',
        type: 'datetime'
      }
    ]
  }
}
