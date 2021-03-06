import { customerlist, seletecustomerByname, resetpassword, openOrClose, detailInfo, resetAll, uploadExcel } from '@/api/customer'
const getDefaultState = () => {
    return {}
}
const state = getDefaultState()
const mutations = {}
const actions = {
    // 获取党员列表
    customers({ commit }, msg) {
        return new Promise((resolve, reject) => {
            customerlist(msg).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 根据名字进行搜索
    seletecustomerBynames({ commit }, msg) {
        return new Promise((resolve, reject) => {
            seletecustomerByname(msg).then(res => {
                resolve(res);
            }).catch(rea => {
                reject(rea);
            })
        })
    },
    // 重置密码
    resetpwd({ commit }, msg) {
        return new Promise((resolve, reject) => {
            resetpassword(msg).then(res => {
                resolve(res);
            }).catch(rea => {
                reject(rea);
            })
        })
    },
    // 启用或禁用用户
    openAndclose({ commit }, msg) {
        return new Promise((resolve, reject) => {
            openOrClose(msg).then(res => {
                resolve(res);
            }).catch(rea => {
                reject(rea);
            })
        })
    },
    // 获取用户详细信息
    detcustomer({ commit }, msg) {
        return new Promise((resolve, reject) => {
            detailInfo(msg).then(res => {
                resolve(res);
            }).catch(rea => {
                reject(rea);
            })
        })
    },
    //批量重置密码
    resetAllpwd({ commit }, msg) {
        return new Promise((resolve, reject) => {
            resetAll(msg).then(res => {
                resolve(res);
            }).catch(rea => {
                reject(rea);
            })
        })
    },
    //批量重置密码
    uploadExcels({ commit }, msg) {
        return new Promise((resolve, reject) => {
            uploadExcel(msg).then(res => {
                resolve(res);
            }).catch(rea => {
                reject(rea);
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

