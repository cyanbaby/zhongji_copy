export const crudOptions = () => {
  return {
    rowHandle: {
      width: 140,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '下架',
          emit: 'undercarriageBtn',
          type: 'text',
          size: 'small'
        },
        {
          text: '分配类目',
          emit: 'allocationBtn',
          type: 'text',
          size: 'small'
        }
      ]
    },
    pagination: {
      background: false
    },
    options: {
      border: false,
      stripe: false,
      headerCellStyle: { 'background-color': '#F7F7F7', border: '1px solid #EBEEF5' }
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '课程',
        key: 'productImg',
        width: 200,
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '课程名称',
        key: 'goodsValue',
        show: false,
        search: {
          disabled: false
        }
      },
      {
        title: '价格',
        key: 'maxProductPrice',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '销量',
        key: 'sales'
      },
      {
        title: '来源',
        key: 'goodsSource'
      },
      {
        title: '所属类目',
        key: 'fullCatagoryNames',
        rowSlot: true
      },
      {
        title: '上架状态',
        key: 'shelvesStatus'
      },
      {
        title: '库存',
        key: 'shelvesTotal'
      },
      {
        title: '最新上架时间',
        key: 'putawayTime',
        width: 170
      }

    ]
  }
}
