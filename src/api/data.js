import request from '@/utils/request'
export const getDataList=()=>{
    return request({
      url:'http://120.77.145.204:8021/sta/findScores',
      method:'get'
    })
  }

  export const FindType=()=>{
    return  request({
      url:'http://120.77.145.204:8021/sta/findType',
      method:'get'
    })
  }
