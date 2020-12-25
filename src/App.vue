<template>
  <div id="app">
    <link
      href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.1/css/all.min.css"
      rel="stylesheet"
    />
    <el-container>
      <el-header>
        <navigation></navigation>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <my-footer></my-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import MyFooter from "./components/MyFooter.vue";
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
    MyFooter,
  },
  created() {
    this.$axios
      .get("/getUserSession")
      .then((res) => {
        console.log(res);
        if (res.data.logined) {
          this.$store.commit("saveUser", res.data.user);
          console.log(res.data.user);
          if (res.data.hasTeam) {
            this.$store.commit("saveTeam", res.data.team);
          }
          this.$store.commit("saveNotApprovedTeams", res.data.notApprovedTeams);
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
};
</script>

<style scope>
.el-header,
.el-footer {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  /* text-align: center; */
  min-height: 400px;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
