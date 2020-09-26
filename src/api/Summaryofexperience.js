import request from '@/utils/request'
//获取新闻列表
export function expreiencelist(data) {
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