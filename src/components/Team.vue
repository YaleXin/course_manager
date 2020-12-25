<template>
  <div class="">
    <div class="teamInfo" v-if="isStudent && hasTeam">
      <div>
        <span>队长：</span>
        <span class="captain">{{ team.captain }}</span>
      </div>
      <div>
        <span>队员：</span>
        <span>{{team.member1}}</span>
        <span>{{team.member2}}</span>
      </div>
      <div>
        题目：
        <el-link type="primary" @click.native="desc_click">{{
          team.subName
        }}</el-link>
      </div>
      <div>
        <span>审核情况：</span>
        <span>{{team.approved?"已通过":"未通过"}}</span>
      </div>
      <div>
        <span>分数：</span>
        <span>{{team.scored ?team.score : "暂无"}}</span>
      </div>
      <div>
        进展：
        <el-link type="primary" @click.native="prog_click">请移步</el-link>
      </div>
    </div>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      v-if="isStudent && !hasTeam"
    >
      <el-form-item label="作为队长，请选择您的队员：">
        <el-select
          v-model="form.student"
          multiple
          placeholder="请选择"
          :multiple-limit="2"
        >
          <el-option
            v-for="stu in students"
            :key="stu.id"
            :label="stu.username"
            :value="stu.id"
          >
          </el-option
        ></el-select>
      </el-form-item>
      <el-form-item label="请选择你们的题目：" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择">
          <el-option
            v-for="s in subjects"
            :key="s.id"
            :label="s.name"
            :value="s.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')"
          >立即提交申请</el-button
        >
      </el-form-item>
    </el-form>

    <div v-if="isTeacher">
      <el-row type="flex" justify="center">
        <h3>请审核团队</h3>
      </el-row>
      <el-table border :data="notApprovedTeams" stripe style="width: 100%">
        <el-table-column prop="subName" label="题目名称" width="180">
        </el-table-column>
        <el-table-column prop="captain" label="组长" width="180">
        </el-table-column>
        <el-table-column prop="member1" label="组员一"> </el-table-column>
        <el-table-column prop="member2" label="组员二"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="accept(notApprovedTeams[scope.$index].id, scope.$index)"
              plain
              >通过申请</el-button
            >
            <el-button
              type="danger"
              @click="reject(notApprovedTeams[scope.$index].id, scope.$index)"
              plain
              >拒绝申请</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <h3>请评分</h3>
      </el-row>
      <el-table border :data="hasNoScoreTeams" stripe style="width: 100%">
        <el-table-column prop="subName" label="题目名称" width="180">
        </el-table-column>
        <el-table-column prop="captain" label="组长" width="180">
        </el-table-column>
        <el-table-column prop="member1" label="组员一"> </el-table-column>
        <el-table-column prop="member2" label="组员二"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.score"
              :min="1"
              :max="100"
            ></el-input-number>
            <el-button type="success" plain @click="trySetScore(scope.$index)"
              >确定打分</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <h3>已评分团队</h3>
      </el-row>
      <el-table border :data="hasScoreTeams" stripe style="width: 100%">
        <el-table-column prop="subName" label="题目名称" width="180">
        </el-table-column>
        <el-table-column prop="captain" label="组长" width="180">
        </el-table-column>
        <el-table-column prop="member1" label="组员一"> </el-table-column>
        <el-table-column prop="member2" label="组员二"> </el-table-column>
        <el-table-column prop="score" label="分数"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Team",
  components: {},
  data() {
    return {
      num1: 1,
      isTeacher: null,
      isStudent: null,
      hasTeam: false,
      team: {
        // captain: "",
        // member1: "",
        // member2: "",
        // subName: ""
        // approved: false
      },
      // notApprovedTeams: [{
      // captain: "",
      // member1: "",
      // subName: "",
      // id: "",
      // }],
      form: {
        student: [],
        subject: "",
      },
      subjects: [
        {
          name: "题目名称",
          id: 0,
          t_id: 0,
          selectNum: 0, //
          finished: 0, //
          teacherName: "题目提供者",
          description: "题目描述",
        },
      ],
      students: [
        {
          id: 0,
          username: "",
        },
      ],
      rules: {
        subject: [{ required: true, message: "请选择题目", trigger: "change" }],
      },
      hasScoreTeams: [
        // {
        //   captain: "",
        //   member1: "",
        //   member2: "",
        //   subName: "",
        //   score: -1,
        // }
      ],
      hasNoScoreTeams: [
        // {
        //   captain: "",
        //   member1: "",
        //   member2: "",
        //   subName: "",
        // }
      ],
      notApprovedTeams: [
        // {
        //   captain: "",
        //   member1: "",
        //   subName: "",
        //   id: "",
        // },
      ],
    };
  },
  computed: {
    // notApprovedTeams() {
    //   return this.$store.state.notApprovedTeams;
    // },
    // notApprovedTeams: [
    // {
    //   captain: "",
    //   member1: "",
    //   subName: "",
    //   id: "",
    // },
    // ],
  },
  created() {
    const user = this.$store.state.user;
    if (user.role === "teacher") {
      this.isTeacher = true;
      this.getNotApprovedTeams();
      this.getHasScore();
      this.getHasNoScoreTeams();
    } else if (user.role === "student") {
      this.isStudent = true;
      console.log(user);
      this.team = user.team;
      if (user.team === undefined) {
        this.hasTeam = false;
        this.getData4CreateTeam();
      } else {
        this.hasTeam = true;
      }
    }
  },
  mounted() {},
  methods: {
    setSocre(index) {
      console.log(this.hasNoScoreTeams[index]);
      this.$axios
        .post("/setScore.te", {
          data: {
            teamId: this.hasNoScoreTeams[index].id,
            score: this.hasNoScoreTeams[index].score,
          },
        })
        .then((resp) => {
          if (resp.data.setScore) {
            this.setSocreSuccess(index);
          } else {
            this.setSocreFail();
          }
        })
        .catch((e) => {
          console.log(e);
          this.setSocreFail();
        });
    },
    setSocreSuccess(index) {
      this.$message({
        message: "设置成功",
        showClose: true,
        type: "success",
      });
      const team = this.hasNoScoreTeams[index];
      this.hasNoScoreTeams.splice(index, 1);
      this.hasScoreTeams.splice(index, 0, team);
    },
    setSocreFail(error) {
      this.$message({
        message: "设置失败 原因：" + error,
        showClose: true,
        type: "error",
      });
    },
    trySetScore(index) {
      this.$confirm("此操作将代表您已经确认该组的分数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.setSocre(index);
        })
        .catch(() => {});
    },
    getAllStudents() {
      return this.$axios.get("/getAllHasNoTeamStudents.st");
    },
    getAllSubjects() {
      return this.$axios.get("/getAllSubject");
    },
    desc_click() {
      console.log("desc_click");
      this.$router.replace("/subject").catch((err) => {});
    },
    prog_click() {
      console.log("prog_click");
      this.$router.replace("/progress").catch((err) => {});
    },
    applySuccess() {
      this.$message({
        message: "提交成功！",
        showClose: true,
        type: "success",
      });
      this.hasTeam = true;
      this.$store.commit("changeUserTeamStatus");
    },
    applyFail() {
      this.$message({
        message: "提交失败",
        showClose: true,
        type: "error",
      });
    },
    addTeam() {
      this.$axios
        .put("/addTeam.st", {
          data: {
            subject: this.form.subject,
            captain: this.$store.state.user.id,
            members: this.form.student,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.addSuccess) {
            this.applySuccess();
            this.$store.commit("afterApplySaveTeam", resp.data.team);
            this.team = resp.data.team;
          } else {
            this.applyFail();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addTeam();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    approveSuccess(index) {
      this.$message({
        message: "操作成功",
        showClose: true,
        type: "success",
      });
      const team = this.notApprovedTeams[index];
      this.hasNoScoreTeams.splice(index, 0, team);
      this.notApprovedTeams.splice(index, 1);
    },
    approveFail() {
      this.$message({
        message: "操作失败，系统内部出现问题",
        showClose: true,
        type: "error",
      });
    },
    accept(teamId, index) {
      this.$axios
        .post("/acceptTeam.te", {
          data: {
            teamId: teamId,
          },
        })
        .then((resp) => {
          if (resp.data.success) {
            this.approveSuccess(index);
          } else {
            this.approveFail();
          }
        })
        .catch((e) => {
          this.fail();
        });
    },
    reject(teamId, index) {
      console.log("index=" + index);
      this.$axios
        .delete("/rejectTeam.te", {
          data: {
            data: {
              teamId: teamId,
            },
          },
        })
        .then((resp) => {
          if (resp.data.success === true) {
            this.success(index);
          } else {
            // this.fail();
          }
        })
        .catch((e) => {
          console.log(e);
          this.fail();
        });
    },
    getHasScore() {
      this.$axios
        .post("/getHasScoreTeams.te", {
          data: {
            teacherId: this.$store.state.user.id,
          },
        })
        .then((resp) => {
          this.hasScoreTeams = resp.data.hasScoreTeams;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getHasNoScoreTeams() {
      this.$axios
        .post("/getHasNoScoreTeams.te", {
          data: {
            teacherId: this.$store.state.user.id,
          },
        })
        .then((resp) => {
          this.hasNoScoreTeams = resp.data.hasNoScoreTeams;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getNotApprovedTeams() {
      this.$axios
        .post("/getNotApprovedTeams.te", {
          data: {
            teacherId: this.$store.state.user.id,
          },
        })
        .then((resp) => {
          this.notApprovedTeams = resp.data.notApprovedTeams;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getData4CreateTeam() {
      // 用于学生创建团队
      this.$axios.all([this.getAllStudents(), this.getAllSubjects()]).then(
        this.$axios.spread((stResp, suResp) => {
          // 两个请求现在都执行完成
          this.subjects = suResp.data.subjects;
          this.students = stResp.data.students;
          const id = this.$store.state.user.id;
          this.students = stResp.data.students.filter((item) => {
            return item.id !== id;
          });
        })
      );
    },
  },
};
</script>

<style scoped>
.captain {
  font-weight: bold;
}
</style>
