/* eslint-disable */ 

export const crudOptions = () => {
  return {
    rowHandle: {
      width: 60,
      dropdown: false,
      remove: { show: false }, // 应用无删除功能
      edit: { show: false },
      custom: [
        {
          text: '发证',
          emit: 'certificationDialogBtn',
          type: 'text',
          size: 'small',
          disabled (index, row) {
            if ((!!row.standingCommitteeName && !row.standingCommitteeUcId || !!row.majorName && !!row.majorName && !!row.professionalCommitteeName && !row.professionalCommitteeUcId) && (row.status == '成功' || row.payType == '对公转账')) {
              return false
            } else {
              return true
            }
          }
        }
      ]
    },
    indexRow: false,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '会员类型',
        key: 'signupType',
        type: 'select',
        width: 100,
        dict: {
          data: [
            {
              label: '个人会员',
              value: '1'
            },
            {
              label: '单位会员',
              value: '2'
            }
          ]
        }
      },
      {
        title: '申请人手机号',
        key: 'userMobile',
        width: 150
      },
      {
        title: '单位名称',
        key: 'signupName',
        search: {
          disabled: false
        }
      },
      {
        title: '纳税人识别号',
        key: 'taxpayerIdentificationNumber',
        width: 150
      },
      {
        title: '联系人',
        key: 'contacts'
      },
      {
        title: '联系电话',
        key: 'signupMobile',
        width: 150
      },
      {
        title: '申请时间',
        key: 'createTime',
        type: 'datetime',
        width: 150
      },
      {
        title: '申请信息1',
        key: 'standingCommitteeName',
        width: 150,
        rowSlot: true
      },
      {
        title: '申请信息2',
        key: 'majorName',
        width: 150,
        rowSlot: true
      },
      {
        title: '订单金额',
        key: 'orderAmount'
      },
      {
        title: '订单状态',
        key: 'status'
      },
      {
        title: '支付方式',
        key: 'payType'
      },
      {
        title: '对公转账凭证',
        key: 'corporateTransferImg',
        width: 150,
        rowSlot: true
      },
      {
        title: '已发证书',
        key: 'certPdf',
        rowSlot: true,
        width: 300
      }
    ]
  }
}
