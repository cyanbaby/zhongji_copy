/*
 * @Author: 姚文彬
 * @Date: 2021-06-16 17:01:11
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-24 10:39:06
 * @FilePath: \o-front-admin\src\views\folder\picture\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = () => {
  return {
    rowHandle: false,
    indexRow: false,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        key: 'liveChannelId',
        rowSlot: true, // 配置启用插槽自定义
        width: 46,
        align: 'center'
      },
      // 尺寸信息、文件名、图片缩略图
      {
        title: '直播信息',
        key: 'coverImg',
        width: 250,
        rowSlot: true // 配置启用插槽自定义
      },
      // 直播间名称
      {
        title: '直播间名称',
        key: 'name',
        show: false,
        search: {
          disabled: false
        }
      },
      {
        title: '课时',
        key: 'courseHour'
      },
      {
        title: '开播时间',
        key: 'startTime',
        type: 'datetime'
      },
      {
        title: '预计时长（分钟）',
        key: 'planDuration'
      },
      {
        title: '直播分类',
        key: 'categoryName',
        rowSlot: true
      },
      {
        title: '创建时间',
        key: 'createTime',
        type: 'datetime'
      }
    ]
  }
}
