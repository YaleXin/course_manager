<template>
  <div class="">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-upload
          ref="upload"
          :drag="true"
          :action="upUrl"
          :on-success="success"
          :on-error="error"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          :on-exceed="exceed"
          :before-remove="beforeRemove"
          :data="myData"
          accept=".doc, .docx"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取工作报告文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传doc/docx文件，且不超过500kb
          </div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "MyUpload",
  components: {},
  data() {
    return {
      fileList: [],
      myData: {
        teamId: -1,
        student: -1,
      },
      upUrl: "",
    };
  },
  created() {
    const teamId = this.$store.state.team.id;
    console.log(teamId);
    this.upUrl = "/testJson4servlet/upload.st?teamId=" + teamId;
  },
  mounted() {
    this.student = this.$store.state.user.id;
    console.log(this.$store.state.user.id);
  },
  computed: {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    exceed(files, fileList) {
      this.$message({
        showClose: true,
        message: "文件个数超限，请删除刚刚上传的文件后重试",
        type: "error",
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    success() {
      this.$message({
        showClose: true,
        message: "上传成功！",
        type: "success",
      });
    },
    error() {
      this.$message({
        showClose: true,
        message: "上传失败！",
        type: "error",
      });
    },
  },
};
</script>

<style scoped></style>
