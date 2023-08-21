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
    rowHandle: {
      width: 250,
      dropdown: {
        atLeast: 6, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
        text: '更多',
        type: 'text'
      },
      edit: {
        show: false
      },
      remove: {
        order: 5,
        disabled (index, row) {
          if (row.watchStatus === 1) {
            return true
          } else {
            return false
          }
        }
      },
      custom: [
        {
          text: '直播链接',
          emit: 'liveLink',
          size: 'small',
          type: 'text'
          // disabled: true
        },
        {
          text: '发布',
          emit: 'startlive',
          size: 'small',
          type: 'text',
          show (index, row) {
            return row.releaseStatus === 0
          }
        },
        {
          text: '取消发布',
          emit: 'endlive',
          size: 'small',
          type: 'text',
          show (index, row) {
            return row.releaseStatus === 1
          }
        },
        {
          text: '编辑',
          emit: 'edit',
          size: 'small',
          type: 'text',
          disabled (index, row) {
            if (row.releaseStatus === 1) {
              return true
            } else {
              return false
            }
          }
        },
        {
          text: '直播设置',
          emit: 'setting',
          size: 'small',
          type: 'text'
        },
        {
          text: '直播开关',
          emit: 'liveSwitch',
          size: 'small',
          type: 'text'
          // disabled (index, row) {
          //   return true
          // }
        },
        {
          text: '设为收费',
          emit: 'chargeFor',
          size: 'small',
          type: 'text'
          // disabled: true
        }
        // {
        //   text: '数据统计',
        //   emit: 'dataStatistics',
        //   size: 'small',
        //   type: 'text',
        //   disabled: true
        // }
      ]
    },
    columns: [
      // 尺寸信息、文件名、图片缩略图
      {
        title: '直播信息',
        key: 'coverImg',
        width: 250,
        rowSlot: true // 配置启用插槽自定义
      },
      // {
      //   title: '讲师',
      //   key: '',
      //   width: 150
      // },
      {
        title: '是否收费',
        key: 'isFee',
        type: 'select',
        width: 100,
        dict: {
          data: [
            {
              value: 0,
              label: '否'
            },
            {
              value: 1,
              label: '是'
            }
          ]
        }
      },
      {
        title: '价格',
        key: 'price',
        rowSlot: true,
        width: 150
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
        title: '开播时间',
        key: 'startTime',
        rowSlot: true,
        width: 180
      },
      {
        title: '直播分类',
        key: 'categoryName',
        rowSlot: true
      },
      {
        title: '直播状态',
        key: 'watchStatus',
        type: 'select',
        width: 120,
        rowSlot: true
      },
      {
        title: '发布状态',
        key: 'releaseStatus',
        type: 'select',
        width: 120,
        dict: {
          data: [
            {
              value: 0,
              label: '未发布'
            },
            {
              value: 1,
              label: '已发布'
            }
          ]
        }
      },
      {
        title: '直播场景',
        key: 'newScene',
        type: 'select',
        width: 120,
        dict: {
          url: '/baseservice/dictdata/list?typeCode=live_scene',
          cache: true, // 是否启用cache，默认开启
          value: 'dictDataValue', // value的属性名
          label: 'dictDataName' // label的属性名
        }
      },
      {
        title: '直播通道',
        key: 'supplier',
        type: 'select',
        width: 120,
        dict: {
          url: '/baseservice/dictdata/list?typeCode=live_scene',
          cache: true, // 是否启用cache，默认开启
          value: 'dictDataValue', // value的属性名
          label: 'dictDataName' // label的属性名
        }
      }

    ]
  }
}
