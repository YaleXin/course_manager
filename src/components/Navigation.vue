<template>
  <div class="navigation">
    <el-row type="flex" justify="center">
      <el-col :span="4" @click.native="itemClick(1)">
        <span :class="{ active: activeIndexByRoute == 1 }" class="item"
          ><i class="el-icon-menu"></i>首页</span
        >
      </el-col>
      <el-col :span="4" @click.native="itemClick(2)">
        <span :class="{ active: activeIndexByRoute == 2 }"
          ><i class="el-icon-document-copy"></i>题目</span
        >
      </el-col>
      <el-col :span="4" @click.native="itemClick(3)">
        <span :class="{ active: activeIndexByRoute == 3 }"
          ><i class="el-icon-data-line"></i>进展</span
        >
      </el-col>
      <el-col :span="4" @click.native="itemClick(4)">
        <span :class="{ active: activeIndexByRoute == 4 }"
          ><i class="el-icon-s-check"></i>团队</span
        >
      </el-col>
      <el-col :span="4">
        <user v-if="isLogin"></user>
        <span v-else
          ><el-link type="info" style="font-size: 20px" @click="loginClick">请登录</el-link></span
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
import User from "./User.vue";
export default {
  name: "Navigation",
  components: { User },
  data() {
    return {
      activeIndex: 1,
    };
  },
  mounted() {},
  methods: {
    itemClick(index) {
      // this.activeIndex = index;
      switch (index) {
        case 1:
          this.$router.replace("/main").catch((e) => {});
          break;
        case 2:
          this.$router.replace("/subject").catch((e) => {});
          break;
        case 3:
          this.$router.replace("/progress").catch((e) => {});
          break;
        case 4:
          this.$router.replace("/team").catch((e) => {});
          break;
        default:
      }
    },
    loginClick() {
      this.$router.replace("/login").catch((e) => {});
    },
  },
  computed: {
    activeIndexByRoute() {
      if (this.$route.path.indexOf("/main") != -1) return 1;
      else if (this.$route.path.indexOf("/subject") != -1) return 2;
      else if (this.$route.path.indexOf("/progress") != -1) return 3;
      else if (this.$route.path.indexOf("/team") != -1) return 4;
      return 0;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style scoped>
.active {
  color: rgb(64, 158, 255);
  border-bottom: 1px solid rgb(64, 158, 255);
}
.navigation {
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  box-shadow: -1px -1px 100px teal;
}
.item {
  /* margin-left: 10px;
  margin-right: 10px; */
  /* padding-left: 10px;
  padding-right: 10px; */
}
</style>
