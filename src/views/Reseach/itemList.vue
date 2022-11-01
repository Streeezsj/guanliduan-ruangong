<template>
  <div  class="app-container">
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
          <el-form-item label="搜索项目名称：">
            <el-input
              style="width: 230px margin-left"
              v-model="searchObj.itemName"
              placeholder="项目名称或者关键字"
            ></el-input>
          </el-form-item>
          <el-form-item label="搜索组织人名称：">
            <el-input
              style="width: 203px"
              v-model="searchObj.leaderName"
              placeholder="组织人名称"
            ></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <!-- --------------------------------- -->
    <!-- 导出按钮 -->
    <a
          href="http://120.77.145.204:8021/item/exportData"
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
       <el-button type="medium" @click="addhuman" icon="el-icon-plus"
        >新增科研项目人员</el-button
      >
      <el-button type="success" @click="addItem" icon="el-icon-plus"
        >新增科研项目</el-button
      >
    </div>
     <!-- 批量删除 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
     <!-- --------------------------------------列表页 -->
    <el-table :data="list" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="项目ID" width="70">
        <template slot-scope="scope">
          {{ scope.row.itemId }}
        </template>
      </el-table-column>

      <el-table-column label="项目名称"  width="90">
        <template slot-scope="scope">
          {{ scope.row.itemName }}
        </template>
      </el-table-column>

      <el-table-column label="组织人姓名"  width="100">
        <template slot-scope="scope">
          {{ scope.row.leaderName }}
        </template>
      </el-table-column>

      <el-table-column label="项目类型"  width="100">
        <template slot-scope="scope">
           <el-tag type="success">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column label="项目图片" width="130">
        <template slot-scope="{ row, $index }">
          <img :src="row.pictureUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="项目视频">
       <template slot-scope="scope">
            <div v-if="scope.row.videoUrl">
              <el-button
                type="success"
                plain
                 @click="playVideo(scope.row)"
                ref="btn"
                size="mini"
              >
                查看视频播放
              </el-button>
            </div>
            <div v-else>暂无视频</div>
          </template>
      </el-table-column> -->

      <el-table-column label="项目小组成员人数" align="center" width="100px">
        <template slot-scope="scope">
          {{ scope.row.memberNumber }}人
        </template>
      </el-table-column>

      <el-table-column label="项目小组成员名单" align="center" width="100px">
        <template slot-scope="scope">
          <el-button type="success" @click="searchnumber(scope.row.itemId)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column label="项目经费 " align="center" width="80px">
        <template slot-scope="scope">
          {{ scope.row.budget }}元
        </template>
      </el-table-column>

      <el-table-column label="项目状态" align="center">
        <template slot-scope="scope">
           <!-- <el-switch
            v-model="scope.row.status"
            @change="changeSwitch($event, scope.row, scope.$index)"
            active-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
          /> -->

              <span v-if="scope.row.status == 1"
              ><el-tag size="medium">已结项</el-tag></span
            >

              <span v-if="scope.row.status == 0"
              ><el-tag type="warning">未结项</el-tag></span
            >

        </template>
      </el-table-column>

      <el-table-column label="项目创建时间"  >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column label="项目预计结束时间"  >
        <template slot-scope="scope">
          {{ dateFormat(scope.row.endTime) }}
        </template>
      </el-table-column>

       <el-table-column
        label="操作"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
           <el-button
            type="info"
            size="mini"
            icon="el-icon-view"
            @click="showDetail(scope.row)"
            >查看</el-button
          >
          <el-button
            type="primary"
            size="mini"
             icon="el-icon-edit"
            @click="editItem(scope.row.itemId)"
          >
            编辑
          </el-button>

          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="delItem(scope.row.itemId)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
         <!-- -------------------------------------- -->
          <!-- -------------------------------------- -->
          <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
            <el-upload
              :action="'http://120.77.145.204:8021/item/batchSave'"
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
    <!-- --------------------------------------- -->
     <!-- ---------------------------------------查看对话框-->
    <el-dialog title="查看项目详细信息" :visible.sync="dialogFormVisible" >
      <el-form style="width: 80%" :model="detail" >
        <el-form-item label="项目名称" label-width="100px" >
          <el-input autocomplete="off" v-model="detail.itemName" disabled></el-input>
        </el-form-item>
        <el-form-item label="组织人姓名" label-width="100px">
          <el-input autocomplete="off" v-model="detail.leaderName" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目类型" label-width="100px">
          <el-input autocomplete="off" v-model="detail.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目简介" label-width="100px">
          <el-input autocomplete="off" v-model="detail.detail" disabled></el-input>
        </el-form-item>
         <!-- 上传图片 -->
      <el-form-item label="上传报告" label-width="100px">
        <!-- <el-input
          v-model="detail.fileUrl"
          style="width: 400px"
          placeholder="请输入内容"
          disabled
        /> -->
        <el-button type="warning" @click="upload">下载报告</el-button>
        <!-- <a
          href="http://120.77.145.204:8021/downloadFile/?fileUrl=+'this.detail.fileUrl'+"
          target="_blank"
        >
     <el-button type="text" @click="exportData"
            ><i class="fa fa-plus" /> 导出</el-button
          >
    </a> -->
      </el-form-item>

        <el-form-item label="发布时间" label-width="100px">
         <el-input v-model="detail.createTime" placeholder="选择日期时间" disabled></el-input>
        </el-form-item>

        <el-form-item label="更新时间" label-width="100px">
          <el-input v-model="detail.updateTime" placeholder="选择日期时间" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailitem"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- --------------------------------------- -->
     <!-- 弹框效果 -->
    <el-dialog
      :visible.sync="dialogVisible"
      style="text-align: center"

    >
      <el-form :model="details" :key="index">
        <el-form-item label="视频">
          <video v-if="videoUrl1" width="750" height="480" controls>
              <source :src="videoUrl1"/>
                您的浏览器不支持 HTML5 video 标签。
            </video>
        </el-form-item>
      </el-form>
    </el-dialog>

<el-dialog
  title="查看项目小组具体人员"
  :visible.sync="dialognum"
  width="width"
  :before-close="dialogBeforeClose">
   <el-form
              :model="item"
              v-for="(item, index) in listnum"
              :key="index"
            >
              <el-form-item label-width="100px">
                <el-input
                  :autoSize="true"
                  style="width: 400px"
                  v-model="
                    '成员名字:' +
                    item.name
                  "
                  type="textarea"
                  disabled
                ></el-input>
              </el-form-item>
            </el-form>
  <div slot="footer">
    <el-button @click="dialognum = false">取 消</el-button>
    <el-button type="primary" @click="dialognum = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
var test=0;
import searchitem from "@/api/searchitem"
export default {
    //定义变量和初始值
  data() {
    return {
      list:{}, //每页数据集合
      pageNum: 1,
      limit: 6, //每n个数据一页
      total: 1, //初始化
      searchObj:{},//条件封装对象
       dialogFormVisible: false, //对话框（查看）
      videoUrl1: "",
      detail:{

      },
      details:{

      },
      listnum:{},
      dialognum: false,
      dialogVisible: false,
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
    searchnumber(row){
      console.log(row);
      searchitem.searchnumber(row).then((res)=>{
        console.log('srsa');
        this.listnum = res.data
        console.log(this.listnum);
        this.dialognum = true;
      })
      .catch((error)=>{

      })
    },
    // playVideo(row) {
    //   this.dialogVisible = true;
    //   var vm = this;
    //   console.log("aaaaaaaaaaaa", row);
    //   this.details = { ...row };
    //   console.log(this.details.videoUrl);
    //   this.videoUrl1 = this.details.videoUrl;
    // },
    //导出数据字典
    exportData(){
      window.location.href="http://120.77.145.204:8021/item/exportData"
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
      let uid = row.itemId;
      console.log(e, row, index);
      let type = row.status;
      searchitem
        .itemstatus(uid, type)
        .then((res) => {
          this.$message({
            type: "success",
            message: type==0?"项目打开状态成功!":"商品关闭状态成功!",
          });
          if(test=1)
          this.sortChange();
          else if(test =0)
          this.fetchData(uid ? this.pageNum : 1);
        })
        .catch(() => {
        });
    },
    addhuman(){
      console.log('aaaaaaa');
        this.$router.push("/Reseach/addhuman");
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
            var id = obj.itemId
            idList.push(id)
            console.log(id);
          }
          //调用接口
          searchitem.batchRemoveItem(idList).then((resp) => {
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
    addItem() {
      this.$router.push("/Reseach/additem");
    },
    //下载报告
    upload(){
      console.log('aaaaaa');
      console.log(this.detail.createTime);
      console.log('qqq',this.detail.fileUrl);
      let a = "http://120.77.145.204:8021/downloadFile/?fileUrl="+this.detail.fileUrl
      console.log('ads',a);
       window.location.href=a
      //  console.log('qwesad',http://120.77.145.204:8021/downloadFile/?fileUrl='+this.detail.fileUrl+');
      // searchitem.uploadtext(this.detail.fileUrl).then((res)=>{
      //   console.log('aaaaaa');
      //     // window.location.href="http://120.77.145.204:8021/downloadFile/?fileUrl=+'this.detail.fileUrl'+"
      // })
      // .catch((error)=>{
      //   console.log('tttt');
      // })
    },
    //编辑文章
    editItem(itemId) {
      console.log('aaaaaaaaaa',itemId);
      this.$router.push("/Reseach/edititem/" + itemId);
    },
    //页面列表页渲染，请求接口调用
    fetchData(page = 1) {
      this.pageNum=page
      var vm=this;
      searchitem.getSearchList(this.limit, this.pageNum, this.searchObj)
     //请求成功调用
        .then((resp) => {
          vm.list = resp.data.records;
          vm.total = resp.data.total;
        })
        .catch((error) => {});
    },
     // 删除方法------------------
    delItem(itemId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用接口
          searchitem.delitem(itemId).then((resp) => {
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

     //查看项目
    showDetail(row) {
      this.dialogFormVisible = true;
      console.log('aaaaaaaaaaaa',row);
       this.detail = { ...row };
       console.log(this.detail.createTime);
         this.$message({
            type: "success",
            message: "查看项目成功",
          });
    },

     detailitem(){
        console.log('qqqqqqqqq');
         this.dialogFormVisible = false;
        },

    // -------------------------------------------------
  }
}
</script>
