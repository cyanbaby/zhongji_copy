export const crudOptions = () => {
  return {
    rowHandle: {
      remove: {
        show: false
      },
      edit: {
        show: false
      },
      dropdown: {
        atLeast: 10 // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
      },
      width: 80,
      custom: [
        {
          text: '添加',
          emit: 'increaseBtn',
          type: 'text',
          size: 'small',
          show (index, row) {
            if (row.isExistDep == 0) {
              return true
            }
          }
        },
        {
          text: '已添加',
          emit: 'increaseBtn',
          type: 'text',
          size: 'small',
          disabled: true,
          show (index, row) {
            if (row.isExistDep == 1) {
              return true
            }
          }
        }
      ]
    },
    pagination: false,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '头像',
        key: 'memberHeaderUrl',
        width: 100,
        type: 'avatar-uploader',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '姓名',
        key: 'memberName',
        search: {
          disabled: false
        },
        form: {
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        }
      },
      {
        title: '手机号',
        key: 'memberMobile',
        search: {
          disabled: false
        },
        form: {
          rules: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
        },
        editForm: {
          component: {
            show: false // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          }
        }
      }
    ]
  }
}
