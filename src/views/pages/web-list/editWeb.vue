<template>
  <el-drawer
    title="编辑网站"
    size="60%"
    custom-class="web-edit-drawer"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="edit-web">我来啦!</div>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
    };
  },
  methods: {
    init() {
      this.drawer = true;
    },
    handleClose(done) {
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