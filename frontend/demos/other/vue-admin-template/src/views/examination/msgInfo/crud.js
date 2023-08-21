/*
 * @Date: 2021-02-22 13:51:57
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-05-26 22:24:07
 * @FilePath: \o-front-admin\src\views\examination\msgInfo\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = vm => {
  return {
    rowHandle: false,
    formOptions: {
      closeOnClickModal: false
    },
    columns: [
      {
        title: '姓名',
        key: 'studentName',
        minWidth: 150,
        search: {
          disabled: false
        }
      },
      {
        title: '渠道',
        key: 'noticeChannel',
        width: 150,
        type: 'select',
        dict: {
          data: [
            {
              label: '短信通知',
              value: '1'
            },
            {
              label: '邮件通知',
              value: '2'
            }
          ]
        },
        search: {
          disabled: false
        }
      },
      // 动态显示，当短信通知时显示用户手机号/邮件通知时显示用户邮箱
      {
        title: '发送对象',
        key: 'mobile',
        width: 150,
        form: {
          component: {
            show: ({ key, value, form }) => {
              console.log('show:', key, value, form)
              return form.noticeChannel === '1'
            }
          }
        },
        search: {
          disabled: false
        }
      }, {
        title: '发送对象',
        key: 'email',
        width: 150,
        form: {
          component: {
            show: ({ key, value, form }) => {
              console.log('show:', key, value, form)
              return form.noticeChannel === '2'
            }
          }
        },
        search: {
          disabled: false
        }
      },
      {
        title: '状态',
        key: 'status',
        width: 80,
        type: 'select',
        dict: {
          data: [
            {
              label: '未发送',
              value: '1'
            },
            {
              label: '发送中',
              value: '2'
            }, {
              label: '已发送',
              value: '3'
            }, {
              label: '发送失败',
              value: '4'
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
