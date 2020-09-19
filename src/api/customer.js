import request from '@/utils/request'
 //获取党员列表
export function customerlist(data) {
  return request({
    url: '/user/getAllUserInfo',
    method: 'post',
    data
  })
}
 //根据名字进行搜索
export function seletecustomerByname(data){
   return request({
     url:'/user/getUserByName',
     method:'post',
     data
   })
}
 //密码重置
export function resetpassword(data){
    return request({
      url:'/user/resetPWD',
      method:'post',
      data
    })
}
 //用户启用或者禁用
export function openOrClose(data){
  return request({
    url:'/user/operationState',
    method:'post',
    data
  })
}
 //获取用户详细信息
 export function detailInfo(data){
  return request({
    url:'/user/getUserInfo',
    method:'post',
    data
  })
}
 //批量重置密码
 export function resetAll(data){
  return request({
    url:'/user/batchReset',
    method:'post',
    data
  })
}
 //导入党员用户
 export function uploadExcel(data){
  return request({
    url:'/user/uploadExcel',
    method:'post',
    contentType: "multipart/form-data",
    processData: false, //告诉jquery不要对form进行处理
		contentType: false, //指定为false才能形成正确的Content-Type
    data
  })
}




