import request from '@/utils/request'
//获取新闻列表
export function newspaperlist(data) {
    return request({
        url: '/news/getAllNews',
        method: 'post',
        data
    })
}
//获取新闻类型
export function newtype(data) {
    return request({
        url: '/news/getAllNewsTypes',
        method: 'get',
    })
}
//新增新闻
export function addnews(data) {
    return request({
        url: "/news/insertNews",
        method: "post",
        contentType: "multipart/form-data",
        processData: false, //告诉jquery不要对form进行处理
        contentType: false, //指定为false才能形成正确的Content-Type
        data
    })
}
//删除新闻
export function delnews(data) {
    return request({
        url: '/news/deleteNewsById',
        method: 'post',
        data
    })
}
//回显数据
export function getnewsById(data) {
    return request({
        url: '/news/getNewsById',
        method: 'post',
        data
    })
}
//编辑数据
export function updateNewsById(data) {
    return request({
        url: '/news/updateNewsById',
        method: 'post',
        contentType: "multipart/form-data",
        processData: false, //告诉jquery不要对form进行处理
        contentType: false, //指定为false才能形成正确的Content-Type
        data
    })
}