<template>
  <div>
    <div class="ef-node-form">
      <div class="ef-node-form-header">编辑</div>
      <div class="ef-node-form-body">
        <div class="ef-node-form-body-node" v-show="type === 'node'">
          <el-form :model="node" ref="dataForm" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="node.name" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="left坐标">
              <el-input
                v-model="node.left"
                :disabled="true"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="top坐标">
              <el-input
                v-model="node.top"
                :disabled="true"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="form-btn">
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
        <div class="ef-node-form-body-line" v-show="type === 'line'">
          <el-form :model="line" ref="dataForm" label-width="80px">
            <el-form-item label="条件">
              <el-input v-model="line.label" size="mini"></el-input>
            </el-form-item>
          </el-form>
          <div class="form-btn">
            <el-button type="primary" @click="saveLine">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      visible: true,
      // node 或 line
      type: "node",
      node: {},
      line: {},
      data: {},
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
    },
    lineInit(line) {
      this.type = "line";
      this.line = line;
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
          this.$emit("repaintEverything");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.ef-node-form {
  .form-btn {
    margin-top: 30px;
    margin-left: 80px;
  }
}
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
