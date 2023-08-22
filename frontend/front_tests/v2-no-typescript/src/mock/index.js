const _ = require('lodash')
const Mock = require('mockjs') // mockjs 导入依赖模块
const util = require('./util') // 自定义工具模块

let _json = null

// 返回一个函数
module.exports = function ({ app }) {
  // console.log(app)

  // 监听http请求
  app.get('/user/userinfo', function (req, res) {
    // 每次响应请求时读取mock data的json文件

    const { page = 1, limit = 20 } = req.query

    // util.getJsonFile方法定义了如何读取json文件并解析成数据对象
    const json = util.getJsonFile('./userInfo.json')

    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    const mockJson = _json || Mock.mock(json)
    _json = mockJson

    const mockResponder = _.cloneDeep(mockJson)

    mockResponder.data.list = mockJson.data.list.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    res.json(mockResponder)
  })
}
