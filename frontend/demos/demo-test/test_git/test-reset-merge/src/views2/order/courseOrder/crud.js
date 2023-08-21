/* eslint-disable */ 

/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-15 13:42:33
 * @FilePath: \p-front-admin\src\views\join\plane\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
const { promiseBaseUrl } = document.querySelector('body').dataset
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      width: 120,
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
          text: '详情',
          emit: 'showDetail',
          size: 'small',
          type: 'text'
        },
        {
          text: '后台开通',
          emit: 'backstageOpen',
          size: 'small',
          type: 'text',
          class: 'backstage-open2',
          show: function (index, row) {
            if (row.status == 'W') {
              return true
            }
          }
        }
      ]
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '姓名',
        key: 'buyer.name',
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: '手机号',
        key: 'buyer.mobile',
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: '订单号',
        key: 'orderNo',
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: false,
        key: 'filterType',
        width: 300,
        type: 'select',
        dict: {
          data: [
            {
              value: '1',
              label: '付款时间'
            },
            {
              value: '2',
              label: '创建时间'
            }
          ]
        },
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: false,
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
        title: '工作单位',
        key: 'buyer.companyName',
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: '所在地区',
        width: 500,
        key: 'buyerAddressCode',
        search: {
          disabled: false,
          slot: true
        },
        show: false
      },
      {
        title: '订单信息',
        key: 'subOrderList',
        width: 400,
        rowSlot: true
      },
      {
        title: '实付金额',
        key: 'actualAmount',
        rowSlot: true
      },
      {
        title: '订单金额',
        key: 'orderAmount',
        rowSlot: true
      },
      {
        title: '买家',
        key: 'buyer',
        rowSlot: true,
        width: 120,
        valueBuilder (row, col) {
          if (row.buyer.name == null || row.buyer.name == 'null') {
            row.buyer.name = ''
          }
        }
      },
      {
        title: '交付对象',
        key: 'deliverObj',
        rowSlot: true,
        width: 120,
        valueBuilder (row, col) {
          if (row.deliverObj.name == null || row.deliverObj.name == 'null') {
            row.deliverObj.name = ''
          }
        }
      },
      {
        title: '支付方式',
        key: 'paymentToolType',
        rowSlot: true
      },
      {
        title: '支付时间',
        key: 'gmtCreate',
        rowSlot: true,
        width: 160
      },
      {
        title: '下单时间',
        key: 'createTime',
        width: 160
      },
      {
        title: '下单渠道',
        key: 'operaChannel'
      },
      {
        title: '工作单位',
        width: 160,
        key: 'buyer.companyName'
      },
      {
        title: '所在地区',
        width: 160,
        key: 'buyerAddressPath'
      }
    ]
  }
}
