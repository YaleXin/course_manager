<template>
  <div class="loginDialog">
    <el-input
      placeholder="请输入用户名"
      suffix-icon="el-icon-user-solid"
      v-model="username"
    ></el-input>
    <el-input
      placeholder="请输入密码"
      v-model="password"
      show-password
    ></el-input>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.loginDialog {
    width: 30%;
    
}
</style>
