export const crudOptions = () => {
  return {
    rowHandle: {
      custom: [
        {
          text: '编辑用户信息',
          emit: 'editUserInfo',
          size: 'small',
          type: 'text'
        },
        {
          text: '重置密码',
          emit: 'resetDialog',
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
      },
      dropdown: false
    },
    // indexRow: false,
    pagination: {
      background: false
    },
    columns: [
      // {
      //   title: '用户名',
      //   key: 'nickName'
      // },
      {
        title: '姓名',
        key: 'cardName',
        search: {
          disabled: false
        }
      },
      {
        title: '昵称',
        key: 'nickName',
        search: {
          disabled: false
        }
      },
      // {
      //   title: '手机号',
      //   key: 'mobileNo'
      // },
      {
        title: '手机号',
        key: 'mobileNo',
        // show: false,
        search: {
          disabled: false
          // slot: true
        }
      },
      {
        title: '身份证号',
        key: 'certNo',
        // type: 'select',
        // dict: {
        //   data: null, // 本地数据字典，若data为null，则通过http请求获取远程数据字典,
        //   value: 'busiDomainCode', // value的属性名
        //   label: 'busiDomainName', // label的属性名
        //   url: 'appcenter/platformdomain/querydomainlist',
        //   cache: true
        // },
        search: {
          disabled: false
        }
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
        title: '地区',
        key: 'city',
        rowSlot: true
      },
      {
        title: '工作单位',
        key: 'companyName'
      }
    ]
  }
}
