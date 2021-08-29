<template>
  <div class="content">
    <div class="content-form">
      <el-form label-width="100px" :model="ruleForm">
        <el-form-item label="站点">
          <el-input disabled v-model="ruleForm.web_url"></el-input>
        </el-form-item>
        <el-form-item label="底栏标题">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="底栏微信号">
          <el-input v-model="ruleForm.wechat"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getFooterBar, footerBarUpdate } from "@/api/footerBar";
export default {
  data() {
    return {
      ruleForm: {
        web_id: "",
        web_url: "",
        title: "",
        wechat: "",
      },
    };
  },
  mounted() {
    this.ruleForm.web_id = window.localStorage.getItem("web_id");
    this.ruleForm.web_url = window.localStorage.getItem("web_url");
    this.getDetail();
  },
  methods: {
    getDetail() {
      let params = {
        web_id: this.ruleForm.web_id,
      };
      getFooterBar(params)
        .then((data) => {
          this.ruleForm = { ...data.data };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      footerBarUpdate(this.ruleForm)
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  &-page {
    text-align: right;
    padding: 10px;
  }
}
</style>
