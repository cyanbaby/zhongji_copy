/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-17 19:25:22
 * @FilePath: \o-front-admin\src\views\join\plane\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = vm => {
  return {
    rowHandle: {
      edit: {
        show: false
      },
      remove: {
        show: false
      },
      dropdown: {
        atLeast: 6, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
        text: '更多', // dropdown按钮文字
        type: 'primary',
        icon: 'el-icon-more'
      },
      // 组织只有审核功能
      custom: [
        {
          text: '报名人员审核',
          emit: 'toStudent',
          size: 'small'
        },
        {
          text: '下载报名表',
          emit: 'toDown',
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
        title: '报名活动名称',
        key: 'activityName',
        minWidth: 250,
        search: {
          disabled: false
        }
      },
      {
        title: '报名时间',
        key: 'activityTime',
        width: 300,
        rowSlot: true
      },
      {
        title: '招考单位名称',
        key: 'orgName',
        width: 300
        // search: {
        //   disabled: false
        // }
      },
      {
        title: '报名人数',
        key: 'enterNum',
        width: 100
      },
      {
        title: '状态',
        key: 'activityStatus',
        width: 100,
        // TODO 字典管理
        rowSlot: true,
        dict: {
          data: [
            {
              value: 1,
              label: '未发布'
            },
            {
              value: 2,
              label: '已发布'
            }
          ]
        }
      }
    ]
  }
}
