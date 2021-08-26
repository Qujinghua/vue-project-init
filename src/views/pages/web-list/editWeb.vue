<template>
  <el-drawer
    title="编辑网站"
    size="50%"
    custom-class="web-edit-drawer"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="edit-web">
      <el-form
        :model="ruleForm"
        size="mini"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="网站链接" prop="web_url">
          <el-input v-model="ruleForm.web_url"></el-input>
        </el-form-item>
        <el-form-item label="网站ID / 端口号" prop="region">
          <el-input v-model="ruleForm.web_id"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="ruleForm.create_time"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="详情" prop="remarks">
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
import { webListAdd } from "@/api/webList";
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      ruleForm: {
        web_url: "",
        web_id: "",
        create_time: "",
        remarks: "",
      },
    };
  },
  methods: {
    init() {
      this.drawer = true;
    },
    handleClose() {
      this.drawer = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          webListAdd(this.ruleForm)
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
  width: 500px;
}
</style>
<style lang="scss">
.web-edit-drawer {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 17px 20px 17px 20px;
    border-bottom: 1px solid #eee;
  }
}
</style>