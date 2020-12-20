<template>
  <div class="">
    <el-form
      ref="teacherForm"
      :rules="rules"
      :inline="true"
      :model="teacherForm"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="teacherForm.username"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="id">
        <el-input v-model.number="teacherForm.id"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-switch
          active-color="#409EFF"
          inactive-color="#FFC0CB"
          v-model="teacherForm.gender"
          active-text="男"
          inactive-text="女"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('teacherForm')"
          >立即添加教师</el-button
        >
        <el-button @click="resetForm('teacherForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "AddTeacher",
  components: {},
  data() {
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("工号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须非负"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      teacherForm: {
        username: "",
        id: -1,
        gender: true,
      },
      rules: {
        username: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        id: [{ validator: checkId, trigger: "blur" }],
        className: [
          { required: true, message: "请输入学生班级", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.addTeacher(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginSuccess(resp) {
      this.$message({
        message: "添加成功",
        showClose: true,
        type: "success",
      });
    },
    loginFail(mess = "") {
      this.$message({
        showClose: true,
        message: mess + " 添加失败，请稍后再试",
        type: "error",
      });
    },
    addTeacher(formName) {
      //向后台发送登陆表单
      this.$axios
        .post("/addTeacher.admin", {
          data: {
            teacher: this.teacherForm,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.addSuccess == false) {
            this.loginFail(resp.data.error);
          } else {
            this.loginSuccess(resp);
            this.resetForm(formName);
          }
        })
        .catch((error) => {
          console.log(error);
          this.loginFail();
        });
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
