import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'get',
    params:data
  })
}
export function updatepwd(data) {
  return request({
    url: '/admin/changePassword',
    method: 'post',
    data
  })
}
