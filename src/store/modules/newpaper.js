import { newspaperlist,carousel,clearphone, newtype, addnews, delnews,getnewsById,updateNewsById } from '@/api/newpaper'

const getDefaultState = () => { return {} }
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取新闻列表
    paperlist({ commit }, msg) {
        return new Promise((resolve, reject) => {
            newspaperlist(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //获取新闻类型
    newstype({ commit }) {
        return new Promise((resolve, reject) => {
            newtype().then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //新增新闻
    addnewspaper({ commit }, msg) {
        return new Promise((resolve, reject) => {
            addnews(msg).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //删除新闻
    delnewspaper({ commit }, msg) {
        return new Promise((resolve, reject) => {
            delnews(msg).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //回显新闻
     getnewspaperById({ commit }, msg) {
        return new Promise((resolve, reject) => {
            getnewsById(msg).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //编辑新闻
     updatenewspaperById({ commit }, msg) {
        return new Promise((resolve, reject) => {
            updateNewsById(msg).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //生成轮播图
    Docarousel({ commit }, msg) {
        return new Promise((resolve, reject) => {
            carousel(msg).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
     //清理数据库图片
     clearphones({ commit }, msg) {
        return new Promise((resolve, reject) => {
            clearphone(msg).then(res => {
                console.log(res);
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

