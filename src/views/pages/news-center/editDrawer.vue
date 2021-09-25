<template>
  <el-drawer
    :title="action == 'add' ? '新增新闻' : '编辑新闻'"
    size="60%"
    custom-class="web-edit-drawer"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="edit-web">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="是否展示在网页">
          <el-radio-group v-model="ruleForm.is_show">
            <el-radio label="0">不展示</el-radio>
            <el-radio label="1">展示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="新闻缩略图" prop="img">
          <el-upload
            ref="upload"
            :action="actionUrl"
            list-type="picture-card"
            show-file-list
            :file-list="fileList"
            :data="ruleForm"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="fileChange"
            :on-success="successUpload"
            :on-exceed="onExceed"
            :auto-upload="false"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <vue-editor
            useCustomImageHandler
            @image-added="handleImageAdded"
            v-model="ruleForm.content"
          >
          </vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="nowDrawerStatus == 'detail'"
            @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { gameDetailImg } from "@/api/gameDetail";
import { newsUpdate } from "@/api/newsCenter";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      drawer: false,
      action: "add",
      direction: "rtl",
      ruleForm: {
        web_url: "",
        web_id: "",
        is_show: "0",
        title: "",
        img_url: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入新闻标题", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
      },
      fileList: [],
      headerImgData: {},
      dialogImageUrl: "",
      dialogVisible: false,
      nowDrawerStatus: "detail",
    };
  },
  computed: {
    actionUrl() {
      return this.action == "add"
        ? "/api/news-center/add"
        : "/api/news-center/update";
    },
  },
  methods: {
    init(action, row, operation) {
      this.action = action;
      if (action == "edit") {
        this.ruleForm = { ...row };
        row.img_url && this.fileList.push({ url: row.img_url });
      }
      this.ruleForm.web_url = window.localStorage.getItem("web_url");
      this.ruleForm.web_id = window.localStorage.getItem("web_id");
      this.drawer = true;
      this.nowDrawerStatus = operation;
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.action == "add") {
            this.$refs.upload.submit();
          } else {
            if (this.fileList.length) {
              if (this.fileList[0].raw) {
                this.$refs.upload.submit();
              } else {
                newsUpdate(this.ruleForm)
                  .then(() => {
                    this.$message({
                      type: "success",
                      message: "保存成功",
                    });
                    this.handleClose();
                    this.$emit("refresh-list");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } else {
              this.$message({
                type: "warning",
                message: "未上传文件",
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fileChange(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
    },
    successUpload(response, file, fileList) {
      console.log(response, file, fileList);
      this.$message({
        type: "success",
        message: "保存成功",
      });
      this.handleClose();
      this.$emit("refresh-list");
    },
    handleRemove() {
      this.$refs.upload.clearFiles();
      this.fileList = [];
    },
    onExceed() {
      this.$message({
        type: "warning",
        message: "最多上传1个文件，如需修改，请删除后再次上传",
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClose() {
      this.ruleForm = {
        web_url: "",
        web_id: "",
        is_show: "0",
        title: "",
        img_url: "",
        content: "",
      };
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.drawer = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-web {
  padding: 10px 20px;
  height: 100%;
  overflow: auto;
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