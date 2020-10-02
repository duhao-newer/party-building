import { getallcomment, updatecomment, addcomment, findcommentById ,updatecommentById} from '@/api/Democraticappraisal'

const getDefaultState = () => { return {} }
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取评议列表
    commentlist({ commit }, msg) {
        return new Promise((resolve, reject) => {
            getallcomment(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 更新评议状态
    upcomment({ commit }, msg) {
        return new Promise((resolve, reject) => {
            updatecomment(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //添加评议
    addcommit({ commit }, msg) {
        return new Promise((resolve, reject) => {
            addcomment(msg).then(response => {
                console.log(response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //查看评议
    findcommit({ commit }, msg) {
        return new Promise((resolve, reject) => {
            findcommentById(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //修改评议
    updatecommit({ commit }, msg) {
        return new Promise((resolve, reject) => {
            updatecommentById(msg).then(response => {
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

