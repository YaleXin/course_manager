<template>
  <div class="">
    <el-row type="flex" justify="center" v-show="showMsg">
      <el-col :span="6"><el-link type="warning" @click.native="textClick">您还没有组队选题噢 点此查看</el-link></el-col>
    </el-row>

    <el-table :data="subjects" stripe style="width: 100%">
      <el-table-column prop="name" label="题目名称" width="180">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击查看题目详情"
            placement="top"
          >
            <el-button @click.native="SubjectClick(scope.$index)">{{
              scope.row.name
            }}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="selectNum" label="选题人数" width="180">
      </el-table-column>
      <el-table-column prop="finished" label="完成人数"> </el-table-column>
      <el-table-column prop="teacherName" label="题目提供者"> </el-table-column>
    </el-table>
    <el-button type="success" @click="tryAddSubject" plain id="add-btn"
      >添加题目</el-button
    >
    <el-dialog
      title="题目详情"
      :visible.sync="centerDialogVisible"
      width="80%"
      center
    >
      <pre>{{ description }}</pre>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Subject",
  components: {},
  data() {
    return {
      showMsg: true,
      programs: [
        { descr: "题目一", selectNum: 10, finished: 5, copyright: "黄阿信" },
        { descr: "题目二", selectNum: 10, finished: 2, copyright: "黄阿信" },
      ],
      subjects: [
        {
          name: "题目名称",
          selectNum: 0,
          finished: 0,
          teacherName: "题目提供者",
          description: "题目描述",
        },
      ],
      description: "",
      centerDialogVisible: false,
    };
  },
  mounted() {
    console.log('this.$store.state.team');
    console.log(this.$store.state.team);
    if(this.$store.state.team.su_id === 0)this.showMsg = true;
    else this.showMsg = false;
  },
  methods: {
    textClick() {
      this.$router.replace("/team").catch(e =>{});
    },
    tryAddSubject() {
      this.$router.push("/addSubject").catch((e) => {});
    },
    SubjectClick(index) {
      this.description = this.subjects[index].description;
      this.centerDialogVisible = true;
    },
  },
  created() {
    this.$axios
      .get("/getAllSubject")
      .then((resp) => {
        this.subjects = resp.data.subjects;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
#add-btn {
  margin-top: 10px;
}
</style>
