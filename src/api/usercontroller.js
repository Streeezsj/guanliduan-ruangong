import request from '@/utils/request'
export default{
  //用户管理列表页
  getUserList(limit,pageNum,searchObj){
    return request({
      url:`/admin/findUsers/${limit}/${pageNum}`,
      method: 'POST',
      data:searchObj,
    })
  },
  //用户删除设置
  deluser(id){
    return request({
      method: 'DELETE',
		  url:`/admin/deleteUser/${id}`,
    })
  },
  //用户添加提交submit设置
  aduser(user){
    return request({
      method: 'POST',
      url:'/admin/addUser',
      data:user
    })
  },
   //用户修改提交submit设置
   upsubmituser(list){
    return request({
      method: 'PUT',
      url:'/admin/updateUser',
      data:list
    })
  },
   //用户修改设置
   updateuser(id){
    return request({
        method: 'GET',
        url:`/admin/findUser/${id}`
    })
  },
      //用户状态
      userstatus(userId,status){
        return request({
          url:`/admin/updateStatus/${userId}/${status}`,
          method:'PUT',
        })
      },
      //用户批量删除
      batchRemoveUser(idList){
        return request({
          url:`/admin/batchDelete`,
          method:'DELETE',
          data:idList
        })
      },
      collagelist(){
        return request({
          url:`/admin/getCollege`,
          method:'GET'
        })
      },
      searchcollagenum(college){
          return request({
            url:`/admin/getByCollege/${college}`,
            method:'GET'
          })
      }
}
