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
                  style="width: 400px;"
                 v-model="item.detail"
                  type="textarea"
                  placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="项目经费：" >
        <el-input
          v-model.number="item.budget"
          style="width: 300px"
          placeholder="请输入内容"
        />
      </el-form-item>

      <!-- <el-form-item label="项目小组成员名字：">
        <el-input
          v-model.number="item.maxNumber"
          style="width: 300px"
          placeholder="请输入内容"
        />
      </el-form-item> -->

      <el-form-item label="开始时间:" prop="createTime">
        <el-date-picker
          v-model="item.createTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"

        >
        </el-date-picker>

      </el-form-item>

      <el-form-item  label="更新时间:" prop="updateTime">
        <el-date-picker
          v-model="item.updateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
           placeholder="选择日期时间"

        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="修改报告：">
         <el-input
          v-model="item.fileUrl"
          style="width: 400px"
          placeholder="请输入内容"
        />
        <el-upload
          class="upload-demo"
          action="http://120.77.145.204:8021/uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success ="handchan"
          accept=".docx,.exe"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="item.fileUrl"
        >
          <el-button size="small" type="primary">修改上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传docx/exe文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>


      <el-form-item style="margin-left: -20px">
        <el-button type="primary" @click="onSubmit">编辑</el-button>
      </el-form-item>
   </el-form>
  </div>
</template>
<script>
import updatesearchitem from "@/api/searchitem";
export default {
    data(){
       //人数判断
      var num = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }else{
            callback();
          }
        }, 1000);
      };
      return {
         // -------------------------------------------日历
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      item:{},

       rules:{
           itemName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          leaderName: [
            { required: true, message: '请输入组织人姓名', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
           type: [
            { required: true, message: '请输入类型', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '请输入项目简介', trigger: 'blur' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          ],
           memberNumber:[
           { validator: num, required: true,trigger: 'blur' }
          ],
           maxNumber:[
           { validator: num, required: true,trigger: 'blur' }
          ],
           createTime: [
            {  required: true, message: '请选择开始日期、时间', trigger: 'blur' },
          ],
          updateTime: [
            { required: true, message: '请选择更新日期、时间', trigger: 'blur' },
          ],
      }
      }
    },
      created(){
    this.fatchDataId();
  },
    methods: {
    fatchDataId(){
      var id = this.$route.params.itemId
      var vm = this
     updatesearchitem.updateitem(id)
     .then(function(resp) {
        vm.item = resp.data
        console.log('aaaaaaa',vm.item);
        })
    },
     onSubmit() {
      //获取from结点，验证字段
      this.$refs.ruleForm.validate(async (success) => {
        //如果全部字段符合条件
        if (success) {
           var vm = this;
    updatesearchitem.upsubmititem(vm.item)
        .then(function (resp) {
          vm.$message({
            message: "修改成功!",
            type: "success",
          });
          vm.$router.go(-1);
        })
        .catch(function (error) {
          vm.$message.error("修改失败");
        });
           }
        else {
          return false;
        }
      });
    },
     //上传图片相关回调
    // handleAvatarSuccess(res, file) {
    //     this.item.pictureUrl = res.data;
    //     console.log("上传图片成功",res)
    //   },
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === 'image/jpeg';
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //      console.log("beforeAvatarUpload",file)
    //     if (!isJPG) {
    //       this.$message.error('上传头像图片只能是 JPG 格式!');
    //     }
    //     if (!isLt2M) {
    //       this.$message.error('上传头像图片大小不能超过 2MB!');
    //     }
    //     return isJPG && isLt2M;

    //   }
    handchan(response, file, fileList){
      console.log('ttttt',response.data.path);
      this.item.fileUrl = response.data.path
      console.log( this.item.fileUrl);
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
    }
}
</script>


<style scoped>
.line {
  text-align: center;
}
.box {
  margin-left: 200px;
  height: 1100px;
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
    border-color: #409EFF;
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
