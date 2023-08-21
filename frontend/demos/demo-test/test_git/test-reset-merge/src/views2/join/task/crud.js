/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-22 12:04:16
 * @FilePath: \p-front-admin\src\views\join\task\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions

export const crudOptions = () => {
  return {
    rowHandle: {
      width: 150,
      fixed: 'right',
      dropdown: {
        atLeast: 6, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
        text: '更多', // dropdown按钮文字
        type: 'text',
        icon: 'el-icon-more'
      },
      edit: {
        show: false
      },
      remove: {
        show: false
      },
      custom: [
        {
          text: '下载文件',
          emit: 'toForm',
          size: 'small',
          type: 'text',
          disabled (index, row) {
            return String(row.status) === '0' || String(row.status) === '1' || String(row.status) === '3' || String(row.taskType) === '1'
          }
        },
        {
          text: '详情',
          emit: 'toDetail',
          size: 'small',
          type: 'text'
        }
      ]
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '任务名称',
        key: 'name',
        minWidth: 350
      },
      {
        title: '创建时间',
        key: 'startTime',
        minWidth: 150,
        type: 'datetime'
      },
      {
        title: '状态',
        key: 'status',
        minWidth: 100,
        type: 'select',
        dict: {
          data: [
            {
              value: 0,
              label: '未进行'
            },
            {
              value: 1,
              label: '进行中'
            },
            {
              value: 2,
              label: '完成'
            },
            {
              value: 3,
              label: '失败'
            }
          ]
        }
      }
    ]
  }
}
