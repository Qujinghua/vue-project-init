<template>
  <el-drawer
    :title="action == 'add' ? '新增游戏' : '编辑游戏'"
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
        <el-form-item label="游戏标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="游戏副标题" prop="subtitle">
          <el-input v-model="ruleForm.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="ruleForm.wechat"></el-input>
        </el-form-item>
        <el-form-item label="游戏缩略图" prop="img">
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
        <el-form-item label="游戏下载链接" prop="download_url">
          <el-input v-model="ruleForm.download_url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { gameClassifyUpdate } from "@/api/gameClassify";
export default {
  data() {
    return {
      drawer: false,
      action: "add",
      direction: "rtl",
      ruleForm: {
        web_url: "",
        web_id: "",
        title: "",
        subtitle: "",
        wechat: "",
        img_url: "",
        download_url: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        subtitle: [
          { required: true, message: "请输入副标题", trigger: "blur" },
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
    };
  },
  computed: {
    actionUrl() {
      return this.action == "add"
        ? "/api/game-classify/add"
        : "/api/game-classify/update";
    },
  },
  methods: {
    init(action, row) {
      this.action = action;
      console.log(row);
      if (action == "edit") {
        this.ruleForm = { ...row };
        row.img_url && this.fileList.push({ url: row.img_url });
      }
      this.ruleForm.web_url = window.localStorage.getItem("web_url");
      this.ruleForm.web_id = window.localStorage.getItem("web_id");
      this.drawer = true;
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
                gameClassifyUpdate(this.ruleForm)
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
        title: "",
        subtitle: "",
        wechat: "",
        img_url: "",
        download_url: "",
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
  .el-drawer__header {
    margin-bottom: 0;
    padding: 17px 20px 17px 20px;
    border-bottom: 1px solid #eee;
  }
}
</style>