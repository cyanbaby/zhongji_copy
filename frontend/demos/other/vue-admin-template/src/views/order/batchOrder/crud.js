
export const crudOptions = () => {
  return {
    rowHandle: false,
    indexRow: false,
    selectionRow: { // 多选列
      align: 'center',
      width: 100
      // title: '全选',
      // selectable: (row, index) => {
      //   if (row.applyStatus === '4' || row.applyStatus === '6' || row.applyStatus === '5') {
      //     return false
      //   } else {
      //     return true
      //   }
      // }
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '用户昵称',
        key: 'sex'
      },
      {
        title: '姓名',
        key: 'studentName',
        search: {
          disabled: false
        }
      },
      {
        title: '手机号',
        key: 'idCardNum',
        search: {
          disabled: false
        }
      },
      {
        title: '地区',
        key: 'addressCode',
        search: {
          disabled: false,
          slot: true
        },
        show: true
      },
      {
        title: '注册时间',
        key: 'time'
      }
    ]
  }
}
