<template>
  <div class="content">
    <div class="content-title">
      <el-button
        type="primary"
        size="small"
        @click="addWeb"
        :disabled="listData.length > 4"
        >新增新闻</el-button
      >
      <span v-if="listData.length > 4"
        >一个站点最多支持5条新闻的展示，如需修改配置请联系网站开发人员</span
      >
    </div>
    <div class="content-table">
      <el-table :data="listData" stripe size="mini" style="width: 100%">
        <el-table-column prop="web_url" label="站点" width="200">
        </el-table-column>
        <el-table-column prop="title" label="新闻标题" width="200">
        </el-table-column>
        <el-table-column prop="img_url" label="缩略图" width="200">
          <template slot-scope="scope">
            <img
              :src="scope.row.img_url"
              style="max-width: 50px; max-height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editDrawerBtn(scope.row)"
              >编辑</el-button
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
import { getNewsList } from "@/api/newsCenter";
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
      getNewsList(this.searchParams)
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
