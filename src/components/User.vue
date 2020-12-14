<template>
  <div class="">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ user.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-setting" command="changeInfo">修改信息</el-dropdown-item>
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
        userName: "黄阿信",
        isCaptain: true,
      },
    };
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
      console.log(command);
      if (command == 'logout')this.$store.commit('userLogout', this.user);
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
