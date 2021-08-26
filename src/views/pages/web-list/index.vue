<template>
  <div class="content">
    <div class="content-table">
      <el-button type="primary" size="small" @click="addWeb"
        >新增网站</el-button
      >
      <el-table :data="tableData" stripe size="mini" style="width: 100%">
        <el-table-column prop="web_url" label="网站地址" width="200">
        </el-table-column>
        <el-table-column prop="web_id" label="网站id" width="200">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="remarks" label="描述"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="browseWeb(scope.row)"
              >浏览站点</el-button
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
    <edit-web ref="editWeb" @refresh-list="getList"></edit-web>
  </div>
</template>

<script>
import editWeb from "./editWeb.vue";
import { webList } from "@/api/webList";
export default {
  components: {
    editWeb,
  },
  data() {
    return {
      currentPage: 1,
      searchParams: {
        page: 1,
        size: 10,
      },
      tableData: [],
      total: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      webList(this.searchParams)
        .then((data) => {
          this.tableData = data.data.list;
          this.total = data.data.total;
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
