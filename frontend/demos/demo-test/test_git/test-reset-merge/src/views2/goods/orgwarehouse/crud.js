export const crudOptions = () => {
  return {
    rowHandle: false,
    options: {
      border: false,
      stripe: false,
      headerCellStyle: { 'background-color': '#F7F7F7', border: '1px solid #EBEEF5' }
    },
    pagination: {
      background: false
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '课程',
        width: 260,
        key: 'goodsImg',
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
        title: '销量',
        key: 'sales'
      },
      {
        title: '上架状态',
        key: 'status',
        type: 'select',
        search: {
          disabled: false
        },
        dict: {
          data: [
            {
              value: '',
              label: '全部'
            },
            {
              value: '1',
              label: '未上架'
            },
            {
              value: '2',
              label: '已上架'
            }
          ]
        }
      },
      {
        title: '来源',
        key: 'goodsSourceValue'
      },
      {
        title: '所属类目',
        key: 'fullCatagoryNames',
        rowSlot: true
      },
      {
        title: '创建时间',
        key: 'createTime',
        width: 150
      },
      {
        title: '操作',
        key: 'operation',
        width: 200,
        rowSlot: true, // 配置启用插槽自定义
        addForm: {
          component: {
            show: false // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          }
        }
      }
    ]
  }
}
