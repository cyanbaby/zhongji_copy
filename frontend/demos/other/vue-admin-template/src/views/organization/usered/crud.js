/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-07 12:54:31
 * @FilePath: \组织\src\views\organization\user\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = () => {
  return {
    rowHandle: {
      dropdown: {
        atLeast: 5 // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
      },
      custom: [
        {
          text: '分配角色',
          emit: 'customBtn',
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
        title: '头像',
        key: 'memberHeaderUrl',
        width: 100,
        type: 'avatar-uploader',
        rowSlot: true // 配置启用插槽自定义
      },
      {
        title: '姓名',
        key: 'memberName',
        minWidth: 150,
        form: {
          rules: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        }
      },
      {
        title: '手机号',
        key: 'memberMobile',
        width: 150,
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
      },
      {
        title: '性别',
        key: 'memberSex',
        type: 'select',
        width: 150,
        form: {
          disabled: false, // 完全关闭该字段在表单中显示,
          show: false, // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          rules: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ]
        },
        dict: {
          data: [
            {
              value: '1',
              label: '男'
            },
            {
              value: '2',
              label: '女'
            },
            {
              value: '3',
              label: '未知'
            }
          ]
        },
        valueBuilder (row, key) {
          // 某些组件传入的value值可能是一个复杂对象，而row中的单个属性的值不合适传入
          // 则需要在打开编辑对话框前将row里面多个字段组合成组件需要的value对象
          // 例如：国际手机号(mobileValue为此column的key)
          // 示例 http://preview.d2-crud-plus.docmirror.cn/D2CrudPlusExample/#/demo/form/phone
          // row.mobileValue = { phoneNumber: row.phone, callingCode: row.code, countryCode: row.country }
          row.memberSex = String(row.memberSex)
          // valueBuilder将会在pageRequest成功返回数据后执行
        }
      },
      {
        title: '编号',
        key: 'memberCode',
        minWidth: 150
      }
    ]
  }
}
