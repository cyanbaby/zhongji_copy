/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-09 11:00:23
 * @FilePath: \o-front-admin\src\views\join\user\crud.js
 */

// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = vm => {
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
        key: 'name',
        width: 80,
        search: {
          width: 100,
          disabled: false
        }
      },
      {
        title: '性别',
        key: 'sex',
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
        title: '身份证',
        key: 'idCard',
        minWidth: 150,
        search: {
          width: 200,
          disabled: false
        }
      },
      {
        title: '手机号',
        key: 'mobile',
        minWidth: 120
      },
      {
        title: '申报岗位',
        key: 'positionId',
        minWidth: 130,
        show: true, // 是否在列表中显示该列（列配置中可选），也可以配置一个无参方法
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          url: '/signupservice/signup/position/list?pageNum=1&pageSize=100&activityId=' + vm.$route.query.activityId,
          transfer: (data, options) => {
            return data.list
          },
          cache: true,
          value: 'positionId', // value的属性名
          label: 'positionName' // label的属性名
        }
        // rowSlot: true
      },
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
        title: '短信是否发送成功',
        key: 'auditMsgStatus',
        type: 'select',
        rowSlot: true,
        dict: {
          data: [
            {
              value: 1,
              label: '未发送'
            },
            {
              value: 2,
              label: '发送中'
            },
            {
              value: 3,
              label: '成功'
            },
            {
              value: 4,
              label: '失败'
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
