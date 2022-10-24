import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export default{
  //审批列表页
  getExamineList(limit,pageNum,searchObj){
    return request({
      url:`/approve/findApproves/${limit}/${pageNum}`,
      method: 'POST',
      data:searchObj,
      headers: {
              'token':getToken()
            }
    })
  },
  getExaminestatus(approveId,status,reasonsss){

    return request({
      url:`/approve/updateStatus/${approveId}/${status}`,
      method:'PUT',
      data:reasonsss,
      headers: {
              'token':getToken()
            }
    })

  },
  setExaminestatus(approveId,status){
    return request({
      url:`/approve/updateStatus/${approveId}/${status}?context=`,
      method:'PUT',
      headers: {
              'token':getToken()
            }
    })
  },
  detailExamine(approveId){
    return request({
      url:`/approve/detail/${approveId}`,
      method:'GET'
    })
  }
}
