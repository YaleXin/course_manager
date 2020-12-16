<template>
  <div class="loginDialog">
    <div class="content">
      <!-- <el-input
        placeholder="请输入用户名"
        prefix-icon="el-icon-user-solid"
        v-model="username"
        class="inputItem"
      ></el-input>
      <el-input
        prefix-icon="el-icon-warning-outline"
        placeholder="请输入密码"
        v-model="password"
        show-password
        class="inputItem"
      ></el-input>
      <div class="btnDiv">
        <el-button @click="loginClick" style="margin-top: 20px" plain round size="small" type="primary" icon="el-icon-thumb"
          >登陆</el-button
        >
      </div>
    </div> -->

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
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    loginClick() {
      console.log("登陆");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  模拟登陆成功
          //   alert("submit!");
          const user = {
            username: this.ruleForm.username,
            nickname: this.ruleForm.username + "的昵称",
            role: "captain",
          };
          this.$store.commit("saveUser", user);
          this.$router.replace("/main").catch(() => {});
          this.$message({
            message: "登陆成功",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
