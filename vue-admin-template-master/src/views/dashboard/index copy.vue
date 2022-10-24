<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card style="height: 400px; width: 500px; margin-top: 20px">
        <div style="height: 300px" ref="test3"></div>
      </el-card>
      </el-col>
      <el-col :span="8" style="margin-top: 20px">
      <el-card style="height: 400px; width: 500px; margin-top: 20px">
        <div style="height: 280px" ref="test2"></div>
      </el-card>
      </el-col>
      <el-col :span="8" style="margin-top: 20px">
      <el-card style="height: 400px; width: 500px; margin-top: 20px">
        <div style="height: 280px" ref="test4"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { getDataList } from "../../api/data.js";
import { FindType } from "../../api/data.js";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      tableData: [],
      tableList: [],
      typeList: [],
    };
  },
  mounted() {
    //接口1
    getDataList().then((res) => {
      console.log('aaaaaaaa',res.data);
      const { code, data } = res.data;
      if (code === 200) {
        this.tableList = data;
        // const datax = data.scoreData + data.numberData;
        // console.log(datax,'datax')
        // const datax = data;
        // const xDatax = datax;

        //柱形图
        const testOpton2 = {
          title: {
            text: "统计不同分类数量",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: data.scoreData,
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: data.scoreData,
              type: "bar",
              barWidth: "60%",
              data: data.numberData,
            },
          ],
        };
        const A = echarts.init(this.$refs.test2);
        A.setOption(testOpton2);

      }
    }),
      //接口2
      FindType().then((res) => {
        const { code, data } = res.data;
        if (code === 200) {
          this.typeList = data;
          //条形图
          const testOption3 = {
            title: {
              text: "各个学院的项目数",
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            legend: {},
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: {
              type: "value",
              boundaryGap: [0, 0.01],
            },
            yAxis: {
              type: "category",
              //y轴数据
              data: data.typeData
            },
            series: [
              {
                name: "项目数量",
                type: "bar",
                data: data.numberData,
              },
              // {
              //   name:"未完成项目数量",
              //   type:"bar",
              //   data: data.numberData

              // }
            ],
          };
          const B = echarts.init(this.$refs.test3);
          B.setOption(testOption3);

        }
        console.log(this.typeList);
      });

      //接口3
  },
};
</script>
<style lang="scss" scoped>
.graph {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}

.num1 {
  width: 1300px;
  display: flex;
}

.user {
  display: flex;
  width: 300px;

  img {
    padding-right: 50px;
  }
}

.login-info {
  span {
    padding-left: 120px;
  }
}
</style>
