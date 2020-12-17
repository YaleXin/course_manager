<template>
  <div class="">
    首页
    <button @click="beforeLogin">请求随机密钥</button>
  </div>
</template>
<script>
export default {
  name: "Main",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    beforeLogin() {
      this.$axios.get("/testJson4servlet/beforeLogin").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped></style>
