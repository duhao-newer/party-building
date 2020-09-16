import request from '@/utils/request'
export function customerlist(data) {
  return request({
    url: '/user/getAllUserInfo',
    method: 'post',
    data
  })
}
