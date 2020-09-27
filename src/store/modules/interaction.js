import { getallaction,deleteaction ,deleteallaction} from '@/api/interaction'

const getDefaultState = () => { return {} }
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取帖子列表
    interactionlist({ commit }, msg) {
        return new Promise((resolve, reject) => {
            getallaction(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 删除帖子
    deleteinteraction({ commit }, msg) {
        return new Promise((resolve, reject) => {
            deleteaction(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //批量删除帖子
     deleteallinteraction({ commit }, msg) {
        return new Promise((resolve, reject) => {
            deleteallaction(msg).then(response => {
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

