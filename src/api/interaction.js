import request from '@/utils/request'

//获取帖子列表
export function getallaction(data){
    return request({
       url:"/forum/pageQueryList",
       method:"post",
       data
    })
}
//删除帖子
export function deleteaction(data){
    return request({
       url:"/forum/deleteForumById",
       method:"post",
       data
    })
}
//批量删除帖子
export function deleteallaction(data){
    return request({
       url:"/forum/batchDelete",
       method:"post",
       data
    })
}