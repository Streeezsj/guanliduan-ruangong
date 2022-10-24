import request from '@/utils/request'
export default{
  //經費管理列表页
  getMoneyList(limit,pageNum,data){
    return request({
      url:`/budget/findBudgets/${limit}/${pageNum}`,
      method: 'POST',
      data
    })
  },
  getMoneystatus(id,status,reasonsss){
    return request({
      url:`/budget/updateStatus/${id}/${status}`,
      method:'PUT',
      data:reasonsss,
    })
  }
}
