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
          <el-form-item label="搜索项目id：">
            <el-input
              style="width: 230px margin-left"
              v-model="searchObj.itemId"
              placeholder="项目id"
            ></el-input>
          </el-form-item>
          <el-form-item label="搜索项目名称：">
            <el-input
              style="width: 203px"
              v-model="searchObj.itemName"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-table :data="list" border fit highlight-current-row>

      <el-table-column label="项目ID" width="70">
        <template slot-scope="scope">
          {{ scope.row.itemId }}
        </template>
      </el-table-column>

      <el-table-column label="项目名称"  >
        <template slot-scope="scope">
          {{ scope.row.itemName }}
        </template>
      </el-table-column>

      <el-table-column label="已检测次数"  width="140">
        <template slot-scope="scope">
           <el-tag size="medium">{{ scope.row.passNumber }}</el-tag>
        </template>
      </el-table-column>

       <el-table-column label="整个项目需检测次数" width="160" >
        <template slot-scope="scope">
          <el-tag type="warning">{{ scope.row.totalNumber }}</el-tag>
        </template>
      </el-table-column>

       <el-table-column label="项目截至时间">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.endTime) }}
        </template>
      </el-table-column>

       <el-table-column
        label="查看"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            @click.native="courseprogress(scope.row.itemId)"
            >项目进度</el-button
          >
          <el-dialog
            title="项目进度"
            :visible.sync="dialogcourse"
            width="50%"
            :before-close="handleClose"
          >
          <el-form style="width: 80%"  >
              <el-form-item label="项目id:" label-width="100px">
                <el-input
                  v-model="itemprogress.itemId"
                  style="width: 400px"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目完成进度:" label-width="100px">
                <p></p>
                <el-progress
                  :percentage="parseInt((itemprogress.passNumber / itemprogress.totalNumber) * 100)"
                  :color="customColors"
                ></el-progress>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogcourse = flase">取 消</el-button>
              <el-button type="primary" @click="dialogcourse = flase"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </template>
      </el-table-column>

    </el-table>
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
      itemprogress:{},
      dialogcourse: false,
      customColor: "#409eff",
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    }
  },
   //调用methods定义的方法，得到数据
  created() {
    this.fetchData();
  },
  methods:{
     courseprogress(itemId) {
      console.log('ssdsda',itemId);
      var vm = this;
      searchitem.getprogress(itemId).then(function (resp) {
        vm.itemprogress = resp.data;
        console.log("21564646456", vm.itemprogress);
      });
      this.dialogcourse = true;
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
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
     //页面列表页渲染，请求接口调用
    fetchData(page = 1) {
      this.pageNum=page
      var vm=this;
      searchitem.getprogresslist(this.limit, this.pageNum, this.searchObj)
     //请求成功调用
        .then((resp) => {
          vm.list = resp.data.records;
          vm.total = resp.data.total;
        })
        .catch((error) => {});
    },
  }
}
</script>

