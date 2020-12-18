<template>
  <div class="">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="/testJson4servlet/progressUploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :limit="1"
      :on-exceed="exceed"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-timeline>
      <el-timeline-item
        timestamp="2018/4/12"
        placement="top"
        v-for="(item, index) in commits"
        :key="index"
      >
        <el-card>
          <h4>{{ item.description }}</h4>
          <p>{{ item.submitter }} 提交于 {{ item.submitTime }}</p>
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
      fileList: [],
    };
  },
  mounted() {},
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
  },
};
</script>

<style scoped></style>
