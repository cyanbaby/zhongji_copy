/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-15 13:42:33
 * @FilePath: \p-front-admin\src\views\join\plane\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = () => {
  return {
    rowHandle: {
      width: 80,
      dropdown: {
        atLeast: 7, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
        text: '更多', // dropdown按钮文字
        type: 'text',
        icon: 'el-icon-more'
      },
      edit: { show: false },
      remove: { show: false },
      custom: [
        {
          text: '退款处理',
          emit: 'doRefund',
          size: 'small',
          type: 'text',
          show: (val, row) => {
            return row.auditStatus == 1
          }
        }
      ]
    },
    columns: [
      {
        title: '退款编号',
        width: 150,
        key: 'subOrderRefundRecordId'
      },
      {
        title: '姓名',
        key: 'buyerName',
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: '手机号',
        key: 'buyerMobile',
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: '商品信息',
        key: 'orderInfo',
        width: 300,
        rowSlot: true
      },
      {
        title: '原订单号',
        key: 'orderNo',
        width: 150,
        search: {
          disabled: false
        }
      },
      {
        title: '申请时间',
        key: 'startTime',
        type: 'datetime',
        search: {
          width: 190,
          disabled: false
        },
        show: false
      },
      {
        title: '到',
        key: 'endTime',
        type: 'datetime',
        search: {
          width: 190,
          disabled: false
        },
        show: false
      },
      {
        title: '买家',
        key: 'buyer',
        rowSlot: true,
        width: 110
      },
      {
        title: '交易金额(元)',
        width: 120,
        key: 'subActualAmount'
      },
      {
        title: '申请退款金额(元)',
        key: 'refundAmount',
        width: 130
      },
      {
        title: '申请时间',
        type: 'datetime',
        width: 150,
        key: 'createTime'
      },
      {
        title: '退款原因',
        key: 'refundReason',
        width: 200,
        type: 'select',
        search: {
          disabled: false
        },
        dict: {
          url: '/baseservice/dictdata/list?typeCode=refund_reason',
          cache: true, // 是否启用cache，默认开启
          value: 'dictDataValue', // value的属性名
          label: 'dictDataName' // label的属性名
        }
      },
      {
        title: '退款状态',
        key: 'auditStatus',
        width: 90,
        type: 'select',
        dict: {
          data: [
            {
              value: 1,
              label: '待审核'
            },
            {
              value: 2,
              label: '退款成功'
            },
            {
              value: 3,
              label: '已拒绝'
            }
          ]
        }
      },
      {
        title: '实际退款金额(元)',
        rowSlot: true,
        width: 130,
        key: 'refundActualAmount'
      },
      {
        title: '实际退款时间',
        width: 150,
        type: 'datetime',
        key: 'auditTime'
      }
    ]
  }
}
