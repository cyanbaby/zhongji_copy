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
      width: 250,
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
          text: '发布',
          emit: 'topublish',
          size: 'small',
          type: 'text',
          show (index, row) {
            return row.publishStatusCode == 1
          }
        },
        {
          text: '取消发布',
          emit: 'topublish',
          size: 'small',
          type: 'text',
          show (index, row) {
            return row.publishStatusCode == 2
          }
        },
        {
          text: '预览',
          emit: 'toview',
          size: 'small',
          type: 'text'
        },
        {
          text: '生成试卷',
          emit: 'markPaper',
          size: 'small',
          type: 'text',
          disabled (index, row) {
            return row.isGenerate == 2
          }
        }
      ]
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '试卷名称',
        key: 'paperName',
        minWidth: 250,
        search: {
          disabled: false
        },
        rowSlot: true
      },
      {
        title: '组卷方式',
        key: 'paperGroupType'
      },
      {
        title: '试卷数',
        key: 'paperNum',
        rowSlot: true
      },
      {
        title: '分类',
        key: 'categoryName',
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
