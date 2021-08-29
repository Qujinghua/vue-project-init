<template>
  <div class="content">
    <div class="content-form">
      <el-form label-width="100px" :model="ruleForm">
        <el-form-item label="站点">
          <el-input disabled v-model="ruleForm.web_url"></el-input>
        </el-form-item>
        <el-form-item label="详情内容">
          <vue-editor
            useCustomImageHandler
            @image-added="handleImageAdded"
            v-model="ruleForm.content"
          >
          </vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {
  getGameDetail,
  gameDetailImg,
  gameDetailUpdate,
} from "@/api/gameDetail";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      ruleForm: {
        web_id: "",
        web_url: "",
        content: "",
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
      getGameDetail(params)
        .then((data) => {
          this.ruleForm = { ...data.data };
          console.log(this.ruleForm);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      let formData = new FormData();
      formData.append("file", file);
      gameDetailImg(formData)
        .then((data) => {
          const url = data.data.imgUrl; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm() {
      gameDetailUpdate(this.ruleForm)
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
