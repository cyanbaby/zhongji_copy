export const crudOptions = vm => {
  return {
    rowHandle: {
      width: 340,
      dropdown: false,
      edit: { show: false }, // 应用无编辑功能
      custom: [
        {
          text: '导入样本',
          emit: 'importBtn',
          type: 'text',
          size: 'small'
        },
        {
          text: '抽签',
          emit: 'drawBtn',
          type: 'text',
          size: 'small'
        },
        {
          text: '导出结果',
          emit: 'exportBtn',
          type: 'text',
          size: 'small'
        }
      ]
    },
    indexRow: false, // 无序号
    /* formOptions: {
      type: 'dialog',
      component: {
        props: {
          'close-on-click-modal': false
        }
      }
    }, */
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '名称',
        key: 'activityName',
        search: {
          disabled: false
        },
        form: {
          itemProps: {
            labelWidth: '60px' // 可以隐藏表单项的label
          },
          rules: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        }
      },
      {
        title: '创建时间',
        key: 'gmtCreate',
        type: 'datetime',
        form: {
          component: {
            show: false
          }
        }
      }
    ]
  }
}
