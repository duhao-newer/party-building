import request from '@/utils/request'

//获取帖子列表
export function getallaction(data){
    return request({
       url:"/forum/pageQueryList",
       method:"post",
       data
    })
}