<template>
  <div class="">
    <div>
      <span>队长：</span>
      <span class="captain">{{ team.captain }}</span>
    </div>
    <div>
      <span>队员：</span>
      <span v-for="(m, index) in team.members" :key="index">{{ m }} </span>
    </div>
    <div>
      题目：
      <el-link type="primary" @click.native="desc_click">{{
        team.subject.description
      }}</el-link>
    </div>
    <div>
      进展：
      <el-link type="primary" @click.native="prog_click">请移步</el-link>
    </div>

    作为队长，请选择您的队员：<el-select
      v-model="value1"
      multiple
      placeholder="请选择"
      :multiple-limit="2"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "Team",
  components: {},
  data() {
    return {
      team: {
        captain: "郝家旺",
        members: ["黄瑞信", "葛忠灿"],
        subject: {
          description: "题目简述",
          href: "/subject",
        },
      },

      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: [],
      value2: [],
    };
  },
  mounted() {},
  methods: {
    desc_click() {
      console.log("desc_click");
      this.$router.replace("/subject").catch((err) => {});
    },
    prog_click() {
      console.log("prog_click");
      this.$router.replace("/progress").catch((err) => {});
    },
  },
};
</script>

<style scoped>
.captain {
  font-weight: bold;
}
</style>
