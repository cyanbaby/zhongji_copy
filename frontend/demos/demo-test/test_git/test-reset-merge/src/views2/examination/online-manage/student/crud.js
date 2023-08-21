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
      width: 100,
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
          text: '答题记录',
          emit: 'toRecord',
          type: 'text'
        }
      ]
    },

    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '姓名',
        key: 'studentName',
        search: {
          disabled: false
        }
      },
      {
        title: '性别',
        key: 'sex',
        search: {
          disabled: false
        },
        type: 'select',
        // Todo 性别字典
        dict: {
          data: [
            {
              value: 1,
              label: '男'
            },
            {
              value: 2,
              label: '女'
            },
            {
              value: 3,
              label: '未知'
            }
          ]
        }
      },
      {
        title: '手机号',
        key: 'mobile'
      },
      {
        title: '邮件',
        key: 'email'
      },
      {
        title: '身份证',
        width: 170,
        key: 'idcardNu'
      },
      {
        title: '考试成绩',
        key: 'myExamAnswerRecord.testScore'
      },
      {
        title: '是否合格',
        key: 'myExamAnswerRecord.isPass',
        type: 'select',
        dict: {
          data: [
            {
              value: 1,
              label: '是'
            },
            {
              value: 2,
              label: '否'
            }
          ]
        }
      }
    ]
  }
}
