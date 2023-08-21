const roomTypes = [
  { value: 1, label: '大床房', color: 'warning' },
  { value: 2, label: '双床房', color: 'primary' },
  { value: 3, label: '豪华双床房', color: 'success' },
  { value: 4, label: '豪华大床房', color: 'info' },
  { value: 10, label: '套房', color: 'info' }
]
const roomStatus = [
  { name: 'EMPTY', value: 0, label: '空房', color: 'primary' },
  { name: 'OCCUPY', value: 1, label: '住客', color: 'success' },
  { name: 'BOOKED', value: 2, label: '预定', color: 'warning' },
  { name: 'FAULT', value: 3, label: '故障', color: 'danger' },
  { name: 'DISABLED', value: 4, label: '停用', color: 'info' }
]

const roomList = [
  { name: '1', value: 1, label: '1001', color: 'warning' },
  { name: '2', value: 2, label: '1002', color: 'primary' },
  { name: '3', value: 3, label: '1003', color: 'success' },
  { name: '4', value: 4, label: '1004', color: 'info' },
  { name: '5', value: 5, label: '1005', color: 'danger' },
  { name: '6', value: 6, label: '1006', color: 'warning' },
  { name: '7', value: 7, label: '1007', color: 'primary' },
  { name: '9', value: 9, label: '1008', color: 'info' },
  { name: '8', value: 8, label: '1009', color: 'success' },
  { name: '10', value: 10, label: '1010', color: 'info' },
  { name: '11', value: 11, label: '1011', color: 'danger' }
]

const openStatus = [
  { value: '1', label: '打开', color: 'success' },
  { value: '2', label: '停止', color: 'info' },
  { value: '0', label: '关闭', color: 'danger' }
]

const cascaderData = [
  {
    value: 'zhinan',
    label: '指南2',
    children: [{
      value: 'shejiyuanze',
      label: '设计原则2',
      children: [{
        value: 'yizhi',
        label: '一致2'
      }, {
        value: 'fankui',
        label: '反馈2'
      }, {
        value: 'xiaolv',
        label: '效率'
      }, {
        value: 'kekong',
        label: '可控'
      }]
    }, {
      value: 'daohang',
      label: '导航',
      children: [{
        value: 'cexiangdaohang',
        label: '侧向导航'
      }, {
        value: 'dingbudaohang',
        label: '顶部导航'
      }]
    }]
  }, {
    value: 'zujian',
    label: '组件',
    children: [{
      value: 'basic',
      label: 'Basic',
      children: [{
        value: 'layout',
        label: 'Layout 布局'
      }, {
        value: 'color',
        label: 'Color 色彩'
      }, {
        value: 'typography',
        label: 'Typography 字体'
      }, {
        value: 'icon',
        label: 'Icon 图标'
      }, {
        value: 'button',
        label: 'Button 按钮'
      }]
    }, {
      value: 'form',
      label: 'Form',
      children: [{
        value: 'radio',
        label: 'Radio 单选框'
      }, {
        value: 'checkbox',
        label: 'Checkbox 多选框'
      }, {
        value: 'input',
        label: 'Input 输入框'
      }, {
        value: 'input-number',
        label: 'InputNumber 计数器'
      }, {
        value: 'select',
        label: 'Select 选择器'
      }, {
        value: 'cascader',
        label: 'Cascader 级联选择器'
      }, {
        value: 'switch',
        label: 'Switch 开关'
      }, {
        value: 'slider',
        label: 'Slider 滑块'
      }, {
        value: 'time-picker',
        label: 'TimePicker 时间选择器'
      }, {
        value: 'date-picker',
        label: 'DatePicker 日期选择器'
      }, {
        value: 'datetime-picker',
        label: 'DateTimePicker 日期时间选择器'
      }, {
        value: 'upload',
        label: 'Upload 上传'
      }, {
        value: 'rate',
        label: 'Rate 评分'
      }, {
        value: 'form',
        label: 'Form 表单'
      }]
    }, {
      value: 'data',
      label: 'Data',
      children: [{
        value: 'table',
        label: 'Table 表格'
      }, {
        value: 'tag',
        label: 'Tag 标签'
      }, {
        value: 'progress',
        label: 'Progress 进度条'
      }, {
        value: 'tree',
        label: 'Tree 树形控件'
      }, {
        value: 'pagination',
        label: 'Pagination 分页'
      }, {
        value: 'badge',
        label: 'Badge 标记'
      }]
    }, {
      value: 'notice',
      label: 'Notice',
      children: [{
        value: 'alert',
        label: 'Alert 警告'
      }, {
        value: 'loading',
        label: 'Loading 加载'
      }, {
        value: 'message',
        label: 'Message 消息提示'
      }, {
        value: 'message-box',
        label: 'MessageBox 弹框'
      }, {
        value: 'notification',
        label: 'Notification 通知'
      }]
    }, {
      value: 'navigation',
      label: 'Navigation',
      children: [{
        value: 'menu',
        label: 'NavMenu 导航菜单'
      }, {
        value: 'tabs',
        label: 'Tabs 标签页'
      }, {
        value: 'breadcrumb',
        label: 'Breadcrumb 面包屑'
      }, {
        value: 'dropdown',
        label: 'Dropdown 下拉菜单'
      }, {
        value: 'steps',
        label: 'Steps 步骤条'
      }]
    }, {
      value: 'others',
      label: 'Others',
      children: [{
        value: 'dialog',
        label: 'Dialog 对话框'
      }, {
        value: 'tooltip',
        label: 'Tooltip 文字提示'
      }, {
        value: 'popover',
        label: 'Popover 弹出框'
      }, {
        value: 'card',
        label: 'Card 卡片'
      }, {
        value: 'carousel',
        label: 'Carousel 走马灯'
      }, {
        value: 'collapse',
        label: 'Collapse 折叠面板'
      }]
    }]
  }, {
    value: 'ziyuan',
    label: '资源',
    children: [{
      value: 'axure',
      label: 'Axure Components'
    }, {
      value: 'sketch',
      label: 'Sketch Templates'
    }, {
      value: 'jiaohu',
      label: '组件交互文档'
    }]
  }]

export default [
  {
    path: '/hotel/roomtype/options',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: roomTypes
      }
    }
  },
  {
    path: '/hotel/dicts/RoomStatusEnum',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: roomStatus
      }
    }
  },
  {
    path: '/hotel/room/options',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: roomList
      }
    }
  },
  {
    path: '/dicts/OpenStatusEnum',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: openStatus
      }
    }
  },
  {
    path: '/dicts/cascader',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: cascaderData
      }
    }
  },
  {
    path: '/dicts/_OpenStatusEnum',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: openStatus
      }
    }
  }

]
