import { getallcarousel,deleteallcarousel,deletecarousel} from '@/api/Rotationchart'

const getDefaultState = () => { return {} }
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取轮播图列表
    carousellist({ commit }, msg) {
        return new Promise((resolve, reject) => {
            getallcarousel(msg).then(response => {
                console.log(response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 批量删除轮播图
    delcarousels({ commit }, msg) {
        return new Promise((resolve, reject) => {
            deleteallcarousel(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //删除轮播图
    delcarousel({ commit }, msg) {
        return new Promise((resolve, reject) => {
            deletecarousel(msg).then(response => {
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

