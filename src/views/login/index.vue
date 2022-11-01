<template>
  <div class="mains">
    <div style="min-height: 950px; padding: 100px 0 0 640px">
      <div class="login_box">
        <p class="login_title">
          <span
            :class="isActiveIndex === 0 ? 'isActiveTitle' : ''"
            @click="accountLogin"
            >账号登录</span
          ><!-- 利用三元运算符判定点击了哪个登录,从而绑定样式 -->
          <span
            :class="isActiveIndex === 1 ? 'isActiveTitle' : ''"
            @click="smsLogin"
            >短信登录</span
          >
        </p>
        <el-form
          v-if="isActive"
          ref="loginForm"
          :rules="loginRules"
          :model="loginForm"
          label-width="80px"
        >
          <el-form-item label="账号：" prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
            />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>

          <el-form-item prop="type" style="margin-left: -50px">
            <el-checkbox
              label="我已阅读并同意《用户服务协议》、《隐私权政策》"
              name="type"
              v-model="loginForm.type"
            ></el-checkbox>
          </el-form-item>

          <el-button
            class="login_btn"
            :loading="loading"
            @click.native.prevent="handleLogin"
            >立 即 登 录</el-button
          >
          <!-- <p style="text-align: right; margin-top: 10px"><a>忘记密码？</a></p> -->
          <!-- <p style="text-align: center; margin-top: 40px">
            第三方登录或<a>立即注册</a>
          </p> -->
        </el-form>
        <!-- 用手机，验证码登录 -->
        <el-form
          v-else
          ref="loginForm2"
          :model="loginForm2"
          label-width="80px"
          :rules="loginRules2"
        >
          <el-form-item label="手机号：" prop="phone">
            <el-input
              ref="phone"
              v-model="loginForm2.phone"
              placeholder="请输入手机号"
              name="phone"
              type="text"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="code">
            <el-input
            ref="code"
              v-model="loginForm2.code"
              style="width: 60%"
              placeholder="请输入验证码"
              name="code"
              @keyup.enter.native="handleLogin2"
              maxlength="6"
            ></el-input>
            <el-button @click.native.prevent="handleCode">获取验证码</el-button>
          </el-form-item>
          <el-form-item prop="type" style="margin-left: -50px">
            <el-checkbox
              label="我已阅读并同意《用户服务协议》、《隐私权政策》"
              name="type"
              v-model="loginForm2.type"
            ></el-checkbox>
          </el-form-item>
          <el-button
            class="login_btn"
            :loading="loading"
            @click.native.prevent="handleLogin2"
            >立 即 登 录</el-button
          >
          <p style="text-align: right; margin-top: 10px"><a>忘记密码？</a></p>
          <p style="text-align: center; margin-top: 40px">
            第三方登录或<a>立即注册</a>
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import codes from "@/api/msm";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      console.warn("aaa", value);
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value ===value) {
          callback();
        } else {
          callback(new Error("用户名输入错误"));
        }
      }, 1000);
    };
    const validatePassword = (rule, value, callback) => {

      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        if (value ===value) {
          callback();
          console.warn("qqq", value);
        } else {
          callback(new Error("密码输入错误"));
        }
      }, 1000);
    };
    const vaildatePhone = (rule,value,callback) =>{

        const reg = /^1[34578]\d{9}$/
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
       setTimeout(() => {
        if (value === value) {
          callback();
          console.warn("ccc", value);
        } else {
          callback(new Error("输入手机格式不正确"));
          console.log(value);
          console.log('asdsdasd',this.loginForm2.phone);
        }
      }, 1000);

    };
    const vaildateCode =(rule,value,callback) =>{

      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (value === value) {
          callback();
          console.warn("abc", value);
        } else {
          callback(new Error("验证码错误"));
        }
      }, 1000);
    };
    return {
      isActive: true, // 用于实现切换登录，作为判断
      isActiveIndex: 0,
      loginForm: {
        username: "",
        password: "",
      },
      loginForm2: {
        phone: "",
        code: "",
      },
      loginRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        type: [
          { required: true, message: "请✔勾选上用户协议", trigger: "blur" },
        ],
      },
      loginRules2: {
        phone:[{validator: vaildatePhone, trigger: "blur"}],
        code:[{
            validator: vaildateCode,
            trigger: "blur"
}],
type: [
          { required: true, message: "请✔勾选上用户协议", trigger: "blur" },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  //页面加载调用获取cookie值
  mounted() {
    this.getCookie();
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
  },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }

    },
    accountLogin() {
      // 账号登录
      this.isActive = true;
      this.isActiveIndex = 0;
      this.clearValidate('loginForm2')

    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((resp) => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.$message({
                message: "登录成功!",
                type: "success",
              });
              this.loading = false;
              // let token = resp.data;


              // sessionStorage.setItem("token",token)
              console.log('123123123123',window.sessionStorage.getItem('token'))
              // console.log('123123123123',window.sessionStorage.setItem('token'))
            })
            .catch(() => {
              this.loading = false;
              this.$message({
                message: "用户名或密码错误!",
                type: "error",
              });
            });
          //   var token = 'asdasdasd';
          // window.sessionStorage.removeItem('token',token)
          // console.log('ttt',window.sessionStorage.getItem('token'))
        } else {
          console.log("error submit!!");
          this.$message.error("用户名或密码填写错误！");
          return false;
        }
      });
    },
    handleLogin2() {
        this.$refs.loginForm2.validate((valid) =>{
          if(valid){
            console.log("zsj");
            this.loading = true;

      this.$store.dispatch("user/loginphone", this.loginForm2).then(() => {
        console.log("zsjnb");
        this.$router.push({
          path: this.redirect || "/",
          query: this.otherQuery,
        });
        this.$message({
          message: "登录成功!",
          type: "success",
        });
        this.loading = false;
      })
       .catch(() => {
              this.loading = false;
              this.$message({
                message: "手机号或验证码输入错误!",
                type: "error",
              });
            });
        } else {
          console.log("why!");
          // this.$message.error("用户名或密码填写错误！");
          return false;

          }
        })
    },

    handleCode() {
       if (!(/^1[34578]\d{9}$/.test(this.loginForm2.phone))) {
        this.$message.error('手机号码或者格式不正确')
        return;
      }
      var vm = this;
      this.phone = this.loginForm2.phone
      console.log(this.phone);
      codes
        .sendCode(this.phone)
        //请求成功调用
        .then(function (res) {
          console.log("zsjzsj");
          console.log("qqqqqqqqqqqq", res.code);
        })
        .catch(() => {
              this.loading = false;
              this.$message({
                message: "该手机账号不存在!",
                type: "error",
              });
            });

    },
    smsLogin() {
      // 短信登录
      this.isActive = false;
      this.isActiveIndex = 1;
      this.clearValidate('loginForm')
    },
  },
};
</script>

<style scoped>
.mains {
  background: url(~@/assets/login.jpg);
  background-size: 100% 100%;
}
.login_box {
  width: 450px;
  height: 490px;
  background-color: #fff;
  border-radius: 18px;
  padding: 30px 50px 30px 30px;
}
.login_title {
  text-align: center;
  margin: 30px 30px 40px 30px;
  font-size: 24px;
  color: #666;
}
.login_title span {
  margin: 0 20px 0 20px;
  cursor: pointer;
}
.login_title span:hover {
  color: #333;
  font-weight: bolder;
}
.isActiveTitle {
  color: #333;
  font-weight: bolder;
}
.login_agree {
  margin-left: 30px;
}
.login_btn {
  width: 100%;
  height: 50px;
  margin: 0 0 0 10px;
  background-color: #0cb95f;
  color: #fff;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
</style>
