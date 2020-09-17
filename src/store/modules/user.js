import { login ,updatepwd} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
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
  login({ commit }, userInfo) {
    let obj={
      username:userInfo.username.trim(),
      password:userInfo.password
    }
    return new Promise((resolve, reject) => {
      login(obj).then(response => {
        const { status,token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve(status)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //修改密码
  changepwd({commit},msg){
    return new Promise((resolve, reject) => {
      updatepwd(msg).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })

  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
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

