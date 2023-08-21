import mockUtil from '@/business/mock/base'

const options = {
  name: 'date',
  idGenerator: 0
}
const list = [
  {
    timestamp: 123123123123,
    datetime: '2019-09-20 11:11:11',
    date: '2019-09-20 11:11:11',
    time: 12313123334,
    daterangeStart: '2019-09-20 11:11:11',
    daterangeEnd: '2019-09-21 11:11:11',
    datetimerangeStart: '2019-09-20 11:11:11',
    datetimerangeEnd: '2019-09-21 11:11:11'
  },
  {
    timestamp: 444444555,
    datetime: '2017-09-20 11:11:11',
    date: '2019-09-20 11:11:11',
    time: 12313123334,
    daterangeStart: '2019-09-20 11:11:11',
    daterangeEnd: '2019-09-21 11:11:11',
    datetimerangeStart: '2019-09-20 11:11:11',
    datetimerangeEnd: '2019-09-21 11:11:11'
  },
  {
    timestamp: 5555555555,
    datetime: '2017-09-20 11:11:11',
    date: '2019-09-20 11:11:11',
    time: 12313123334,
    daterangeStart: '2019-09-20 11:11:11',
    daterangeEnd: '2019-09-21 11:11:11',
    datetimerangeStart: '2019-09-20 11:11:11',
    datetimerangeEnd: '2019-09-21 11:11:11'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
