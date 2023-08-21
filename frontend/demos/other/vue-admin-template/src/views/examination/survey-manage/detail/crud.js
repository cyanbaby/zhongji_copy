/*
 * @Author: 崔师尊
 * @Date: 2021-10-18 16:57:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-18 16:57:10
 * @FilePath: \o-front-admin\src\views\examination\question-manage\index.vue
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
        title: '用户名',
        key: 'userName'
      },
      {
        title: '手机号',
        key: 'mobile',
        search: true
      },
      {
        title: '提交答卷时间',
        key: 'submitTime',
        width: 160
      },
      {
        title: '所用时间',
        key: 'usedTime',
        width: 160
      },
      {
        title: '来源',
        key: 'sourceArea',
        width: 160
      },
      {
        title: '来源ip',
        key: 'ipAddress',
        width: 160
      }
    ]
  }
}
