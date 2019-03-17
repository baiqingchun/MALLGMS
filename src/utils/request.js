import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'

// 创建axios实例
export let service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log('Method:' + config.method);
    // if (config.method == 'post')


    if (store.getters.token) {
      // console.log("11111111",getToken())
      // config.headers['x-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      // config.headers['Accept']='application/json, text/plain, */*'
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

function errHandle(res) {
  if (res.code && res.code !== '200') {
    throw res
  }
  return res
}

export function rest(method, url, params, data) {
  params = {...{token: getToken()},...params}
  return service.request({
    url,
    method,
    params,
    data
  }).then(res => res.data).then(errHandle)
}

export function get(url, params) {
  return rest('get', url, {...params})
}

export function post(url, data, params) {
  return rest('post', url, {...params}, data)
}

export function patch(url, data, params) {
  return rest('patch', url, {...params}, data)
}

export function put(url, data, params) {
  return rest('put', url, {...params}, data)
}

export function del(url, params) {
  return rest('delete', url, {...params})
}

export function encodeUrl(tempArray, ...tempData) {
  let result = tempArray[0]
  for (let i = 1; i < tempArray.length; i++) {
    result += encodeURIComponent(tempData[i - 1])
    result += tempArray[i]
  }
  return result
}



export default {get,post,put,del,patch,rest}
// // response 拦截器
// service.interceptors.response.use(
//   response => {
//     /**
//      * code为非20000是抛错 可结合自己业务进行修改
//      */
//     const res = response.data
//     if (res.code !== 20000) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//
//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm(
//           '你已被登出，可以取消继续留在该页面，或者重新登录',
//           '确定登出',
//           {
//             confirmButtonText: '重新登录',
//             cancelButtonText: '取消',
//             type: 'warning'
//           }
//         ).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload() // 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//       return Promise.reject('error')
//     } else {
//       return response.data
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service
