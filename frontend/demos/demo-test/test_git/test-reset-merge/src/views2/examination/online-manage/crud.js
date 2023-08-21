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
      width: 220,
      dropdown: {
        atLeast: 5 // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
      },
      edit: {
        show: false
      },
      custom: [
        {
          text: '编辑',
          emit: 'toedit',
          size: 'small',
          type: 'text',
          show: function (val, data) {
            if (data.examOrigin == 2) {
              return false
            } else {
              return true
            }
          }
        }, {
          text: '查看考生',
          emit: 'toshow',
          size: 'small',
          type: 'text'
        }, {
          text: '导入考生',
          emit: 'toimport',
          size: 'small',
          show: function (val, data) {
            if (data.examOrigin == 2) {
              return false
            } else {
              return true
            }
          },
          type: 'text'
        }, {
          text: '试卷批阅',
          emit: 'reviewPaper',
          size: 'small',
          type: 'text'
        }, {
          text: '延长时间',
          emit: 'tolazy',
          size: 'small',
          type: 'text'
        }, {
          text: '预览',
          emit: 'toview',
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
        title: '考试名称',
        key: 'examName',
        minWidth: 250,
        search: {
          disabled: false
        }
      },
      {
        title: '科目考试时间',
        key: 'examSubjectPaperVOList',
        minWidth: 300,
        rowSlot: true
      },
      {
        title: '状态',
        key: 'examStatus',
        type: 'select',
        dict: {
          data: [
            {
              value: '1',
              label: '待排考'
            },
            {
              value: '2',
              label: '待排座'
            },
            {
              value: '3',
              label: '待公布准考证'
            },
            {
              value: '4',
              label: '待考试'
            },
            {
              value: '5',
              label: '考试中'
            },
            {
              value: '6',
              label: '待公布成绩'
            },
            {
              value: '7',
              label: '考试完成'
            }
          ]
        }
      },
      {
        title: '来源',
        key: 'examOrigin',
        type: 'select',
        rowSlot: true
      },
      {
        title: '参考人数',
        key: 'examTotal',
        width: 200
      },
      {
        title: '创建时间',
        key: 'createTime',
        width: 200,
        rowSlot: true
      }
    ]
  }
}
