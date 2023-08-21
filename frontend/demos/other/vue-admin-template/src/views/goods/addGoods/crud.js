export const crudOptions = () => {
  return {
    rowHandle: {
      width: 60,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '预览',
          emit: 'previewBtn',
          type: 'text',
          size: 'small'
        }
      ]
    },
    indexRow: false,
    /* selectionRow: {
      align: 'center',
      width: 46
    }, */
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        key: 'wareId',
        rowSlot: true, // 配置启用插槽自定义
        width: 46,
        align: 'center'
      },
      {
        title: '课件名称',
        key: 'wareValue',
        search: {
          disabled: false
        },
        show: true
      },
      {
        title: '所有者组织',
        key: 'orgName',
        show: true
      },
      {
        title: '所属分类',
        key: 'courseWareToCategoryVOList',
        rowSlot: true, // 配置启用插槽自定义
        show: true
      },
      {
        title: '过期时间',
        key: 'invalidTime',
        type: 'datetime',
        show: true
      },
      {
        title: '课件同步时间',
        key: 'gmtModified',
        type: 'datetime',
        show: true
      }

    ]
  }
}
