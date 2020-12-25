<template>
  <div>
    <div class="ef-node-form">
      <div class="ef-node-form-header">编辑</div>
      <div class="ef-node-form-body" v-if="visible">
        <p>1、算法参数</p>
        <el-form
          :model="nodeModelAttr"
          ref="dataForm"
          label-width="150px"
          v-show="type === 'node'"
        >
          <el-form-item
            v-for="item in algorithmParamArr"
            :key="item.label"
            :label="item.label"
          >
            <el-input
              size="mini"
              v-model="nodeModelAttr.algorithmParam[item.label]"
            ></el-input>
          </el-form-item>
        </el-form>
        <p>2、环境变量参数</p>
        <!-- <div class="environment-variable-type">
          <i class="el-icon-set-up"></i>
          <span>{{ nodeModelAttr.environmentVariable.type }}</span>
        </div> -->
        <el-form
          :model="nodeModelAttr"
          ref="dataForm"
          label-width="150px"
          v-show="type === 'node'"
        >
          <el-form-item
            v-for="item in environmentVariableArr"
            :key="item.label"
            :label="item.label === 'type' ? '环境变量' : item.label"
          >
            <el-input
              size="mini"
              :disabled="item.label === 'type'"
              v-model="nodeModelAttr.environmentVariable[item.label]"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--            <div class="el-node-form-tag"></div>-->
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      visible: false,
      // node 或 line
      type: "node",
      node: {},
      nodeModelAttr: {
        algorithmParam: {},
        environmentVariable: {},
      },
      algorithmParamArr: [],
      environmentVariableArr: [],
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
      this.visible = true;
      this.type = "node";
      this.data = data;
      data.nodeList.filter((node) => {
        if (node.id === id) {
          this.nodeModelAttr = cloneDeep(node.attr);
          this.node = cloneDeep(node);
        }
      });
      console.log(data, id, this.nodeModelAttr);
      this.algorithmParamArr = [];
      Object.keys(this.nodeModelAttr.algorithmParam).forEach((el) => {
        let item = {
          label: el,
          value: this.nodeModelAttr.algorithmParam[el],
        };
        this.algorithmParamArr.push(item);
      });
      this.environmentVariableArr = [];
      Object.keys(this.nodeModelAttr.environmentVariable).forEach((el) => {
        let item = {
          label: el,
          value: this.nodeModelAttr.environmentVariable[el],
        };
        this.environmentVariableArr.push(item);
      });
      console.log(this.algorithmParamArr, this.environmentVariableArr);
    },
    save() {
      this.data.nodeList.filter((node) => {
        if (node.id === this.node.id) {
          node.attr = { ...this.nodeModelAttr };
          this.$emit("repaintEverything");
          this.$message.success("保存成功");
        }
      });
    },
  },
};
</script>

<style lang="scss">
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
.ef-node-form {
  .ef-node-form-body {
    padding: 10px;
    background-color: #fff;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
