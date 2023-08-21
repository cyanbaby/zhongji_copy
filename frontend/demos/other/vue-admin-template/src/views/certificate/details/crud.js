
export const crudOptions = () => {
  return {
    rowHandle: {
      custom: [
        {
          text: '预览',
          emit: 'previewCert',
          size: 'small',
          type: 'text'
        },
        {
          text: '申请记录',
          emit: 'applyRecord',
          size: 'small',
          type: 'text',
          show: function (val, data) {
            if (data.certType === '4') {
              return false
            } else {
              return true
            }
          },
          disabled (index, row) {
            if (row.certType === '4') {
              return true
            } else {
              return false
            }
          }
        },
        {
          text: '审核',
          emit: 'auditCert',
          size: 'small',
          type: 'text',
          show: function (val, data) {
            if (data.certType === '4') {
              return false
            } else {
              return true
            }
          },
          disabled (index, row) {
            if (row.applyStatus === '4' || row.applyStatus === '6' || row.applyStatus === '5') {
              return true
            } else {
              return false
            }
          }
        }
      ],
      width: 80,
      edit: {
        show: false
      },
      remove: {
        show: false
      },
      dropdown: false
    },
    indexRow: {
      show: true
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '拿证人姓名',
        key: 'studentName',
        search: {
          disabled: false
        }
      },
      {
        title: '性别',
        key: 'sex'
      },
      {
        title: '身份证号',
        key: 'idCardNum',
        search: {
          disabled: false
        }
      },
      {
        title: '证书状态',
        key: 'applyStatus',
        rowSlot: true
      },
      {
        title: '证书申领时间',
        key: 'applyTime',
        rowSlot: true
      },
      {
        title: '证书打印时间',
        key: 'certPrintTime',
        rowSlot: true
      },
      {
        title: '证书关联信息',
        key: 'sourceName'
      }

    ]
  }
}
