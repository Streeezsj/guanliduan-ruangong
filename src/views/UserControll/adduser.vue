<template>
  <div class="box" shadow="never">
    <el-form :model="user" label-width="180px" :rules="rules" ref="ruleForm">
      <el-form-item></el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input
          v-model="user.name"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>

      <el-form-item label="用户名称：" prop="username">
        <el-input
          v-model="user.username"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>

      <el-form-item label="用户密码：" prop="password">
        <el-input
          v-model="user.password"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>

      <el-form-item label="用户性别：">
        <el-radio-group v-model="user.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="用户权限：" prop="authority">
        <el-select v-model="user.authority" placeholder="请选择权限级别">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
          <el-option label="普通用户" value="普通用户"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话：" prop="phone">
        <el-input
          v-model.number="user.phone"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input
          v-model="user.email"
          style="width: 400px"
          placeholder="请输入内容"
        />
      </el-form-item>

    <el-form-item label="用户状态：" prop="status">
        <el-select v-model="user.status" placeholder="请选择用户状态">
          <el-option label="状态1" value="1"></el-option>
          <el-option label="状态0" value="0"></el-option>
        </el-select>
      </el-form-item>

       <!-- 上传图片 -->
      <el-form-item label="上传图片：">
        <el-upload
          class="avatar-uploader"
          action="http://120.77.145.204:8021/uploadFile"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="user.portrait" :src="user.portrait" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <!-- ------------------------------ -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import addusercontroll from "@/api/usercontroller";
export default {
  data() {
    //用户密码
    var num = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }

      setTimeout(() => {
        const Password = /^[a-zA-Z]\w{5,17}$/;
        if (!Password.test(value)) {
          callback(
            new Error(
              "请输入以字母开头，长度在6-18之间，只能包含字符、数字和下划线。"
            )
          );
        } else {
          callback();
        }
      }, 1000);
    };
    //用户权限
    var statuss = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value > 1 || value < 0) {
            callback(new Error("请输入数字值1或者0"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    //邮箱验证
    var checkemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("内容不能为空"));
      }
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!regEmail.test(value)) {
        callback(new Error("输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    //电话判断
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      const reg = /^1[34578]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("输入手机格式不正确"));
      } else {
        callback();
      }
    };

    return {
      user: {
        sex: 0,
        authority: "",
        portrait:""
      },

      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [{ validator: num, required: true, trigger: "blur" }],
         status: [{ required: true, message: "请选择用户状态", trigger: "change" }],
        email: [{ validator: checkemail, required: true, trigger: "blur" }],
        phone: [{ validator: checkphone, required: true, trigger: "blur" }],
        authority: [
          { required: true, message: "请选择权限级别", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      //获取from结点，验证字段
      this.$refs.ruleForm.validate(async (success) => {
        //如果全部字段符合条件
        if (success) {
          var vm = this;
          addusercontroll
            .aduser(vm.user)
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
      //上传图片相关回调
    handleAvatarSuccess(res, file) {
      console.log('sdsa',res);
      console.log('sdsa',res.data);
      this.user.portrait = res.data.path;
      console.log("上传图片成功", this.user.portrait);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log("beforeAvatarUpload", file);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //  onSubmit() {
    //   var vm = this
    //   addusercontroll.aduser(vm.user)
    //   .then(function(resp) {
    //     // vm.user = resp.data.code
    //     // console.log('qqq',vm.user);
    //     	this.$message({
    //     	  message: '添加成功!',
    //     	  type: 'success'
    //       })

    //     vm.$router.go(-1)
    //     console.log('qqqqqqqqqqq');
    //   })
    //   .catch(function(error) {
    //         console.log('aaaaaaa');
    //   			 vm.$message.error('添加失败')
    //         //  this.$router.go(-1)
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}

.box {
  margin-left: 200px;
  height: 850px;
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

