/*
 * @Author: 姚文彬
 * @Date: 2021-06-16 17:01:11
 * @LastEditors: 姚文彬
 * @LastEditTime: 2021-06-24 10:39:06
 * @FilePath: \o-front-admin\src\views\folder\picture\crud.js
 */
// doc:http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/options.html#crudoptions
export const crudOptions = () => {
  return {
    rowHandle: {
      width: 180,
      dropdown: {
        atLeast: 6 // 至少几个以上的按钮才会被折叠,注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置）
      },
      edit: {
        show: false
      },
      custom: [
        {
          text: '下载',
          emit: 'down',
          size: 'small',
          type: 'text'
        },
        {
          text: '详情',
          emit: 'info',
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
      // 尺寸信息、文件名、图片缩略图
      {
        title: '图片',
        key: 'fileUrl',
        minWidth: 250,
        rowSlot: true, // 配置启用插槽自定义
        editForm: {
          component: {
            show: false // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          }
        }
      },
      {
        title: '文件名',
        key: 'fileName',
        show: false,
        search: {
          disabled: false
        }
      },
      {
        title: '所属目录',
        key: 'dirId',
        show: false,
        type: 'cascader',
        dict: {
          // url: api.GET_Source_MENU,
          // TODO 级联数据格式转化
          data: [
            {
              value: '1',
              label: '资源',
              children: [
                {
                  value: '2',
                  label: 'Axure Components'
                },
                {
                  value: '3',
                  label: 'Sketch Templates'
                },
                {
                  value: '4',
                  label: '组件交互文档'
                }
              ]
            }
          ],
          isTree: true // 此数据字典是否是树形的，通常用于级联组件、地区选择组件等处
          // label: 'dirName',
          // value: 'dirId',
          // children: 'subDirList'
        },
        form: {
          component: {
            props: {
              elProps: {
                showAllLevels: false, // 仅显示最后一级
                props: {
                  checkStrictly: true, // 可以不需要选到最后一级
                  emitPath: false
                }
              }
            }
          }
        }
      },
      {
        title: '大小',
        key: 'fileSize',
        width: 150,
        editForm: {
          component: {
            show: false // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          }
        },
        rowSlot: true
      },
      {
        title: '上传时间',
        key: 'createTime',
        type: 'datetime',
        width: 200,
        editForm: {
          component: {
            show: false // 是否显示该字段，还可以配置为方法，动态显隐↓  ↓  ↓  ↓
          }
        }
      }

    ]
  }
}
