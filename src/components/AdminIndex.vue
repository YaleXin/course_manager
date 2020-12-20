<template>
  <div class="">
    <div class="msg">
      <span>管理员 欢迎您</span>
      <el-button
        @click.native="logout"
        size="small"
        plain
        type="danger"
        icon="el-icon-circle-close"
        >注销</el-button
      >
    </div>

    <add-student></add-student>
    <add-teacher></add-teacher>
  </div>
</template>
<script>
import AddStudent from "./AddStudent.vue";
import AddTeacher from "./AddTeacher.vue";
export default {
  name: "AdminIndex",
  components: { AddStudent, AddTeacher },
  data() {
    return {};
  },
  created() {
    if (this.$store.state.adminUser === null || this.$store.state.adminUser.id === -1) {
      // 用户主动刷新浏览器 vuex里边的数据也是没有了的
      this.$axios
        .get("/getSession")
        .then((res) => {
          console.log("adminIndex /getSession 请求到的数据：");
          console.log(res);
          if (res.data.logined) {
            this.$store.commit("saveAdminUser", resp.data.user);
          } else {
            this.$router.replace("/admin").catch((e) => {});
          }
        })
        .catch((error) => {});
    }
  },
  mounted() {},
  methods: {
    logout() {
      this.$axios
        .post("/logout.admin")
        .then((resp) => {
          this.$message({
            showClose: true,
            message: "注销成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "注销失败",
            type: "error",
          });
        });
      this.$store.commit("adminUserLogout");
      this.$router.replace("/admin").catch((e) => {});
    },
  },
};
</script>

<style scoped>
.msg {
  text-align: center;
  padding: 15px;
  padding-right: 15px;
  font-weight: bold;
}
</style>
