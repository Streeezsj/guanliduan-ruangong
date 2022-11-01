<template>
  <div class="box" shadow="never">
    <el-form :model="item" label-width="180px" :rules="rules" ref="ruleForm">
      <el-form-item></el-form-item>

      <el-form-item label="项目名称：" prop="itemName">
        <el-input
          v-model="item.itemName"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>

      <el-form-item label="项目组织人：" prop="leaderName">
        <el-input
          v-model="item.leaderName"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>

      <el-form-item label="项目类型：" prop="type">
        <el-select v-model="item.type" placeholder="请选择项目类型">
          <el-option label="心理学类" value="心理学类"></el-option>
          <el-option label="化学类" value="化学类"></el-option>
          <el-option label="生物类" value="生物类"></el-option>
          <el-option label="物理类" value="物理类"></el-option>
          <el-option label="数学类" value="数学类"></el-option>
          <el-option label="信息工程类" value="信息工程类"></el-option>
          <el-option label="文学类" value="文学类"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目简介：" prop="detail">
        <el-input
          :autoSize="true"
          style="width: 400px"
          v-model="item.detail"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>

      <el-form-item label="项目小组成员人数：" prop="memberNumber">
        <el-input
          v-model.number="item.memberNumber"
          style="width: 200px"
          placeholder="请输入内容"
        />
      </el-form-item>

      <el-form-item label="选择项目人员：">
        <!-- <el-cascader :options="options" :props="props"  @click="selects"></el-cascader> -->
        <el-select
          v-model="type"
          @change="getCascader"
          placeholder="请选择类型"
        >
        <el-cascader
          ref="cascader"
          v-model="values"
          :options="options"

          :props="optionProps"
          :show-all-levels="false"
        ></el-cascader>
        </el-select>

      </el-form-item>

      <!-- 上传图片 -->
      <el-form-item label="上传word报告：">
        <!-- <el-upload
          class="avatar-uploader"
          action="http://120.77.145.204:8021/uploadFile?name=nb"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="item.pictureUrl" :src="item.pictureUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload> -->
        <el-upload
          class="upload-demo"
          action="http://120.77.145.204:8021/uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传docx/exe文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <!-- ------------------------------ -->

      <el-form-item>
        <el-button type="success" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import addsearchitem from "@/api/searchitem";
import collagelist from "@/api/usercontroller";
export default {
  data() {
    //人数判断
    var num = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      props: { multiple: true },
      item: {
        pictureUrl: "",
      },
      loadFileParams: {
        projectname: "",
      },
      rules: {
        itemName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        leaderName: [
          { required: true, message: "请输入组织人姓名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请输入类型", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        detail: [
          { required: true, message: "请输入项目简介", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
        memberNumber: [{ validator: num, required: true, trigger: "blur" }],
        maxNumber: [{ validator: num, required: true, trigger: "blur" }],
      },
      //  options: [{
      //     value: 1,
      //     label: '东南',

      //       children: [
      //         { value: 2, label: '普陀' },
      //         { value: 3, label: '黄埔' },
      //         { value: 4, label: '徐汇' }
      //       ]

      //   }, ]
      // options:[]

      optionProps: {
        value: "id",
        label: "label",
        children: "children",
      },
    };
  },
  methods: {
    // selects(){
    //   console.log('aaaaaaa');
    // },
    getCascader(value) {
      console.log("aaaaaaaa");
      // let nodesObj = this.$refs["cascader"].getCheckedNodes();
      // console.log(nodesObj);
      // console.log(nodesObj[0].data); //打印当前选中的节点的信息
      // console.log(nodesObj[0].data.id);
    },
    onSubmit() {
      //获取from结点，验证字段
      this.$refs.ruleForm.validate(async (success) => {
        //如果全部字段符合条件
        if (success) {
          var vm = this;
          addsearchitem
            .aditem(vm.item)
            .then(function (resp) {
              vm.$message({
                message: "添加成功!",
                type: "success",
              });
              vm.$router.go(-1);
            })
            .catch(function (error) {
              vm.$message.error("添加失败");
            });
        } else {
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      //  this.item.pictureUrl = res.data.path;
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //上传图片相关回调
    // handleAvatarSuccess(res, file) {
    //   this.item.pictureUrl = res.data;
    //   console.log("上传图片成功", this.item.pictureUrl);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   console.log("beforeAvatarUpload", file);
    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
  },
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}

.box {
  margin-left: 200px;
  height: 800px;
  width: 700px;
  border: solid rgb(187, 186, 187);
}

.avatar-uploader .el-upload {
  border: 3px dashed #decfcf;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
