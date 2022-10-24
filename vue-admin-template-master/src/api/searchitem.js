import request from '@/utils/request'
export default{
  //科研项目列表页
  getSearchList(limit,pageNum,searchObj){
    return request({
      url:`/item/findItems/${limit}/${pageNum}`,
      method: 'POST',
      data:searchObj,
    })
  },
  //项目删除设置
  delitem(itemId){
    return request({
      method: 'DELETE',
		  url:`/item/deleteItem/${itemId}`,
    })
  },
  //项目添加提交submit设置
  aditem(item){
    return request({
      method: 'POST',
      url:`/item/saveItem`,
      data:item
    })
  },
   //项目修改提交submit设置
   upsubmititem(list){
    return request({
      method: 'PUT',
      url:'/item/updateItem',
      data:list
    })
  },
   //项目修改设置
   updateitem(id){
    return request({
        method: 'GET',
        url:`/item/findItem/${id}`
    })
  },

  //项目详情
  reqdetailItem(detail){
    if(detail.itemId){
      return request({url:'/item/updateItem',method:'PUT',data:detail});
      }
    },

    //项目状态
    itemstatus(itemId,status){
      return request({
        url:`/item/updateStatus/${itemId}/${status}`,
        method:'PUT',
      })
    },
    //项目批量删除
    batchRemoveItem(idList){
      return request({
        url:`/item/batchDelete`,
        method:'DELETE',
        data:idList
      })
    },
    getprogress(id){
      return request({
        url:`/progress/getPro/${id}`,
        method:'GET'
      })
    },
    getprogresslist(limit,pageNum,searchObj){
      return request({
        url:`/progress/getPros/${limit}/${pageNum}`,
        method:'POST',
        data:searchObj,
      })
    },
    //项目id添加人员

    addhumanlist(id,searchObj){
      return request({
        url:`/item/addMembers/${id}`,
        method:'POST',
        data:searchObj
      })
    },
    //下载报告
    uploadtext(fileurl){
      return request({
        url:`/downloadFile/?fileUrl=${fileurl}`,
        method:'POST'
      })
    },
    //项目查看人员
    searchnumber(id){
      return request({
        url:`/admin/findById/${id}`,
        method:'GET'
      })
    },
    //查询所有学院和老师
    getallcollage(){
      return request({
        url:`/admin/getCollege`,
        method:'GET'
      })
    },
    //查询学院
    getcollage(){
      return request({
        url:`/admin/College`,
        method:'GET'
      })
    },
    //查询学院下的学生
    getallcollagename(name){
      return request({
        url:`/admin/getAllUser/${name}`,
        method:'GET'
      })
    },
}
