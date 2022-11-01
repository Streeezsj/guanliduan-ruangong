import { login, logout, getInfo,loginphone } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { code,data } = response
        if (code === 200) {
          localStorage.setItem('token', response.data.token)
          console.log('successSetToken')
         }
        commit('SET_TOKEN', data.token)
        console.log('aaaaaaa','SET_TOKEN');
        window.sessionStorage.setItem('token', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })

  },

  //--------------------------------------------

  loginphone({ commit }, userInfo) {
    const { phone, code } = userInfo
    return new Promise((resolve, reject) => {
      loginphone( phone, code ).then(response => {
        const { code,data } = response
        // if (code === 0) {
        //   localStorage.setItem('token', response.data.token)
        //   console.log('successSetToken')
        //  }
        // commit('SET_TOKEN', data.token)
        // window.sessionStorage.setItem('token', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })

  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        name: 'Super Admin',
        avatar: 'https://img0.baidu.com/it/u=3608430476,1945954109&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=494'
      }
      if (!data) {
        return reject('Verification failed, please Login again.')
      }
      const { name, avatar,roles,introduction } = data
      //const { name, avatar } = data
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

