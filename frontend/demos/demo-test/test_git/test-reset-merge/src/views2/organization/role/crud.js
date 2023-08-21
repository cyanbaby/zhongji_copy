/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-01 14:04:29
 * @FilePath: \p-front-admin\src\views\organization\role\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = () => {
  return {
    rowHandle: {
      dropdown: {
        atLeast: 5 // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
      },
      edit: {
        thin: true,
        text: '编辑',
        disabled (index, row) {
          if (row.roleSource === '应用') {
            return true
          } else {
            return false
          }
        }
      },
      remove: {
        thin: true,
        text: '删除',
        disabled (index, row) {
          if (row.roleSource === '应用') {
            return true
          } else {
            return false
          }
        }
      },
      custom: [
        {
          text: '授权功能点',
          emit: 'customBtn',
          size: 'small',
          type: 'text',
          disabled (index, row) {
            if (row.roleSource === '应用') {
              return true
            } else {
              return false
            }
          }
        }
      ]
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '角色名称',
        key: 'roleName',
        minWidth: 150,
        form: {
          slot: true
        }
      },
      {
        title: '角色编码',
        key: 'roleCode',
        width: 150,
        form: {
          slot: true
        }
      },
      {
        title: '所属应用',
        key: 'appName',
        width: 150,
        form: {
          component: {
            show: false // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          }
        }
      },
      {
        title: '角色来源',
        key: 'roleSource',
        width: 150,
        form: {
          component: {
            show: false // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          }
        }
      },
      {
        title: '角色说明',
        key: 'roleMemo',
        width: 250
      }
    ]
  }
}
