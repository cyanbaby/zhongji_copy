/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-15 13:42:33
 * @FilePath: \p-front-admin\src\views\join\plane\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions

export const crudOptions = (vm) => {
  return {
    searchOptions: {
      // debounce: false, //关闭防抖
      valueChange: true // 搜索框开启valueChange
    },
    rowHandle: {
      width: 200,
      remove: {
        show: false
      },
      edit: { show: false },
      dropdown: {
        atLeast: 7, // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
        text: '更多', // dropdown按钮文字
        type: 'text',
        icon: 'el-icon-more'
      },
      custom: [
        {
          text: '下载报名表',
          emit: 'toDownloadSignTable',
          size: 'small',
          type: 'text'
        },
        {
          text: '下载准考证',
          emit: 'toDownloadExamTable',
          size: 'small',
          type: 'text',
          disabled (index, row) {
            return String(row.activityStatus) === '2'
          }
        }
      ]
    },
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '切换报名',
        key: 'activityId',
        minWidth: 100,
        type: 'select',
        show: false,
        dict: {
          url: '/signupservice/signup/position/positionlist', // 当前select请求来源的Api
          value: 'activityId',
          label: 'activityName',
          cache: true
        },
        search: {
          disabled: false
        },
        rowSlot: true,
        form: {
          /**
             * @param value 当前选择的值
             * @param form 当前表单
             * @param getColumn 获取字段配置的方法，getColumn(keyName) 返回keyName的字段配置，可以动态修改组件配置
             * @param mode 当前模式:【add、edit、search】
             * @param component 当前组件的ref
             * @param immediate 是否是对话框打开后立即触发的
             * @param getComponent 获取组件Ref的方法， getComponent(keyName), 返回组件ref，可以动态调用该组件的方法
                  注意：当component未初始化或者没有显示时，是获取不到组件ref的
          **/
          valueChange (key, value, form, { getColumn, mode, component, immediate, getComponent }) {
            // form表单数据change事件，表单值有改动将触发此事件
            form.activityId = value
            form.positionName = ''
            if (value) {
              getComponent('positionName').reloadDict() // 执行functionCatlogId的select组件的reloadDict()方法，触发“functionCatlogId”重新加载字典
            }
          },
          valueChangeImmediate: false
        }

      },
      {
        title: '姓名',
        key: 'name',
        minWidth: 100,
        search: {
          disabled: false
        }
      },
      {
        title: '性别',
        key: 'sex',
        minWidth: 50,
        type: 'select',
        dict: {
          data: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 2
            },
            {
              label: '未知',
              value: 0
            }
          ]
        },
        valueBuilder (row) {
          if (row.sex === 1) {
            row.sexName = '男'
          } else if (row.sex === 2) {
            row.sexName = '女'
          } else {
            row.sexName = '未知'
          }
        },
        valueResolve (row, key) {
          if (row.sex > 0) {
            row.sexName = key.dict.data[row.sex - 1].label
          } else {
            row.sexName = '未知'
          }
        },
        search: {
          disabled: false
        }
      },
      {
        title: '手机号码',
        key: 'mobile',
        minWidth: 100
      },
      {
        title: '邮箱',
        key: 'email',
        minWidth: 100
      },
      {
        title: '身份证号',
        key: 'idCard',
        minWidth: 100
      },
      {
        title: '报名岗位',
        key: 'positionName',
        width: 100,
        // rowSlot: true, // 配置启用插槽自定义
        search: {
          disabled: false,
          component: {
            props: {
              filterable: true,
              clearable: true
            }
          }
        },
        type: 'select',
        dict: {
          url: (dict, { form, component }) => {
            if (form.activityId) {
              return '/signupservice/signup/position/activitypositionlist?pageNum=1&pageSize=100&activityId=' +
                form.activityId
            } else { return undefined }
          },
          transfer: (data, options) => {
            return data
          },
          value: 'positionId', // value的属性名
          label: 'positionName' // label的属性名
        },
        valueBuilder (row) {
          return row.positionName
        }
      },
      {
        title: '考点考场',
        key: 'examInfo',
        show: false,
        width: 100,
        valueBuilder (row) {
          return row.examAreaName + row.examPointName
        }
      },
      {
        title: '状态',
        key: 'auditStatusDesc'
      }
    ]
  }
}
