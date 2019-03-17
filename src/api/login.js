import {service} from '@/utils/request'
import axios from 'axios'
export function login(username, password) {
  return service({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return axios.request({
    url: 'api/gvrchat/admin/userinfo',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return service({
    url: '/user/logout',
    method: 'post'
  })
}
