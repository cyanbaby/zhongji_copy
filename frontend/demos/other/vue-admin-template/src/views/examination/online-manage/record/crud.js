/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-20 21:46:07
 * @FilePath: \p-front-admin\src\views\examination\student\crud.js
 */

// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = () => {
  return {
    rowHandle: {
      width: 150,
      dropdown: {
        atLeast: 7, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
        text: '更多', // dropdown按钮文字
        type: 'primary',
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
          text: '查看答题记录',
          emit: 'showRecord',
          type: 'text'
        }
      ]
    },

    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '科目名',
        key: 'examSubjectName'
      },
      {
        title: '进入考试时间',
        key: 'entryExamTime'
      },
      {
        title: '交卷时间',
        key: 'submitPaperTime'
      },
      {
        title: '考试成绩',
        key: 'score'
      },
      {
        title: '是否合格',
        key: 'isPassDesc',
        width: 150
      }
    ]
  }
}
