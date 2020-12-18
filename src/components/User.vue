<template>
  <div class="">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ user.nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-setting" command="changeInfo"
          >修改信息</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-delete" command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "User",
  components: {},
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        role: "",
      },
    };
  },
  mounted() {
    const storeUser = this.$store.state.user;
    this.user = storeUser;
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      if (command == "logout") {
        this.$store.commit("userLogout", this.user);
        this.$message("注销成功！");
        this.$router.replace("/main").catch(() => {});
      } else if (command == "changeInfo") {
        this.$router.push("modify");
      }
    },
  },
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  font-size: 20px;
  /* color: #409EFF; */
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
