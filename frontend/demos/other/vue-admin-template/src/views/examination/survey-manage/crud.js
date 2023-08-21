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
    rowHandle: {
      width: 320,
      dropdown: {
        atLeast: 7 // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
      },
      edit: {
        show: false
      },
      custom: [
        {
          text: '编辑',
          emit: 'toedit',
          size: 'small',
          type: 'text'
        },
        {
          text: '详情',
          emit: 'showDetail',
          size: 'small',
          type: 'text'
        },
        {
          text: '发布',
          emit: 'topublish',
          size: 'small',
          type: 'text',
          show (index, row) {
            return row.publishStatus == 1
          }
        },
        {
          text: '取消发布',
          emit: 'topublish',
          size: 'small',
          type: 'text',
          show (index, row) {
            return row.publishStatus == 2
          }
        },
        {
          text: '预览',
          emit: 'toview',
          size: 'small',
          type: 'text'
        },
        {
          text: '分享',
          emit: 'toshare',
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
        title: '试卷名称',
        key: 'questionnaireSurveyName',
        minWidth: 250,
        search: {
          disabled: false
        },
        rowSlot: true
      },
      {
        title: '分类',
        key: 'questionnaireSurveyCatName',
        width: 250
      },
      {
        title: '修改时间',
        key: 'updateTime',
        width: 160
      }

    ]
  }
}
