<template>
  <div class="">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldPass">
        <el-input
          type="password"
          show-password
          v-model="ruleForm.oldPass"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          show-password
          type="password"
          v-model="ruleForm.pass"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          show-password
          v-model="ruleForm.checkPass"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="出生日期" v-if="this.$store.state.user.birthday">
        <el-form-item prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.birthday"
            value-format="timestamp"
            format="yyyy 年 MM 月 dd 日"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "InfoForm",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      postUrl: "",
      loginKey: {
        prefixKey: "",
        suffixKey: "",
      },
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
        birthday: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPass: [{ validator: validatePass, trigger: "blur" }],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.ruleForm.birthday = this.$store.state.user.birthday;
    // 在这里偷个懒，两个密码使用同一个密钥
    this.$axios.get("/beforeLogin").then((res) => {
      console.log(res);
      this.loginKey.prefixKey = res.data.prefixKey;
      this.loginKey.suffixKey = res.data.suffixKey;
    });
  },
  created() {
    if (this.$store.state.user == null || this.$store.state.user.username == null || this.$store.state.user.username == "")this.$router.replace('/login').catch(e => {});
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$store.state.user.birthday == null)
            this.postUrl = "/modifyTeacher.te";
          else this.postUrl = "/modifyStudent.st";
          this.$axios
            .post(this.postUrl, {
              data: {
                id: this.$store.state.user.id,
                oldPass:
                  this.loginKey.prefixKey +
                  this.trimTwo(this.ruleForm.oldPass) +
                  this.loginKey.suffixKey,
                newPass:
                  this.loginKey.prefixKey +
                  this.trimTwo(this.ruleForm.pass) +
                  this.loginKey.suffixKey,
                birthday: this.ruleForm.birthday,
              },
            })
            .then((resp) => {
              if (resp.data.updated) {
                this.modifySuccess();
              } else {
                this.modifyfaile(resp.data.error);
              }
            })
            .catch((e) => {
              this.modifyfaile();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 去除首尾空格
    trimTwo(str) {
      return str.replace(/^\s+/, "").replace(/\s+$/, "");
    },
    modifySuccess() {
      this.$message({
        showClose: true,
        message: "修改密码成功！",
        type: "success",
      });
    },
    modifyfaile(errorMsg = "") {
      this.$message({
        showClose: true,
        message: "修改失败，请稍后再试， 失败原因：" + errorMsg,
        type: "error",
      });
    },
  },
};
</script>

<style scoped></style>
