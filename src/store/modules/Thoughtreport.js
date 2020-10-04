import { reportlist ,updateAcceptById,checkAll,selectById} from '@/api/Thoughtreport'

const getDefaultState = () => { return {} }
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取思想汇报列表
    getAllexpreience({ commit }, msg) {
        return new Promise((resolve, reject) => {
            reportlist(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
     // 批量审核
     checkAllexpreience({ commit }, msg) {
        return new Promise((resolve, reject) => {
            checkAll(msg).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
     // 查看详情
     findById({ commit }, msg) {
        return new Promise((resolve, reject) => {
            selectById(msg).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //审核
     updateAccept({ commit }, msg) {
        return new Promise((resolve, reject) => {
            updateAcceptById(msg).then(res => {
                resolve(res)
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

