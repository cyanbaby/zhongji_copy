import StringUtils from 'd2-crud-plus/src/lib/utils/util.string'

function toNooning (date) {
  if (date == null) {
    date = new Date()
  }
  date.setHours(12)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}
function addDays (date, days) {
  date.setTime(date.getTime() + 3600 * 1000 * 24 * days)
}

const shortcuts = [
  {
    text: '今天一晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 1)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天两晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 2)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天三晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '今天四晚',
    onClick (picker) {
      const start = new Date()
      const end = toNooning()
      addDays(end, 4)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天一晚',
    onClick (picker) {
      const start = toNooning()
      const end = toNooning()
      addDays(start, 1)
      addDays(end, 2)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天两晚',
    onClick (picker) {
      const start = new Date()
      const end = new Date()
      addDays(start, 1)
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '明天三晚',
    onClick (picker) {
      const start = new Date()
      const end = new Date()
      addDays(start, 1)
      addDays(end, 3)
      picker.$emit('pick', [start, end])
    }
  }
]

export const crudOptions = {
  formOptions: {
    width: '60%'
  },
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
  },
  searchOptions: {
    form: {
      daterange: [] // 表单重置bug
    }
  },
  columns: [
    {
      title: 'ID',
      key: 'id',
      width: 90,
      form: {
        disabled: true
      }
    },
    {
      title: '时间戳',
      key: 'timestamp',
      sortable: true,
      type: 'datetime',
      search: { width: 185 },
      component: {
        props: {
          elProps: {
            clearable: true
          }
        }
      }
    },
    {
      title: '清空时间戳',
      key: 'clear',
      sortable: true,
      type: 'button',
      form: {
        valueChange (key, value, form, others) {
          form.timestamp = ''
        },
        helper: '仅做valueChange的演示，实际清空输入框有更好的方式'
      }
    },
    {
      title: '日期时间',
      key: 'datetime',
      sortable: true,
      type: 'datetime',
      form: {
        component: {
          props: {
            format: 'yyyy-MM-dd HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm'
          }
        }
      },
      component: {
        props: {
          // 行展示组件使用的dayjs，格式化标准与el-datepicker不一样
          format: 'YYYY-MM-DD HH:mm'
        }
      }
    },
    {
      title: '仅日期',
      key: 'date',
      sortable: true,
      type: 'date'
    },
    {
      title: '禁用日期',
      key: 'date2',
      sortable: true,
      type: 'date',
      form: {
        component: {
          props: {
            'picker-options': {
              disabledDate (time) {
                return time.getTime() < Date.now()
              }
            }
          }
        }
      }
    },
    {
      title: '仅时间',
      key: 'time',
      sortable: true,
      type: 'time'
    },
    {
      title: '日期范围',
      key: 'daterange',
      sortable: true,
      type: 'daterange',
      search: { disabled: false, width: 300 },
      form: {
        component: {
          props: {
            'time-arrow-control': false,
            'picker-options': { shortcuts: shortcuts }
          }
        }
      },
      valueBuilder (row, key) {
        if (!StringUtils.hasEmpty(row.daterangeStart, row.daterangeEnd)) {
          row.daterange = [new Date(row.daterangeStart), new Date(row.daterangeEnd)]
        }
      },
      valueResolve (row, key) {
        if (row.daterange != null && row.daterange.length > 1) {
          row.daterangeStart = row.daterange[0].getTime()
          row.daterangeEnd = row.daterange[1].getTime()
        } else {
          row.daterangeStart = null
          row.daterangeEnd = null
        }
      }
    },
    {
      title: '日期时间范围',
      key: 'datetimerange',
      sortable: true,
      type: 'datetimerange',
      width: 300,
      form: {
        component: {
          props: {
            'time-arrow-control': true,
            'default-time': ['12:00:00', '12:00:00'],
            'picker-options': { shortcuts: shortcuts }
          }
        }
      },
      valueBuilder (row, key) {
        if (!StringUtils.hasEmpty(row.datetimerangeStart, row.datetimerangeEnd)) {
          row.datetimerange = [new Date(row.datetimerangeStart), new Date(row.datetimerangeEnd)]
        }
      },
      valueResolve (row, key) {
        if (row.datetimerange != null && !StringUtils.hasEmpty(row.datetimerange)) {
          row.datetimerangeStart = row.datetimerange[0].getTime()
          row.datetimerangeEnd = row.datetimerange[1].getTime()
        } else {
          row.datetimerangeStart = null
          row.datetimerangeEnd = null
        }
      }
    }
  ]
}
