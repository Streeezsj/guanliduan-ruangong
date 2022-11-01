<template>
  <div>
     <!-- 搜索--------------------------------- -->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          icon="el-icon-search"
          style="float: right"
          @click="fetchData()"
          type="primary"
          size="small"
        >
          查询结果
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="搜索用户手机号码：">
            <el-input
              style="width: 230px margin-left"
              v-model="searchObj.phone"
              placeholder="用户手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="搜索用户名称：">
            <el-input
              style="width: 203px"
              v-model="searchObj.name"
              placeholder="用户名称"
            ></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
     <!-- 导出按钮 -->
    <a
          href="http://120.77.145.204:8021/admin/exportData"
          target="_blank"
        >
     <el-button type="text" @click="exportData"
            ><i class="fa fa-plus" /> 导出</el-button
          >
    </a>
     <!--导入按钮 -->
    <el-button type="text" @click="importData">
      <i class="fa fa-plus" />导入
    </el-button>
     <!-- 添加-------------------------------- -->
    <div align="right">
      <el-button type="success" @click="addUser" icon="el-icon-plus"
        >添加用户</el-button
      >

    </div>
      <!-- 批量删除 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
     <!-- --------------------------------------列表页 -->
    <el-table :data="list" border fit highlight-current-row @selection-change="handleSelectionChange">
       <el-table-column type="selection" width="55" />
      <el-table-column label="用户ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>

      <el-table-column label="用户名称"  width="100">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="用户头像" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.portrait" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column label="用户性别"  width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 1">男</span>
         <span v-if="scope.row.sex == 0">女</span>
        </template>
      </el-table-column>

       <el-table-column label="用户权限"  width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.authority }}
        </template>
      </el-table-column>


      <el-table-column label="电话"  width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>


      <el-table-column label="邮箱" align="center" width="170px">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column label="用户锁定状态" align="center">
        <template slot-scope="scope">
           <el-switch
            v-model="scope.row.status"
            @change="changeSwitch($event, scope.row, scope.$index)"
            active-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
          />
        </template>
      </el-table-column>

      <el-table-column label="用户创建时间"  align="center" width="170px">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>

       <el-table-column
        label="操作"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
           <!-- <el-button
            type="info"
            size="mini"
            icon="el-icon-view"
            @click="showDetail(scope.row)"
            >查看</el-button
          > -->
          <el-button
            type="primary"
            size="mini"
             icon="el-icon-edit"
            @click="editUser(scope.row.userId)"
          >
            编辑
          </el-button>

          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="delUser(scope.row.userId)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
         <!-- -------------------------------------- -->
          <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
            <el-upload
              :action="'http://120.77.145.204:8021/admin/batchSave'"
              :on-success="onUploadSuccess"
              :multiple="false"
              class="upload-demo"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible=false">取消</el-button>
      </div>
    </el-dialog>
    <!-- ----------------------------------分页 -->
    <div class="block" style="float: right; margin-top: 20px">
      <span class="demonstration">显示总数</span>
      <el-pagination
        background
        @current-change="fetchData"
        :current-page.sync="pageNum"
        :page-size="limit"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
var test=0;
import userlist from "@/api/usercontroller"
export default {
     //定义变量和初始值
  data() {
    return {
      list:[], //每页数据集合
      pageNum: 1,
      limit: 6, //每n个数据一页
      total: 1, //初始化
      searchObj:{},//条件封装对象
      //  dialogFormVisible: false, //对话框（查看）
      // imageUrl:'',//上传图片所要的属性
      // detail:{

      // }
       multipleSelection:[], //批量选择中选择的记录列表
      dialogImportVisible:false,//弹框

    };
  },
  //在页面渲染前执行
  //调用methods定义的方法，得到数据
  created() {
    this.fetchData();
  },
  methods:{
     //导出数据字典
    exportData(){
      window.location.href="http://120.77.145.204:8021/admin/exportData"
    },
    //导入数据字典
    importData(){
      this.dialogImportVisible = true
    },
    //上传成功调用
    onUploadSuccess(){
        this.dialogImportVisible = false
        this.fetchData(1);
        this.$message({
        	  message: '导入数据成功!',
        	  type: 'success'
          })
    },
    //修改商品上架下架状态
    changeSwitch(e, row, index) {
      let uid = row.userId;
      console.log(e, row, index);
      let type = row.status;
      userlist
        .userstatus(uid, type)
        .then((res) => {
          this.$message({
            type: "success",
            message: type==0?"用户打开状态成功!":"用户关闭状态成功!",
          });
          if(test=1)
          this.sortChange();
          else if(test =0)
          this.fetchData(uid ? this.pageNum : 1);
        })
        .catch(() => {
        });
    },
    //获取选择复选框的id值
    handleSelectionChange(selection){
        this.multipleSelection = selection;
    },
     //批量删除
    removeRows(){
         this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //遍历数组得到每个id值，设置到idList里面
          var idList = []
          for(var i =0;i< this.multipleSelection.length;i++){
            var obj =  this.multipleSelection[i];
            var id = obj.userId
            idList.push(id)
            console.log(id);
          }
          //调用接口
          userlist.batchRemoveUser(idList).then((resp) => {
            //提示
            console.log('qqqqqqq');
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新页面数据
            this.fetchData(1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",

          });
           console.log('aaaaaaa');
        });
    },
   //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
  dateFormat:function(time) {
    var date=new Date(time);
    var year=date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
},
 //添加文章
    addUser() {
      this.$router.push("/UserControll/adduser");
    },
    //编辑文章
    editUser(userId) {
      console.log('aaaaaaaaaa',userId);
      this.$router.push("/UserControll/edituser/" + userId);
    },
    //页面列表页渲染，请求接口调用
    fetchData(page = 1) {
      this.pageNum=page
      var vm=this;
      userlist.getUserList(this.limit, this.pageNum, this.searchObj)
     //请求成功调用
        .then((resp) => {
          console.log('tttttttttt',this.searchObj.phone);
          vm.list = resp.data.records;
          vm.total = resp.data.total;
        })
        .catch((error) => {});
    },
     // 删除方法------------------
    delUser(userId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用接口
          userlist.deluser(userId).then((resp) => {
            //提示
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新页面数据
            this.fetchData(1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

  }
}
</script>
