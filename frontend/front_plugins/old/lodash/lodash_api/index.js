var _ = require('lodash')

  ; (() => {
    var newValue = [3, 2, 1]
    var oldValue = [1, 2, 3]

    var res = _.difference(newValue, oldValue)

    console.log(res) // []
  })


  ; (() => {
    var newValue = [3, 2, 1, { name: '张三' }]
    var oldValue = [1, 2, 3, { name: '张三' }]

    var res = _.difference(newValue, oldValue)

    console.log(res) // [ { name: '张三' } ]
  })


  ; (() => {
    var user = { name: '张三' }
    var newValue = [3, 2, 1, user]
    var oldValue = [1, 2, 3, user]

    var res = _.difference(newValue, oldValue)

    console.log(res)  // []
  })

  // TODO proxy对象去vue3 demo里去测试 _.isEqual


  ; (() => {
    var newValue = [3, 2, 1, { name: '张三' }]
    var oldValue = [1, 2, 3, { name: '张三' }]
    var res = _.differenceWith(newValue, oldValue, _.isEqual)

    console.log(res) // [ { name: '张三' } ]
  })()