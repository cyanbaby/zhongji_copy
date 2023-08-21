
export const crudOptions = () => {
  return {
    rowHandle: {
      custom: [
        // {
        //   text: '导入会员',
        //   emit: 'addVipmember',
        //   size: 'small',
        //   type: 'text'
        // },
        {
          text: '预览',
          emit: 'previewCert',
          size: 'small',
          class: 'marginLeft',
          type: 'text'
        },
        {
          text: '申请记录',
          emit: 'applyRecord',
          class: 'marginLeft',
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
          class: 'marginLeft',
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
            if (row.applyStatus === '1' || row.applyStatus === '2' || row.applyStatus === '4' || row.applyStatus === '5' || row.applyStatus === '6') {
              return true
            } else {
              return false
            }
          }
        }
      ],
      width: 200,
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
    selectionRow: { // 多选列
      align: 'center',
      width: 100,
      // title: '全选',
      selectable: (row, index) => {
        if (row.applyStatus === '4' || row.applyStatus === '6' || row.applyStatus === '5') {
          return false
        } else {
          return true
        }
      }
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
      // 开始日期
      {
        title: '',
        key: 'startTime',
        show: false,
        search: {
          disabled: false,
          slot: true
        }
      },
      // 结束日期
      {
        title: '',
        key: 'endTime',
        show: false,
        search: {
          disabled: false,
          slot: true
        }
      },
      {
        title: '证书状态',
        key: 'applyStatus',
        rowSlot: true
      },
      {
        title: '申请年份',
        key: 'certYear',
        show: function (val, data) {
          if (data.certType === '4') {
            return false
          } else {
            return true
          }
        }
      },
      {
        title: '证书申领时间',
        key: 'applyTime',
        rowSlot: true
      },
      {
        title: '证书打印时间',
        key: 'certPrintTime',
        // show: function(val,data){
        //  if(data.certType != '4'){
        //    return false
        //  }else{
        //    return true
        //  }
        // },
        rowSlot: true
      },
      {
        title: '证书关联信息',
        // show: function(val,data){
        //  if(data.certType != '4'){
        //    return false
        //  }else{
        //    return true
        //  }
        // },
        key: 'sourceName'
      }

    ]
  }
}
