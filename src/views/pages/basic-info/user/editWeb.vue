<template>
  <el-drawer
    title="新增管理员"
    size="50%"
    custom-class="web-edit-drawer"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="edit-web">
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名（请勿使用中文）" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remarks">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="ruleForm.remarks"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { addUser } from "@/api/user";
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      ruleForm: {
        username: "",
        password: "",
        phone: "",
        remarks: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    init() {
      this.drawer = true;
    },
    handleClose() {
      this.ruleForm = {
        username: "",
        password: "",
        phone: "",
        remarks: "",
      };
      this.drawer = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.ruleForm)
            .then((data) => {
              this.$message({
                type: "success",
                message: data.msg,
              });
              this.handleClose();
              this.$emit("refresh-list");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-web {
  padding: 10px 20px;
  height: 100%;
  overflow: auto;
  width: 600px;
}
</style>
<style lang="scss">
.web-edit-drawer {
  overflow: auto;
  .el-drawer__header {
    margin-bottom: 0;
    padding: 17px 20px 17px 20px;
    border-bottom: 1px solid #eee;
  }
}
</style>