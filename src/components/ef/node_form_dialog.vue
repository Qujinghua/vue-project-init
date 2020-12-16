<template>
  <el-dialog
    :title="type == 'node' ? '修改名称' : '修改条件'"
    :visible="dialogVisible"
    width="30%"
    @close="handleClose"
  >
    <div class="ef-node-form">
      <div class="ef-node-form-body">
        <el-form
          :model="node"
          ref="dataForm"
          label-width="80px"
          v-show="type === 'node'"
        >
          <el-form-item label="名称">
            <el-input v-model="node.name"></el-input>
          </el-form-item>
          <el-form-item label="left坐标">
            <el-input v-model="node.left" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="top坐标">
            <el-input v-model="node.top" :disabled="true"></el-input>
          </el-form-item>
        </el-form>

        <el-form
          :model="line"
          ref="dataForm"
          label-width="80px"
          v-show="type === 'line'"
        >
          <el-form-item label="条件">
            <el-input v-model="line.label"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="saveBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      visible: true,
      dialogVisible: false,
      // node 或 line
      type: "node",
      node: {},
      line: {},
      data: {},
      stateList: [
        {
          state: "success",
          label: "成功",
        },
        {
          state: "warning",
          label: "警告",
        },
        {
          state: "error",
          label: "错误",
        },
        {
          state: "running",
          label: "运行中",
        },
      ],
    };
  },
  methods: {
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      this.type = "node";
      this.data = data;
      data.nodeList.filter((node) => {
        if (node.id === id) {
          this.node = cloneDeep(node);
        }
      });
      this.dialogVisible = true;
    },
    lineInit(line) {
      this.type = "line";
      this.line = line;
      this.dialogVisible = true;
    },
    saveBtn() {
      if (this.type == "node") {
        this.save();
      } else {
        this.saveLine();
      }
      this.handleClose();
      this.$message({
        type: "success",
        message: "修改成功",
      });
    },
    // 修改连线
    saveLine() {
      this.$emit("setLineLabel", this.line.from, this.line.to, this.line.label);
    },
    save() {
      this.data.nodeList.filter((node) => {
        if (node.id === this.node.id) {
          node.name = this.node.name;
          node.left = this.node.left;
          node.top = this.node.top;
          node.ico = this.node.ico;
          node.state = this.node.state;
          this.$emit("repaintEverything");
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
</style>
