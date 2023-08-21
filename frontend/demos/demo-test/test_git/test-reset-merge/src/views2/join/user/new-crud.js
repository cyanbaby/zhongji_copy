/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 11:00:23
 * @FilePath: \o-front-admin\src\views\join\user\crud.js
 */

// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = (vm) => {
  return {
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
          text: '审核报名人',
          emit: 'audit',
          size: 'small',
          type: 'text'
        }
      ]
    },
    selectionRow: {
      align: 'center',
      width: 46
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '姓名',
        key: 'userName',
        width: 80,
        search: {
          width: 100,
          disabled: false
        }
      },
      {
        title: '性别',
        key: 'gender',
        width: 80,
        type: 'select',
        dict: {
          data: [
            {
              value: '1',
              label: '男'
            },
            {
              value: '2',
              label: '女'
            }
          ],
          value: 'value', // value的属性名
          label: 'label' // label的属性名
        }
      },
      {
        title: '身份证号',
        key: 'idCardNum',
        minWidth: 150,
        search: {
          width: 200,
          disabled: false
        }
      },
      {
        title: '手机号',
        key: 'mobile',
        minWidth: 120,
        search: {
          disabled: false
        }
      },
      {
        title: '工作单位',
        key: 'companyJob',
        minWidth: 120
        // type: "select",
      },
      // {
      //   title: "申报岗位",
      //   key: "positionId",
      //   minWidth: 150,
      //   show: true, // 是否在列表中显示该列（列配置中可选），也可以配置一个无参方法
      //   search: {
      //     disabled: false,
      //   },
      //   type: "select",
      //   dict: {
      //     url:
      //       "/signupservice/position/orgpositionlist?pageNum=1&pageSize=100&activityId=" +
      //       vm.$route.query.activityId,
      //     cache: true,
      //     value: "positionId", // value的属性名
      //     label: "positionName", // label的属性名
      //   },
      //   rowSlot: true,
      // },
      {
        title: '审核状态',
        key: 'auditStatus',
        width: 130,
        type: 'select',
        dict: {
          data: [
            {
              value: 0,
              label: '待审核',
              color: 'warning'
            },
            {
              value: 1,
              label: '审核通过',
              color: 'success'
            },
            {
              value: 2,
              label: '审核不通过',
              color: 'danger'
            },
            {
              value: 3,
              label: '无需审核',
              color: 'info'

            }
          ],
          value: 'value', // value的属性名
          label: 'label' // label的属性名
        },
        search: {
          disabled: false
        }
        // rowSlot: true
      },
      {
        title: '短信发送状态',
        key: 'isSendAuditMessage',
        width: 130,
        type: 'select',
        dict: {
          data: [
            {
              value: 0,
              label: '未发送'
            },
            {
              value: 1,
              label: '已发送'
            }
          ]
        },
        search: {
          disabled: false
        }
      }
    ]
  }
}
