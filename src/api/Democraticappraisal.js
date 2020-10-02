import request from '@/utils/request'

//获取评议列表
export function getallcomment(data){
    return request({
       url:"/comment/pageQuery",
       method:"post",
       data
    })
}
//更新评议
export function updatecomment(data){
    return request({
       url:"/comment/updateStatus",
       method:"post",
       data
    })
}
//新增评议
export function addcomment(data){
    return request({
       url:"/comment/inserCommen",
       method:"post",
       data
    })
}
//查看评议
export function findcommentById(data){
    return request({
       url:"/comment/selectById",
       method:"post",
       data
    })
}
//修改评议
export function updatecommentById(data){
    return request({
       url:"/comment/updateById",
       method:"post",
       data
    })
}
