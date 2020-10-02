import request from '@/utils/request'

//获取轮播图列表
export function getallcarousel(data){
    return request({
       url:"/carousel/pageQuery",
       method:"post",
       data
    })
}
//批量删除轮播图
export function deleteallcarousel(data){
    return request({
       url:"/carousel/batchDelete",
       method:"post",
       data
    })
}
//删除轮播图
export function deletecarousel(data){
    return request({
       url:"/carousel/deleteByID",
       method:"post",
       data
    })
}