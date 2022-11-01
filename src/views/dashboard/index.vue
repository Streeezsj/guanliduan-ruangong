<template>
    <div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    <div class="big_box">
		<div class="left_box"><ve-histogram :data="chartData" ref="charthistogram"></ve-histogram></div>
		<div class="right_box"> <ve-pie :data="chartDataPie" :settings="chartSettings" ref="chartpie"></ve-pie></div>
	</div>

  </div>
</template>
<script>
import vcharsss from '@/api/echar'
export default {
  data () {
    this.chartSettings = {series: {
        // smooth: false,  // 将曲线变为直线
        // type: 'line'
      },
      color:['#E4004F','#64C9FA']}
    return {
      chartData: {
        columns: [],
        rows: [

        ]
      },
      chartDataPie: {
        columns: [],
        rows: []
      }
    }
  },
  created() {
    this.getChartData()
    this.getChartDataPie()
  },
  methods:{
    getChartData() {
      console.log('ttttt');
      console.log(this.chartData.columns);

      vcharsss.getscores().then((res)=>{
        var vm =this;
        console.log('qqqqqqqq');
        this.chartData.columns = res.data.scoreData;
        this.chartData.rows = res.data.numberData
        console.log('sdsdas',vm.chartData.columns);
        console.log('sdsdas',vm.chartData.rows);
      })
    },
     getChartDataPie() {
      vcharsss.getstype().then((res)=>{
        var vm =this;
        console.log('tt');
        vm.chartDataPie.columns = res.data.numberData;
        vm.chartDataPie.rows = res.data.typeData;
        console.log('zsj',vm.chartDataPie.columns);
        console.log('nbnb',res.data);
      })
    }
  }
}
</script>

<style scoped>
.big_box{width: 1000px;height: 400px;display: flex;margin: 0 auto;justify-content:space-between}/* 设置大盒子的布局为flex布局 */
.left_box{width: 450px;height: 400px;}
.right_box{width: 450px;height: 400px;}

</style>
