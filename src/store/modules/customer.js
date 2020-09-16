import { customerlist } from '@/api/customer'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        // token: getToken(),
        // name: '',
        // avatar: '',
    }
}

const state = getDefaultState()

const mutations = {

}

const actions = {
    // 获取党员列表
    customers({ commit }, msg) {
        return new Promise((resolve, reject) => {
            customerlist(msg).then(response => {
                console.log(response)
                // const { data } = response
                // console.log(data)
                // commit('SET_TOKEN', response.token)
                // setToken(response.token)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

