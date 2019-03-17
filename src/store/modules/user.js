import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import  {get,post,put,del,patch} from  '@/utils/request'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return post(`/api/gvrchat/admin/login/${username}/${userInfo.password}`).then(function (udata) {
        const data = udata.data
        console.log(data.token)
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        return udata
      })
      // return new Promise((resolve, reject) => {
      //   login(username, userInfo.password).then(response => {
      //     const data = response.data
      //     setToken(data.token)
      //     commit('SET_TOKEN', data.token)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      // rest('get','api/gvrchat/admin/userinfo')
      // service.request({
      //  url: 'api/gvrchat/admin/userinfo',
      //   mothod:'get'
      // }).then(res => res.data).then(function () {
      //
      // })

      return get('api/gvrchat/admin/userinfo').then(function (response) {
        const data = response.data
        if (data.role) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLE', data.role)
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatarUrl)
        commit('SET_PHONE', data.phone)
      })
      // return new Promise((resolve, reject) => {
      //   getInfo(state.token).then(response => {
      //     const data = response.data
      //     if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
      //       commit('SET_ROLE', data.roles)
      //     } else {
      //       reject('getInfo: roles must be a non-null array !')
      //     }
      //     commit('SET_NAME', data.name)
      //     commit('SET_AVATAR', data.avatar)
      //     resolve(response)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLE', 0)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
