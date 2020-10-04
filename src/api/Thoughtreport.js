import request from '@/utils/request'
//获取思想汇报列表
export function reportlist(data) {
    return request({
        url: '/report/pageQuery',
        method: 'post',
        data
    })
}
//批量审核
export function checkAll(data) {
    return request({
        url: '/report/batchAccept',
        method: 'post',
        data
    })
}
//查看详情
export function selectById(data) {
    return request({
        url: '/report/selectById',
        method: 'post',
        data
    })
}
//审核
export function updateAcceptById(data) {
    return request({
        url: '/report/updateAccept',
        method: 'post',
        data
    })
}