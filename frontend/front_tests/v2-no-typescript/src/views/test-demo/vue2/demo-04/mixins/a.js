import aa from './aa.js'

export default {
  mixins: [aa],
  data() {
    return {
      // name: 'A'
    }
  },
  created() {
    console.log('A.js  created')
  }
}
