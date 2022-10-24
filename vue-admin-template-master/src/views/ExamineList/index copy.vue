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
              v-model="searchObj.approveId"
              placeholder="序号"
            ></el-input>
          </el-form-item>
          <el-form-item label="搜索项目：">
            <el-input
              style="width: 230px margin-left"
              v-model="searchObj.itemName"
              placeholder="项目名称或者关键字"
            ></el-input>
          </el-form-item>
          <el-form-item label="搜索审核人：">
            <el-input
              style="width: 203px"
              v-model="searchObj.chekcer"
              placeholder="审核人姓名"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="审批序号" width="100">
        <template slot-scope="scope">
          {{ scope.row.approveId }}
        </template>
      </el-table-column>

      <el-table-column label="项目名称" width="100">
        <template slot-scope="scope">
          {{ scope.row.itemName }}
        </template>
      </el-table-column>

      <el-table-column label="审批人">
        <template slot-scope="scope">
          {{ scope.row.chekcer }}
        </template>
      </el-table-column>

      <el-table-column label="审批项目类型">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>

      <el-table-column label="审批时间">
        <template slot-scope="scope">
          {{ scope.row.approveTime }}
        </template>
      </el-table-column>

      <el-table-column label="审批是否通过" align="center" width="120px">
        <template slot-scope="scope">
          <!-- {{ scope.row.status }} -->
          <span v-if="scope.row.status == 0">
            <el-button
              type="success"
              size="mini"
              @click="changeSwitch($event, scope.row, scope.$index)"
              >√</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="changeflase(scope.row)"
              >×</el-button
            >
            <el-dialog
            title="不通过原因"
            :visible.sync="dialogapprove"
            width="50%"
            :before-close="handleClose"
          >
          <el-form style="width: 80%">
        <el-form-item label="" label-width="100px">
          <!-- <el-input autocomplete="off" v-model="item.reason"  placeholder="请输入内容"></el-input> -->
          <el-input
          :autoSize="true"
          style="width: 400px"
          v-model="item.reason"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>

        </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogapprove = flase">取 消</el-button>
              <el-button type="primary" @click="dialogapprove = flase"
                >确 定</el-button
              >
            </div>
          </el-dialog>
            </span
          >
          <span v-if="scope.row.status == 1">
            <el-tag type="success">√</el-tag></span
          >
          <span v-if="scope.row.status == 2"
            ><el-tag type="danger">×</el-tag></span
          >
        </template>
      </el-table-column>

      <el-table-column label="查看审核意见">
        <template slot-scope="scope">
          {{ scope.row.reason }}
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
import examinelist from "@/api/examineitem";
import { status } from 'nprogress';
export default {
  //定义变量和初始值
  data() {
    return {
      list: {}, //每页数据集合
      pageNum: 1,
      limit: 3, //每n个数据一页
      total: 1, //初始化
      searchObj: {}, //条件封装对象
      dialogapprove:false,
      item:{}
    };
  },
  //在页面渲染前执行
  //调用methods定义的方法，得到数据
  created() {
    this.fetchData();
  },
  methods: {
    //页面列表页渲染，请求接口调用
    fetchData(page = 1) {
      this.pageNum = page;
      var vm = this;
      examinelist
        .getExamineList(this.limit, this.pageNum, this.searchObj)
        //请求成功调用
        .then((resp) => {
          console.log('tttt',this.searchObj);
          vm.list = resp.data.records;
          vm.total = resp.data.total;
          console.log("adasdsad", resp.data.records);
        })
        .catch((error) => {
          console.log("1321321");
        });
    },
    changeSwitch(e, row, index) {
      let uid = row.approveId;
      console.log("qqqqqqqqq", e, row, index);
      let type = row.status;
      console.log("aaaaaaaaaaa", type);
      this.$confirm("是否同意审批", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          //调用接口
          if (type === 0) {
            type = 1;
          }
          examinelist.getExaminestatus(uid, type, this.item).then((resp) => {
            //提示
            this.$message({
              type: "success",
              message: "审批通过!",
            });
            //刷新页面数据
            this.fetchData(1);
          });
          // this.fetchData(1);
        })
        .catch(() => {});
    },
    changeflase(row) {
      let uid = row.approveId;
      // console.log("qqqqqqqqq", e, row, index);
      let type = row.status;
      console.log("aaaaaaaaaaa", type);
       var vm = this;
       vm.dialogapprove = true;

          //调用接口
          if (type === 0) {
            type = 2;
          }
          this.item.reason ="asdasd"
          examinelist.getExaminestatus(uid, type, this.item).then((resp) => {
            //提示
            console.log('qqq',uid);
            console.log('qqqqqaa',this.item.reason);
            this.$message({
              type: "danger",
              message: "审批不通过!",
            });
            console.log('qqqqq',type);
            //刷新页面数据
            this.fetchData(1);
          })
          // this.fetchData(1);

        .catch(() => {
          console.log('zsjzsj');
        });
    },
  },
};
</script>
