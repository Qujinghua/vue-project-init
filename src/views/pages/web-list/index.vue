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
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      >
      </el-pagination>
    </div>
    <edit-web ref="editWeb"></edit-web>
  </div>
</template>

<script>
import editWeb from "./editWeb.vue";
export default {
  components: {
    editWeb,
  },
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          web_url: "www.baidu.com",
          web_id: "1001",
          create_time: "2021.8.25",
          remarks: "描述",
        },
        {
          web_url: "www.baidu.com",
          web_id: "1001",
          create_time: "2021.8.25",
          remarks: "描述",
        },
        {
          web_url: "www.baidu.com",
          web_id: "1001",
          create_time: "2021.8.25",
          remarks: "描述",
        },
        {
          web_url: "www.baidu.com",
          web_id: "1001",
          create_time: "2021.8.25",
          remarks: "描述",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    browseWeb(row) {
      window.open("http://" + row.web_url);
    },
    addWeb() {
      this.$refs.editWeb.init();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
