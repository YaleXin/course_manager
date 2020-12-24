<template>
  <div class="loginDialog">
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
            v-model="ruleForm.username"
            class="inputItem"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-warning-outline"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            show-password
            class="inputItem"
            @keydown.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch
            style="display: block"
            v-model="ruleForm.isStudent"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="我是学生"
            inactive-text="我是教师"
          >
          </el-switch>
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
        isStudent: true,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { whitespace: true, message: "请输入非空用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { whitespace: true, message: "请输入非空密码", trigger: "blur" },
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
  methods: {
    loginClick() {
      console.log("登陆");
    },
    loginSuccess(resp) {
      this.$message({
        message: "登陆成功",
        showClose: true,
        type: "success",
      });
      this.$store.commit("saveUser", resp.data.user);
      this.$router.replace("/main").catch(() => {});
      this.$store.commit("saveNotApprovedTeams", res.data.notApprovedTeams);
    },
    loginFail(msg = "") {
      this.$message({
        showClose: true,
        message: "登陆失败，请稍后再试， 失败原因：" + msg,
        type: "error",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(typeof this.ruleForm.username);
          //向后台发送登陆表单
          this.$axios
            .post("/login", {
              data: {
                username: this.trimTwo(this.ruleForm.username),
                password:
                  this.loginKey.prefixKey +
                  this.trimTwo(this.ruleForm.password) +
                  this.loginKey.suffixKey,
                isStudent: this.ruleForm.isStudent,
              },
            })
            .then((resp) => {
              if (resp.data.loginSuccess) {
                console.log('resp.data');
                console.log(resp.data);
                this.loginSuccess(resp);
                if(resp.data.hasTeam){
                  this.$store.commit("saveTeam", resp.data.team);
                  console.log(resp.data.team);
                }
              } else {
                this.loginFail(resp.data.error);
              }
            })
            .catch((error) => {
              // console.log('error');
              // this.loginFail();
            });
        } else {
          console.log("error submit!!");
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
