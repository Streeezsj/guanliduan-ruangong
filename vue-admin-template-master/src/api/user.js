import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/landByPwd',
    method: 'POST',
    data,
    headers:{
      'data':data.token
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function loginphone(mobile,code){
  return request({
    url:`/admin/landByPhone/${mobile}/${code}`,
    method:'GET'
  })
}
