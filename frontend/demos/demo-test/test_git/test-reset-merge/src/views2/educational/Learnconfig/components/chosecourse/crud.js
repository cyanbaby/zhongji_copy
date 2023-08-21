export const crudOptions = () => {
  return {
    rowHandle: false,
    indexRow: false,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        key: 'goodsId',
        rowSlot: true, // 配置启用插槽自定义
        width: 46,
        align: 'center'
      },
      {
        title: '课程封面',
        key: 'goodsImg',
        type: 'avatar-uploader',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '课程名称',
        key: 'goodsValue',
        search: {
          disabled: false
        }
      },
      {
        title: '课时',
        key: 'learnHours'
      },
      {
        title: '来源',
        key: 'goodsSourceValue'
      },
      {
        title: '所属类目',
        key: 'fullCatagoryNames'
      },
      {
        title: '创建时间',
        key: 'gmtCreate',
        type: 'datetime',
        width: 160
      }

    ]
  }
}
