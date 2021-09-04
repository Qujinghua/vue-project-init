<template>
  <div class="content">
    <div class="content-title">
      <el-button
        type="primary"
        size="small"
        @click="addWeb"
        :disabled="listData.length > 4"
        >新增游戏分类</el-button
      >
      <span v-if="listData.length > 4"
        >一个站点最多支持5条游戏分类的展示，如需修改配置请联系网站开发人员</span
      >
    </div>
    <div class="content-table">
      <el-table :data="listData" stripe size="mini" style="width: 100%">
        <el-table-column prop="web_url" label="站点"> </el-table-column>
        <el-table-column prop="title" label="游戏标题"> </el-table-column>
        <el-table-column prop="subtitle" label="副标题"> </el-table-column>
        <el-table-column prop="wechat" label="微信号"> </el-table-column>
        <el-table-column prop="img_url" label="缩略图">
          <template slot-scope="scope">
            <img
              :src="scope.row.img_url"
              style="max-width: 50px; max-height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="download_url" label="下载链接">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editDrawerBtn(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="delDrawerBtn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit-drawer ref="editWeb" @refresh-list="getList"></edit-drawer>
  </div>
</template>

<script>
import editDrawer from "./editDrawer.vue";
import { getGameList, gameDel } from "@/api/gameClassify";
export default {
  components: {
    editDrawer,
  },
  data() {
    return {
      searchParams: {
        web_id: "",
      },
      listData: [],
    };
  },
  mounted() {
    this.searchParams.web_id = window.localStorage.getItem("web_id");
    this.getList();
  },
  methods: {
    getList() {
      getGameList(this.searchParams)
        .then((data) => {
          this.listData = data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addWeb() {
      this.$refs.editWeb.init("add");
    },
    editDrawerBtn(row) {
      this.$refs.editWeb.init("edit", row);
    },
    delDrawerBtn(item) {
      let params = {
        id: item.id,
      };
      gameDel(params)
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  &-title {
    margin-bottom: 10px;
    & span {
      margin-left: 20px;
      color: #909399;
      font-size: 12px;
    }
  }
  &-page {
    text-align: right;
    padding: 10px;
  }
}
</style>
