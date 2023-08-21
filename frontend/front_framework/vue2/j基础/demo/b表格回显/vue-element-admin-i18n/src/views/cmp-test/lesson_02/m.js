export const mixin = {
  data() {
    return {
      msg: 'm.js消息',
      user: {
        name: '张三',
        age: 18
      },
      text: 'hello world'
    }
  },
  methods: {
    changeText() {
      this.text = 'hi mixins'
    }
  }
}
