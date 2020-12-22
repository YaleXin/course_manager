<template>
  <div class="">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="题目名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="题目描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 10, maxRows: 20}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button type="primary" plain @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "InputSubject",
  components: {},
  data() {
    return {
      ruleForm: {
        name: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入题目名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    addSuccess() {
      this.$message({
        showClose: true,
        message: "添加成功",
        type: "success",
      });
    },
    addFaile(msg = "") {
      this.$message({
        showClose: true,
        message: "添加失败，失败原因：" + msg,
        type: "error",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .put("/addSubject.te", {
              data: {
                name: this.ruleForm.name,
                description: this.ruleForm.desc,
                t_id: this.$store.state.user.id,
              },
            })
            .then((resp) => {
              if (resp.data.addSuccess) {
                this.addSuccess();
              } else {
                this.addFaile(resp.data.error);
              }
            })
            .catch((e) => {
              this.addFaile();
            });
          //console.log("user:");
          //console.log(this.$store.state.user); // {id: , gender: , username}
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
