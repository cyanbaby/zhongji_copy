/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-22 14:29:16
 * @FilePath: \o-front-admin\src\views\join\taskInfo\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions

export const crudOptions = () => {
  return {
    rowHandle: false,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '任务描述',
        key: 'memo',
        minWidth: 400
      },
      {
        title: '任务详情名称',
        key: 'detailName',
        Width: 350
      },
      {
        title: '创建时间',
        key: 'startTime',
        type: 'datetime',
        Width: 150
      }
    ]
  }
}
