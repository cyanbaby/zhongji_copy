/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-02 11:27:48
 * @FilePath: \o-front-admin\src\views\join\plane\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = vm => {
  return {
    rowHandle: false,
    formOptions: {
      closeOnClickModal: false
    },
    indexRow: false,
    columns: [
      {
        key: 'contentId',
        rowSlot: true, // 配置启用插槽自定义
        width: 46,
        align: 'center'
      },
      {
        title: '标题',
        key: 'title',
        minWidth: 200,
        search: {
          disabled: false
        }
      },
      {
        title: '作者',
        key: 'authorName',
        width: 80
      },
      {
        title: '类型',
        key: 'contentType',
        width: 100,
        type: 'select',
        search: {
          disabled: false
        },
        dict: {
          url: '/baseservice/dictdata/list?typeCode=content_type',
          cache: true, // 是否启用cache，默认开启
          value: 'dictDataValue', // value的属性名
          label: 'dictDataName' // label的属性名
        }
      },
      {
        title: '发布状态',
        key: 'contentStatus',
        type: 'select',
        width: 100,
        // TODO 字典管理
        dict: {
          data: [
            {
              value: '1',
              label: '未发布'
            },
            {
              value: '2',
              label: '已发布'
            }
          ]
        }
      },
      {
        title: '创建时间',
        key: 'createTime',
        type: 'datetime',
        width: 160
      },
      {
        title: '发布时间',
        key: 'publishTime',
        type: 'datetime',
        width: 160
      },
      {
        title: '更新时间',
        key: 'updateTime',
        type: 'datetime',
        width: 160
      }
    ]
  }
}
