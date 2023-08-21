export const crudOptions = vm => {
  return {
    rowHandle: {
      width: 120,
      dropdown: false,
      edit: { show: false }, // 应用无编辑功能
      remove: { show: false },
      custom: [
        {
          text: '开具',
          emit: 'drawBtn',
          type: 'text',
          size: 'small',
          show (index, data) {
            if (data.status == '已开票') {
              return false
            } else {
              return true
            }
          }
        },
        {
          text: '已完成',
          type: 'text',
          size: 'small',
          disabled: 'true',
          show (index, data) {
            if (data.status == '已开票') {
              return true
            } else {
              return false
            }
          }
        }
      ]
    },
    /* formOptions: {
        type: 'dialog',
        component: {
          props: {
            'close-on-click-modal': false
          }
        }
      }, */
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '学员姓名',
        width: 120,
        key: 'studentName',
        search: {
          disabled: false
        }
      },
      {
        title: '手机号',
        width: 120,
        key: 'buyerMobile',
        search: {
          disabled: false
        }
      },
      {
        title: '订单号',
        key: 'orderNo',
        width: 250,
        search: {
          disabled: false
        }
      },
      {
        title: '支付日期',
        width: 160,
        key: 'gmtPayment',
        type: 'datetime',
        form: {
          component: {
            show: false
          }
        }
      },
      {
        title: '日期',
        key: 'startTime',
        type: 'datetime',
        show: false,
        search: {
          disabled: false
        },
        form: {
          component: {
            show: false,
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          }
        }
      },
      {
        title: '到',
        key: 'endTime',
        type: 'datetime',
        show: false,
        search: {
          disabled: false
        },
        form: {
          component: {
            show: false,
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          }
        }
      },
      {
        title: '支付方式',
        width: 110,
        type: 'select',
        key: 'toolType',
        dict: {
          url: '/baseservice/dictdata/list?typeCode=payment_service_provider',
          cache: true, // 是否启用cache，默认开启
          value: 'dictDataValue', // value的属性名
          label: 'dictDataName', // label的属性名
          transfer: (data, options) => {
            data.unshift({
              dictDataValue: '',
              dictDataName: '全部'
            })
            return data
          }
        }
      },
      {
        title: '支付方式',
        type: 'select',
        key: 'paymentToolType',
        dict: {
          url: '/baseservice/dictdata/list?typeCode=payment_service_provider',
          cache: true, // 是否启用cache，默认开启
          value: 'dictDataValue', // value的属性名
          label: 'dictDataName', // label的属性名
          transfer: (data, options) => {
            data.unshift({
              dictDataValue: '',
              dictDataName: '全部'
            })
            return data
          }
        },
        search: {
          disabled: false
        },
        show: false
      },
      {
        title: '地区',
        width: 500,
        key: 'addressCode',
        search: {
          disabled: false,
          slot: true
        },
        show: false
      },
      {
        title: '支付金额',
        key: 'amount'
      },
      {
        title: '发票状态',
        type: 'select',
        key: 'status'
      },
      {
        title: '所在地',
        key: 'area',
        width: 160
      },
      {
        title: '开票方式',
        type: 'select',
        key: 'invoiceWay'
      },
      {
        title: '发票类型',
        type: 'select',
        key: 'invoiceRise'
      },
      {
        title: '发票抬头',
        key: 'principalName'
      },
      {
        title: '纳税人识别号',
        key: 'taxpayerId'
      },
      {
        title: '电话',
        key: 'mobile',
        width: 120
      },
      {
        title: '邮箱',
        key: 'email',
        width: 200
      }
    ]
  }
}
