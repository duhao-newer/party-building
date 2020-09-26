import { getallaction } from '@/api/interaction'

const getDefaultState = () => { return {} }
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取帖子列表
    interactionlist({ commit }, msg) {
        return new Promise((resolve, reject) => {
            getallaction(msg).then(response => {
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

