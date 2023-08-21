/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-05-14 13:50:34
 * @FilePath: \o-front-admin\src\views\organization\manage\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = () => {
  return {
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '管理员名称',
        key: 'memberName',
        minWidth: 80
      },
      {
        title: '联系人',
        key: 'memberMobile',
        width: 150
      },
      {
        title: '联系电话',
        key: 'memberSex',
        width: 120
      },
      {
        title: '账号',
        key: 'memberCode',
        width: 150
      }
    ]
  }
}
