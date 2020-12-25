<template>
  <div class="">
    <my-upload></my-upload>
    <el-timeline>
      <el-timeline-item
        timestamp="2020/12/20"
        placement="top"
        v-for="(item, index) in progresses"
        :key="index"
      >
        <el-card>
          <h4>{{ item.content }}</h4>
          <p>{{ item.uploader }} 提交于 {{ timeStamp2date(item.date) }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import MyUpload from "./MyUpload.vue";
export default {
  name: "Progress",
  components: { MyUpload },
  data() {
    return {
      progresses: [
        // {
        // uploader: "",
        // content: "",
        // date: "",
        // }
      ],
      queryData: {},
    };
  },
  mounted() {},
  methods: {
    timeStamp2date(timeStamp) {
      const date = new Date(timeStamp);
      return date.toLocaleDateString();
    },
  },
  created() {
    const role = this.$store.state.user.role;
    let url = "";
    this.queryData = {};
    if (role === "student") {
      url = "/getAllProgresses.st";
      this.queryData = {
        teamId: this.$store.state.team.id,
      };
    } else if (role === "teacher") {
      url = "/getAllProgresses.te";
      this.queryData = {
        teacherId: this.$store.state.user.id,
      };
    }
    if (role !== undefined) {
      this.$axios
        .post(url, {
          data: this.queryData,
        })
        .then((resp) => {
          this.progresses = resp.data.progresses;
          console.log(resp);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
};
</script>

<style scoped></style>
