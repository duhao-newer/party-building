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
//回显轮播图
export function findcarouselById(data){
    return request({
       url:"/carousel/selectByID",
       method:"post",
       data
    })
}
//新增轮播图
export function insertcarousel(data){
    return request({
       url:"/carousel/insertById",
       method:"post",
       data
    })
}
//编辑轮播图
export function updatecarousel(data){
    return request({
       url:"/carousel/updateById",
       method:"post",
       data
    })
}