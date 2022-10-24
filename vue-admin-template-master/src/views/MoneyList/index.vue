<template>
  <div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="经费ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.budgetId }}
        </template>
      </el-table-column>

      <el-table-column label="项目名称" width="100">
        <template slot-scope="scope">
          {{ scope.row.budgetName }}
        </template>
      </el-table-column>

      <el-table-column label="所需经费购买东西">
        <template slot-scope="scope">
          {{ scope.row.budgetGood }}
        </template>
      </el-table-column>

      <el-table-column label="购买数量" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.budgetNum }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="购买单价" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.budgetPrice }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="所需经费总额" align="center">
        <template slot-scope="scope">
          <el-tag type="warning">{{ scope.row.budgetAllprice }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="经费申请原因" align="center">
        <template slot-scope="scope">
          {{ scope.row.budgetReason }}
        </template>
      </el-table-column>

      <el-table-column label="申请经费时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.budgetTime }}
        </template>
      </el-table-column>

      <el-table-column label="是否同意申请" align="center">
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
              @click="changeflases($event, scope.row, scope.$index)"
              >×</el-button
            >
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
import moneylist from "@/api/moneyitem";
export default {
  //定义变量和初始值
  data() {
    return {
      list: {}, //每页数据集合
      pageNum: 1,
      limit: 5, //每n个数据一页
      total: 1, //初始化
      item:{},
      searchOBJ:{}
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
      moneylist
        .getMoneyList(this.limit, this.pageNum, this.searchOBJ)
        //请求成功调用
        .then((resp) => {
          vm.list = resp.data.records;
          vm.total = resp.data.total;
          console.log("adasdsad", resp.data.records);
        })
        .catch((error) => {
          console.log("1321321");
        });
    },

    changeSwitch(e, row, index) {
      let uid = row.budgetId;
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
          moneylist.getMoneystatus(uid, type,this.item).then((resp) => {
            //提示
            console.log('aaaaa',uid,type);
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
    changeflases(e, row, index) {
      let uid = row.budgetId;
      console.log("qqqqqqqqq", e, row, index);
      let type = row.status;
      console.log("aaaaaaaaaaa", type);
      this.$confirm("不同意审批", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          //调用接口
          if (type === 0) {
            type = 2;
          }
          moneylist.getMoneystatus(uid, type,this.item).then((resp) => {
            //提示
            console.log('aaaaa',uid,type);
            this.$message({
              type: "info",
              message: "审批不通过!",
            });
            //刷新页面数据
            this.fetchData(1);
          });
          // this.fetchData(1);
        })
        .catch(() => {});
    },

  },
};
</script>

