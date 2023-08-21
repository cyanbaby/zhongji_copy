import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const JSONbig = require('json-bigint')
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response.data.data.testID)

    // const str = '{ "id": 90071992547410055}'
    // const str = '{ "id": 2022092305030000000000000339}'
    // console.log(JSONbig.parse(str))
    // console.log(JSONbig.parse(str).id.toString())

    // var JSONbig = require('json-bigint');

    // var json = '{ "value" : 9223372036854775807, "v2": 123 }';
    // console.log('Input:', json);
    // console.log('');

    // console.log('node.js built-in JSON:');
    // var r = JSON.parse(json);
    // console.log('JSON.parse(input).value : ', r.value.toString());
    // console.log('JSON.stringify(JSON.parse(input)):', JSON.stringify(r));

    // console.log('\n\nbig number JSON:');
    // var r1 = JSONbig.parse(json);
    // console.log('JSONbig.parse(input).value : ', r1.value.toString());
    // console.log('JSONbig.stringify(JSONbig.parse(input)):', JSONbig.stringify(r1));


    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
