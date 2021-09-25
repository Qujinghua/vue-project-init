<template>
  <div class="content">
    <div class="content-title">
      <el-button type="primary" size="small" @click="addWeb"
        >新增新闻</el-button
      >
    </div>
    <div class="content-table">
      <el-table :data="listData" stripe size="mini" style="width: 100%">
        <el-table-column prop="web_url" label="站点"> </el-table-column>
        <el-table-column prop="is_show" label="是否展示在网页">
          <template slot-scope="scope">
            <span v-if="scope.row.is_show == 1" style="color: #67c23a">{{
              scope.row.is_show == "0" ? "不展示" : "展示"
            }}</span>
            <span v-else style="color: #909399">{{
              scope.row.is_show == "0" ? "不展示" : "展示"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="新闻标题"> </el-table-column>
        <el-table-column prop="img_url" label="缩略图">
          <template slot-scope="scope">
            <img
              :src="scope.row.img_url"
              style="max-width: 50px; max-height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editDrawerBtn(scope.row, 'detail')"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editDrawerBtn(scope.row, 'edit')"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="delDrawerBtn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.page"
        :page-sizes="[10, 20, 50]"
        :page-size="searchParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <edit-drawer ref="editWeb" @refresh-list="getList"></edit-drawer>
  </div>
</template>

<script>
import editDrawer from "./editDrawer.vue";
import { getNewsList, newsDel } from "@/api/newsCenter";
export default {
  components: {
    editDrawer,
  },
  data() {
    return {
      searchParams: {
        web_id: "",
        page: 1,
        size: 10,
      },
      listData: [],
      total: 0,
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
          this.total = data.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addWeb() {
      this.$refs.editWeb.init("add");
    },
    handleSizeChange(val) {
      this.searchParams.page = 1;
      this.searchParams.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchParams.page = val;
      this.getList();
    },
    editDrawerBtn(row, operation) {
      this.$refs.editWeb.init("edit", row, operation);
    },
    delDrawerBtn(item) {
      let params = {
        id: item.id,
      };
      newsDel(params)
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
