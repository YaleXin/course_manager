<template>
  <div class="loginDialog">
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入管理员用户名"
            prefix-icon="el-icon-user-solid"
            v-model="ruleForm.username"
            class="inputItem"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-warning-outline"
            placeholder="请输入管理员密码"
            v-model="ruleForm.password"
            show-password
            class="inputItem"
            @keydown.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnDiv">
            <el-button
              @click="submitForm('ruleForm')"
              style="margin-top: 20px"
              plain
              round
              size="small"
              type="primary"
              icon="el-icon-thumb"
              >登陆</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginKey: {
        prefixKey: "",
        suffixKey: "",
      },

      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员用户名", trigger: "blur" },
          {
            whitespace: true,
            message: "请输入非空管理员用户名",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
          {
            whitespace: true,
            message: "请输入非空管理员密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$axios.get("/beforeLogin").then((res) => {
      console.log(res);
      this.loginKey.prefixKey = res.data.prefixKey;
      this.loginKey.suffixKey = res.data.suffixKey;
    });
  },
  created() {
    console.log("尝试登陆");
    this.$axios
      .get("/getSession")
      .then((res) => {
        console.log(res);
        if (res.data.logined) {
          this.$store.commit("saveAdminUser", res.data.user);
          this.$router.replace("/adminIndex").catch(() => {});
        } else {
        }
      })
      .catch((error) => {
        this.$message({
          showClose: true,
          message: "数据请求失败，请稍后再试",
          type: "error",
        });
      });
  },
  methods: {
    loginSuccess(resp) {
      this.$message({
        message: "登陆成功",
        showClose: true,
        type: "success",
      });
      this.$store.commit("saveAdminUser", resp.data.user);
      this.$router.replace("/adminIndex").catch(() => {});
    },
    loginFail(mess = "") {
      this.$message({
        showClose: true,
        message: mess + " 登陆失败，请稍后再试",
        type: "error",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //向后台发送登陆表单
          this.$axios
            .post("/adminLogin", {
              data: {
                username: this.trimTwo(this.ruleForm.username),
                password:
                  this.loginKey.prefixKey +
                  this.trimTwo(this.ruleForm.password) +
                  this.loginKey.suffixKey,
              },
            })
            .then((resp) => {
              if (resp.data.loginSuccess == false) {
                this.loginFail(resp.data.error);
              } else {
                this.loginSuccess(resp);
              }
            })
            .catch((error) => {
              this.loginFail();
            });
        } else {
          return false;
        }
      });
    },
    // 去除首尾空格
    trimTwo(str) {
      return str.replace(/^\s+/, "").replace(/\s+$/, "");
    },
  },
};
</script>

<style scoped>
.loginDialog {
  margin-top: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 30%;
  min-width: 200px;
}
.inputItem {
  margin-bottom: 5px;
}
.btnDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
