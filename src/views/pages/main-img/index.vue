<template>
  <div class="content">
    <div class="content-form">
      <el-form label-width="100px" :model="ruleForm">
        <el-form-item label="站点">
          <el-input disabled v-model="ruleForm.web_url"></el-input>
        </el-form-item>
        <el-form-item label="图片超链接">
          <el-input v-model="ruleForm.super_url"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            ref="upload"
            action="/api/main-img/update"
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
        <el-form-item>
          <el-button type="primary" @click="submitUpload">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mainImg, mainImgUpdate } from "@/api/mainImg";
export default {
  data() {
    return {
      ruleForm: {
        web_id: "",
        web_url: "",
        super_url: "",
      },
      fileList: [],
      headerImgData: {},
      dialogImageUrl: "",
      dialogVisible: false,
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
      mainImg(params)
        .then((data) => {
          this.ruleForm = { ...data.data };
          if (this.ruleForm.img_url) {
            let obj = new Object();
            obj.url = this.ruleForm.img_url;
            obj.name =
              this.ruleForm.img_url.split("/")[
                this.ruleForm.img_url.split("/").length - 1
              ];
            this.fileList.push(obj);
            console.log(this.fileList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitUpload() {
      if (this.fileList.length) {
        if (this.fileList[0].raw) {
          this.$refs.upload.submit();
        } else {
          mainImgUpdate(this.ruleForm)
            .then((data) => {
              console.log(data);
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
