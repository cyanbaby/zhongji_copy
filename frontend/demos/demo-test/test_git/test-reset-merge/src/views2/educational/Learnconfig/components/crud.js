export const crudOptions = vm => {
  return {
    rowHandle: {
      width: 150,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '上移',
          emit: 'moveUpBtn',
          type: 'text',
          size: 'small',
          disabled (index) {
            if (index > 0) {
              return false
            } else {
              return true
            }
          } // 支持按条件禁用启用
        },
        {
          text: '下移',
          emit: 'moveDownBtn',
          type: 'text',
          size: 'small',
          disabled (index) {
            if (vm.isLastIndex(index)) {
              return true
            } else return false
          }
        },
        {
          text: '删除',
          emit: 'deleteBtn',
          type: 'text',
          size: 'small'
        }
      ]
    },
    indexRow: false,
    pagination: false, // 对应el-pagination的配置
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      /* {
        title: '课件封面',
        key: 'bannerImgUrl',
        type: 'avatar-uploader',
        rowSlot: true // 配置启用插槽自定义
      }, */
      {
        title: '课程名称',
        key: 'goodsValue'
      },
      /*    {
        title: '类别',
        key: 'goodsType',
        show: false
      },
      {
        title: '所属类目',
        key: 'fullCatagoryName'
      }, */
      {
        title: '课时',
        key: 'learnHour'
      },
      {
        title: '班级课时',
        key: 'classLearnHour',
        component: {
          name: 'el-input-number',
          size: 'small',
          props: {
            precision: 2,
            step: 0.01,
            min: 0
          }
        }
      }
    ]
  }
}
