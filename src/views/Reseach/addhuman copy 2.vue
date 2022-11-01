<template>
  <div class="box" shadow="never">
    <el-form :model="list" label-width="130px">
      <el-form-item></el-form-item>

      <el-form-item label="项目Id：">
        <el-input
          v-model="list.itemId"
          style="width: 130px"
          placeholder="请输入项目ID"
        />
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="请选择学院：">
            <el-select
              v-model="list.college"
              placeholder="请选择学院"
              @change="handler1"
            >
              <el-option
                v-for="item in options"
                :key="item.college"
                :label="item.college"
                :value="item.college"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请选择学院对应的老师：" label-width="180px">
            <el-select
              multiple
              placeholder="请选择学院对应的老师"
              v-model="list.name"
              @change="handler2"
            >
              <el-option
                v-for="item in options2"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="已选老师">
        <el-input v-model="list.name" style="width: 400px"></el-input>
      </el-form-item>

      <div align="center">
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
  data() {
    return {
      // props: { multiple: true },
      //收集不同的一级二级
      list: {
        college: "",
        name: "",
      },
      options: [],
      options2: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      addsearchitem
        .getcollage()
        .then((res) => {
          this.options = res.data;
          console.log(this.options);
        })
        .catch((error) => {});
    },
    handler1() {
      console.log("aaaaaa");
      // const {college} = this.list;
      addsearchitem
        .getallcollagename(this.list.college)
        .then((res) => {
          this.options2 = res.data;
          console.log("zsj", res.data);
          console.log("asdasd", this.list.college);
          console.log("ttttttt", res.data);
        })
        .catch((error) => {});
    },
    handler2(e) {
      console.log("md", e);
    },
     onSubmit() {
          var vm = this;
          addsearchitem
            .addhumanlist(this.list.itemId,this.list.name)
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
};
</script>

<style lang="scss" scoped>
.box {
  margin-left: 200px;
  height: 400px;
  width: 900px;
  border: solid rgb(187, 186, 187);
}
</style>
