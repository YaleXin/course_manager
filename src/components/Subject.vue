<template>
  <div class="">
    <el-table :data="programs" stripe style="width: 100%">
      <el-table-column prop="descr" label="题目简述" width="180"> </el-table-column>
      <el-table-column prop="selectNum" label="选题人数" width="180"> </el-table-column>
      <el-table-column prop="finished" label="完成人数"> </el-table-column>
      <el-table-column prop="copyright" label="题目提供人"> </el-table-column>
    </el-table>
    <el-button type="success" @click="tryAddSubject" plain id="add-btn"
      >添加题目</el-button
    >
  </div>
</template>
<script>
export default {
  name: "Subject",
  components: {},
  data() {
    return {
      programs: [
        { descr: "题目一", selectNum: 10, finished: 5, copyright: "黄阿信" },
        { descr: "题目二", selectNum: 10, finished: 2, copyright: "黄阿信" },
      ],
    };
  },
  mounted() {},
  methods: {
    tryAddSubject() {
      this.$router.push("/addSubject").catch((e) => {});
    },
  },
};
</script>

<style scoped>
#add-btn {
  margin-top: 10px;
}
</style>
