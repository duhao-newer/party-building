import { customerlist } from '@/api/customer'

const getDefaultState = () => {
    return {

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

