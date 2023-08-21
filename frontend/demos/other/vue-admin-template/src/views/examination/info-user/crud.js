/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-24 10:16:26
 * @FilePath: \o-front-admin\src\views\examination\info-user\crud.js
 */

// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = (vm) => {
  return {
    // 只处理发送短信业务
    rowHandle: {
      width: 100,
      dropdown: {
        atLeast: 5 // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
      },
      edit: {
        show: false
      },
      remove: {
        show: false
      },
      custom: [
        {
          text: '打印准考证',
          emit: 'audit',
          size: 'small',
          type: 'text'
        }
      ]
    },
    // selectionRow: {
    //   align: 'center',
    //   width: 46
    // },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '姓名',
        key: 'name',
        width: 100,
        search: {
          disabled: false
        }
      },
      {
        title: '性别',
        key: 'sex',
        minWidth: 70,
        type: 'select',
        search: {
          disabled: false
        },
        dict: {
          data: [
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '2'
            }
          ]
        }
      },
      {
        title: '手机号',
        key: 'mobile',
        minWidth: 150,
        form: { slot: true },
        search: {
          disabled: false
        }
      },
      {
        title: '邮箱',
        key: 'email',
        minWidth: 180
      },
      {
        title: '报考岗位',
        key: 'positionName',
        minWidth: 110
      },
      {
        title: '身份证',
        key: 'idCard',
        minWidth: 180
      },
      {
        title: '准考证号',
        key: 'examCardNo',
        width: 150,
        search: {
          disabled: false
        }
      },
      {
        title: '考点',
        key: 'examSiteName',
        width: 150
      },
      {
        title: '考场',
        key: 'examSiteName',
        form: { slot: true },
        show: false,
        // type: 'select',
        width: 150
        // search: {
        //   disabled: false,
        // },
        // dict: {
        //   url: 'signupservice/exam/site/examsiteroom',
        //   transfer: (data, options) => {
        //     return data
        //   },
        //   cache: true,
        //   value: 'examSiteId', // value的属性名
        //   label: 'examSiteName' // label的属性名
        // },
      },
      // {
      //   title: '',
      //   key: 'examRoomName',
      //   show: false,
      //   type: 'select',
      //   width: 150,
      //   dict: {
      //     url: 'signupservice/exam/site/examsiteroom',
      //     transfer: (data, options) => {
      //       debugger
      //       return data[0].examRoomListVOS
      //     },
      //     cache: true,
      //     value: 'examRoomId', // value的属性名
      //     label: 'examRoomName' // label的属性名
      //   },
      //   search: {
      //     disabled: false,
      //     component: {
      //       props: {
      //         placeholder: '请选择考场'
      //       }
      //     }
      //   },

      // },
      {
        title: '考场',
        key: 'examRoomName',
        width: 150
      },
      {
        title: '座位号',
        key: 'examSeatNu',
        width: 100
      },
      {
        title: '排考状态',
        key: 'processStatus',
        width: 100,
        type: 'select',
        dict: {
          data: [
            {
              label: '待排考',
              value: '1'
            },
            {
              label: '考生待排座',
              value: '2'
            },
            {
              label: '待公布准考证',
              value: '3'
            },
            {
              label: '公布准考证',
              value: '4'
            },
            {
              label: '待考试',
              value: '5'
            },
            {
              label: '考试中',
              value: '6'
            },
            {
              label: '待公布成绩',
              value: '7'
            },
            {
              label: '成绩通知',
              value: '8'
            },
            {
              label: '完结归档',
              value: '9'
            }
          ]
        }

      },
      {
        title: '成绩',
        key: 'score',
        width: 200
        // rowSlot: true
      },
      {
        title: '总成绩',
        key: 'totalScore',
        width: 200
      },
      {
        title: '排名',
        key: 'scoreRank',
        width: 150
      }
    ]
  }
}
