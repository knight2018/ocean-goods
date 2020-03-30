import axios from 'axios'
import store from '@/store'
import { getToken, setToken } from '@/libs/util'
import router from '@/router/index'
import Vue from 'vue'
// import { Spin } from 'iview'
const self  = new Vue();
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.defaults.headers.common['Authorization'] = getToken()
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (data.code === 10000) {
        return { data, status }
      } else {
        console.log(data.msg)
        self.$Message.error(data.msg)
        return Promise.reject(res)
      }

    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      console.log(errorInfo)
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      console.log(errorInfo)
      if (errorInfo.status === 661 && errorInfo.data.code === 10002) {
        self.$Message.error(errorInfo.data.msg)
        setToken('')
        router.replace({
          path: 'login'
        })
      }else{
        self.$Message.error(errorInfo.data.msg)
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
