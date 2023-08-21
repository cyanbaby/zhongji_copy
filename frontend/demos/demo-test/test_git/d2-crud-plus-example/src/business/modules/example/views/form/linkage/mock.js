import mockUtil from '@/business/mock/base'

const options = {
  name: 'linkage',
  idGenerator: 0
}
const list = [
  {
    province: 10000,
    city: 100003,
    county: 100004
  },
  {
    province: 10010,
    city: 100113,
    county: 100115
  },
  {
  }

]
const tree = [
  {
    id: 10000,
    label: '北京市',
    children: [
      {
        id: 100003,
        label: '北京市辖区',
        children: [
          { id: 100004, label: '东城区' }, { id: 100005, label: '西城区' }]
      },
      {
        id: 100103,
        label: '北京郊区',
        children: [
          { id: 100104, label: '东郊' }, { id: 100105, label: '西郊' }]
      }
    ]
  },
  {
    id: 10010,
    label: '天津市',
    children: [
      {
        id: 100013,
        label: '天津市辖区',
        children: [
          { id: 100014, label: '天津湾' }, { id: 100015, label: '渤海湾' }]
      },
      {
        id: 100113,
        label: '天津市郊区',
        children: [
          { id: 100114, label: '天津湾郊区' }, { id: 100115, label: '渤海湾郊区' }]
      }
    ]
  }
]

options.list = list
options.copyTimes = 1000
const mock = mockUtil.buildMock(options)

mock.push({
  path: '/linkage/province',
  method: 'get',
  handle (req) {
    return {
      code: 0,
      msg: 'success',
      data: tree
    }
  }
})

mock.push({
  path: '/linkage/city',
  method: 'get',
  handle (req) {
    const province = parseInt(req.params.province)
    const a = tree.filter(item => {
      return item.id === province
    })
    console.log('aaa', a)
    return {
      code: 0,
      msg: 'success',
      data: a[0].children
    }
  }
})

mock.push({
  path: '/linkage/county',
  method: 'get',
  handle (req) {
    const province = parseInt(req.params.province)
    const a = tree.filter(item => {
      return item.id === province
    })
    const city = parseInt(req.params.city)
    const b = a[0].children.filter(item => {
      return item.id === city
    })
    return {
      code: 0,
      msg: 'success',
      data: b[0].children
    }
  }
})

export default mock
