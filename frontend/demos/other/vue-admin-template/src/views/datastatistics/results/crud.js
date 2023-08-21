
export const crudOptions = (vm) => {
  return {
    rowHandle: false,
    columns: [
      {
        title: '培训班名称',
        key: 'trainingClassName',
        width: 350,
        search: {
          disabled: false,
          component: {
            props: {
              clearable: true
            }
          }
        }
      },
      {
        title: '科目类型',
        key: 'subjectType',
        width: 120,
        type: 'select',
        dict: {
          data: [
            {
              value: '0',
              label: '公需科目'
            },
            {
              value: '1',
              label: '专业科目'
            },
            {
              value: '2',
              label: '公需+专业科目'
            }
          ],
          value: 'value', // value的属性名
          label: 'label' // label的属性名
        }
      },
      {
        title: '学时',
        key: 'period',
        width: 60
      },
      {
        title: '学员姓名',
        key: 'name',
        width: 80,
        search: {
          width: 100,
          disabled: false,
          component: {
            props: {
              clearable: true
            }
          }
        }
      },

      {
        title: '身份证号',
        key: 'certNo',
        minWidth: 120,
        search: {
          width: 200,
          disabled: false,
          component: {
            props: {
              clearable: true
            }
          }
        }

      },
      {
        title: '手机号',
        key: 'phone',
        minWidth: 80,
        search: {
          disabled: false,
          component: {
            props: {
              clearable: true
            }
          }
        }

      },
      {
        title: '报名序号',
        key: 'signUpNumber',
        minWidth: 120,
        valueBuilder (row, key) {
          if (row.signUpNumber == 0) {
            row.signUpNumber = '--'
          }
        }
      },
      {
        title: '考试成绩',
        key: 'testScore',
        minWidth: 60,
        valueBuilder (row, key) {
          if (row.testScore == 0) {
            row.testScore = '--'
          }
        }
      },
      {
        title: '合格时间',
        key: 'qualifyingTime',
        minWidth: 120

      },
      {
        title: '同步状态',
        key: 'syncStatus',
        width: 100,
        type: 'select',
        rowSlot: true,
        dict: {
          data: [
            {
              value: 0,
              label: '全部',
              color: 'info'
            },
            {
              value: 1,
              label: '未同步',
              color: 'info'
            },
            {
              value: 2,
              label: '已同步',
              color: 'info'
            },
            {
              value: 3,
              label: '同步失败',
              color: 'danger'
            }
          ],
          value: 'value', // value的属性名
          label: 'label' // label的属性名
        },
        form: {
          component: {
            value: 0
          }
        },
        search: {
          disabled: false
        }
      }
    ]
  }
}
