<template>
  <div class="">
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top" v-for="(item, index) in commits" :key="index">
        <el-card>
          <h4>{{item.description}}</h4>
          <p>{{item.submitter}} 提交于 {{item.submitTime}}</p>
        </el-card>
      </el-timeline-item>

      <!-- <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item> -->
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "Progress",
  components: {},
  data() {
    return {
      commits: [
        {
          submitter: "黄阿信",
          description: "第一次提交",
          submitTime: "2020/12/10 20:46",
        },
        {
          submitter: "yalexin",
          description: "第二次提交",
          submitTime: "2020/12/11 20:46",
        },
        {
          submitter: "阿信",
          description: "第三次提交",
          submitTime: "2020/12/12 20:46",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
