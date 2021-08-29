<template>
  <div class="content">
    <div class="content-table">
      <el-button type="primary" size="small" @click="addWeb">新增</el-button>
      <el-table :data="webListData" stripe size="mini" style="width: 100%">
        <el-table-column prop="web_url" label="网站地址" width="200">
        </el-table-column>
        <el-table-column prop="web_id" label="网站id" width="200">
        </el-table-column>
        <el-table-column prop="super_url" label="超链接" width="200">
        </el-table-column>
        <el-table-column prop="img_url" label="商标图"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="browseWeb(scope.row)"
              >编辑</el-button
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
        :page-sizes="[10, 20, 50, 100]"
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
import { webList } from "@/api/webList";
import { headerImg } from "@/api/headerImg";
export default {
  components: {
    editDrawer,
  },
  data() {
    return {
      currentPage: 1,
      searchParams: {
        page: 1,
        size: 10,
      },
      listData: [],
      total: 0,
      webListData: [],
    };
  },
  mounted() {
    this.getWebList();
  },
  methods: {
    getWebList() {
      let params = {
        page: 1,
        size: 1000,
      };
      webList(params)
        .then((data) => {
          this.webListData = data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList() {
      headerImg(this.searchParams)
        .then((data) => {
          this.webListData = data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    browseWeb(row) {
      window.open("http://" + row.web_url);
    },
    addWeb() {
      this.$refs.editWeb.init();
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
