<template>
  <div class="">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">题目</el-menu-item>
      <el-menu-item index="3">进展</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  components: {},
  data() {
    return {
      activeIndex: "1",
    };
  },
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.replace("/main").catch((err) => {});
          break;
        case "2":
          this.$router.replace("/subject").catch((err) => {});
          break;
        case "3":
          this.$router.replace("/progress").catch((err) => {});
          break;
        default:
          this.$router.replace("/main").catch((err) => {});
      }
      console.log(key);
    },
  },
};
</script>

<style scoped></style>
