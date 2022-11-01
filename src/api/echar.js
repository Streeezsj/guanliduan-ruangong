import request from '@/utils/request'
export default{
  getscores(){
    return request({
      url:`/sta/findScores`,
      method:'GET'
    })
  },
  getstype(){
    return request({
      url:`/sta/findType`,
      method:'GET'
    })
  },
}
