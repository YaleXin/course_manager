<template>
  <div class="">
    <my-upload v-if="isStudent && isApproved && !isScored"></my-upload>
    <el-timeline>
      <el-timeline-item
        placement="top"
        v-for="(item, index) in progresses"
        :key="index"
      >
        <el-card>
          <el-tooltip
            class="item"
            effect="dark"
            content="点击下载"
            placement="top"
          >
            <span
              class="uploaderClass"
              style="widtd: auto"
              @click="download(item.content)"
              >{{ item.content }}</span
            >
          </el-tooltip>

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
      filename: "",
      isStudent: false,
      isApproved: false,
      isScored: true,
    };
  },
  mounted() {},
  methods: {
    timeStamp2date(timeStamp) {
      const date = new Date(timeStamp);
      return date.toLocaleDateString();
    },
    download(filename) {
      if (this.$store.state.user.role !== undefined) {
        (this.filename = filename),
          this.$axios
            .post("/download.user", {
              data: {
                fileName: this.filename,
              },
            }, {responseType: 'blob'})
            .then((res) => {
              console.log(res);
              const { data, headers } = res;
              const fileName = headers["content-disposition"].replace(
                /\w+;filename=(.*)/,
                "$1"
              );
              const blob = new Blob([data], { type: headers["content-type"] });
              let dom = document.createElement("a");
              let url = window.URL.createObjectURL(blob);
              dom.href = url;
              dom.download = decodeURI(fileName);
              dom.style.display = "none";
              document.body.appendChild(dom);
              dom.click();
              dom.parentNode.removeChild(dom);
              window.URL.revokeObjectURL(url);
            });
      } else {
        this.$message({
          message: "您不可以下载",
          showClose: true,
          type: "error",
        });
      }
    },
  },
  created() {
    const role = this.$store.state.user.role;
    let url = "";
    this.queryData = {};
    if (role === "student") {
      this.isStudent = true;
      if(this.$store.state.user.team.approved === true){
        this.isApproved = true;
      }
      if(this.$store.state.user.team.score == 0){
        this.isScored = false;
      }
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

<style scoped>
.uploaderClass {
  font-weight: bolder !important;
}
</style>
