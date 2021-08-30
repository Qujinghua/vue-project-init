<template>
  <div class="content">
    <div class="content-title">
      <el-button
        type="primary"
        size="small"
        @click="addWeb"
        :disabled="listData.length > 9"
        >新增用户</el-button
      >
      <span v-if="listData.length > 9"
        >一个站点最多支持10个后台管理员，如需修改配置请联系网站开发人员</span
      >
    </div>
    <div class="content-table">
      <el-table :data="listData" stripe size="mini" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="remarks" label="描述"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delBtn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit-web ref="editWeb" @refresh-list="getList"></edit-web>
  </div>
</template>

<script>
import editWeb from "./editWeb.vue";
import { userList, delUser } from "@/api/user";
export default {
  components: {
    editWeb,
  },
  data() {
    return {
      listData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      userList()
        .then((data) => {
          this.listData = data.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addWeb() {
      this.$refs.editWeb.init();
    },
    delBtn(row) {
      delUser({ id: row.id })
        .then((data) => {
          this.$message({
            type: "success",
            message: data.msg,
          });
          this.getList();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.msg,
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
}
</style>
