import mockUtil from '@/business/mock/base'

const options = {
  name: 'fix',
  idGenerator: 0
}
const list = [
  {
    data: 'data1',
    time: '2020-01-01 11:11:11',
    province: 'wh',
    amount: 100
  },
  {
    data: 'data2',
    province: 'sh',
    time: '2020-01-01 11:11:11',
    amount: 100
  },
  {
    data: 'data3',
    province: 'gz',
    time: '2020-01-01 11:11:11',
    amount: 100
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
