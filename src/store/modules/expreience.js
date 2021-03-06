import { expreiencelist ,checkAll} from '@/api/Summaryofexperience'

const getDefaultState = () => { return {} }
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取总结列表
    getAllexpreience({ commit }, msg) {
        console.log(msg)
        return new Promise((resolve, reject) => {
            expreiencelist(msg).then(response => {
                console.log(response)
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
                console.log(res)
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

