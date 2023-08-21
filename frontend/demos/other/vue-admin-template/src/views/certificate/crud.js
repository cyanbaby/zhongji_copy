
export const crudOptions = () => {
  return {
    rowHandle: {
      dropdown: false,
      custom: [
        {
          text: '编辑',
          emit: 'editCert',
          size: 'small',
          type: 'text'
        },
        {
          text: '详情',
          emit: 'goCertInfo',
          size: 'small',
          type: 'text'
        },
        // {
        //   text: '预览',
        //   emit: 'previewCert',
        //   size: 'small',
        //   type: 'text'
        // },
        {
          text: '同步数据',
          emit: 'synchronousData',
          size: 'small',
          type: 'text'
        },
        {
          text: '删除',
          emit: 'delCert',
          size: 'small',
          type: 'text'
        }
      ],
      width: 300,
      edit: {
        show: false
      },
      remove: {
        show: false
      }
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '证书名称',
        key: 'certName',
        width: 130,
        search: {
          disabled: false
        }
      },
      {
        title: '证书ID',
        width: 130,
        key: 'certId',
        search: {
          disabled: false
        }
      },
      {
        title: '发证主体',
        key: 'orgName'
      },
      {
        title: '证书类型',
        key: 'certType',
        type: 'select',
        width: 100,
        dict: {
          data: [
            {
              label: '培训班证书',
              value: 1
            },
            {
              label: '专业证书',
              value: 2
            },
            {
              label: '年度证书',
              value: 3
            },
            {
              label: '普通证书',
              value: 4
            }
          ]
        },
        search: {
          disabled: false
        },
        rowSlot: true
      },
      {
        title: '状态',
        key: 'status',
        rowSlot: true
      },
      {
        title: '证书修改时间',
        key: 'gmtModified',
        width: 130,
        search: {
          disabled: true
        }
      },
      {
        title: '证书同步时间',
        key: 'gmtSynchronizes',
        width: 130,
        search: {
          disabled: true
        }
      }
    ]
  }
}
