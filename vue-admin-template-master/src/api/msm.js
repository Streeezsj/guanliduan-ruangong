import request from '@/utils/request'
export default{
  sendCode(mobile){
    return request({
      url:`/admin/sendMessage/${mobile}`,
      method:'GET'
    })
  },

}
