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

    <el-form ref="form" :model="form" :rules="rules">
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

    <el-table :data="notApprovedTeams" stripe style="width: 100%">
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
    };
  },
  computed: {
    notApprovedTeams() {
      return this.$store.state.notApprovedTeams;
    },
    // notApprovedTeams: [{
    // captain: "",
    // member1: "",
    // subName: "",
    // id: "",
    // }],
  },
  created() {
    if (this.$store.state.user.birthday === undefined) {
      this.$axios
        .post("/getNotApprovedTeams.te", {
          data: {
            teacherId: this.$store.state.user.id,
          },
        })
        .then((resp) => {
          this.$store.commit(
            "saveNotApprovedTeams",
            resp.data.notApprovedTeams
          );
        });
    }

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
  mounted() {},
  methods: {
    getAllStudents() {
      return this.$axios.get("/getAllStudents.st");
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
          }else{
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
    success(index) {
      this.$store.commit("removeOneNotApprovedTeam", index);
      this.$message({
        message: "操作成功",
        showClose: true,
        type: "success",
      });
    },
    fail() {
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
            this.success(index);
          } else {
            this.fail();
          }
        })
        .catch((e) => {
          this.fail();
        });
    },
    reject(teamId, index) {
      console.log('index=' + index);
      this.$axios
        .delete("/rejectTeam.te", {
          data: {
            data: {
              teamId: teamId,
            }
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
  },
};
</script>

<style scoped>
.captain {
  font-weight: bold;
}
</style>
