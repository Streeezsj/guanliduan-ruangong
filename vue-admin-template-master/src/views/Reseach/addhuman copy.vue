<template>
  <div class="box" shadow="never">
    <el-form :model="item" label-width="130px" >
      <el-form-item></el-form-item>
      <el-form-item label="项目Id：" >
        <el-input
          v-model="item.itemId"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="选择项目人员：" label-width="130px" >
        <el-cascader :options="options" :props="props" clearable></el-cascader>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item></el-form-item>
      <el-form-item></el-form-item>
       <div align="center" >
        <el-form-item>
        <el-button type="success" @click="onSubmit">添加</el-button>
      </el-form-item>
       </div>
    </el-form>

  </div>
</template>

<script>
import addsearchitem from "@/api/searchitem";
export default {
  data(){
    return{
      props: { multiple: true },
      item:{

      },
      options: [
        {
          value: 1,
          label: "会同书院",
          children: [
            {
              value: 2,
              label: "小刚",
            },
            {
              value: 3,
              label: "小蓝",
            },
          ],
        },
        {
          value: 4,
          label: "信息技术学院",
          children: [
            {
              value: 5,
              label: "小黄",
            },
            {
              value: 6,
              label: "小红",
            },
          ],
        },
        {
          value: 7,
          label: "人工智能学院",
          children: [
            {
              value: 8,
              label: "小蓝3",
            },
          ],
        },
        {
          value: 9,
          label: "学前教育学院",
          children: [
            {
              value: 10,
              label: "小黑3",
            },
            {
              value: 11,
              label: "小蓝3",
            },
          ],
        },
      ],
      selects:["小红","小刚"]
    }
  },
  methods:{
     onSubmit() {
      //获取from结点，验证字段
      console.log('aaaa',this.options);
      console.log('qqqqq',this.selects);
          console.log("aaa",this.options[0].children[0].label);
          console.log('tttttttttt',this.item.itemId);
          var vm = this;
          addsearchitem
            .addhumanlist(this.item.itemId,this.selects)
            .then(function (resp) {

              // vm.item = resp.data
              // console.log('aaaaaa',this.item.itemId);
              vm.$message({
                message: "添加成功!",
                type: "success",
              });
              vm.$router.go(-1);
            })
            .catch(function (error) {
              vm.$message.error("添加失败");
            });
        }
    },

}
</script>

<style lang="scss" scoped>
  .box {
  margin-left: 200px;
  height: 400px;
  width: 700px;
  border: solid rgb(187, 186, 187);
}
</style>
