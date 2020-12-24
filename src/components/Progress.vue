<template>
  <div class="">
    <my-upload></my-upload>
    <el-timeline>
      <el-timeline-item
        timestamp="2018/4/12"
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
      progresses: [
        {
          uploader: "",
          content: "",
          date: "",

        }
      ],
    };
  },
  mounted() {},
  methods: {
    timeStamp2date(timeStamp){
      const date = new Date(timeStamp);
      return date.toLocaleDateString();
    },
  },
  created() {
    this.$axios.post("/getAllProgresses.te", {
      data: {
        teacherId: this.$store.state.user.id,
      }
    }).then(resp =>{
      this.progresses = resp.data.progresses;
    }).catch(e => {
      console.log(e);
    })
  },
};
</script>

<style scoped></style>
