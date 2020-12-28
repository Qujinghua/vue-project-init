<template>
  <div class="play-model">
    <flow-panel
      ref="flowPanel"
      :dataSourceNode="dataSourceNode"
      :baseModelNode="baseModelNode"
      @triggerPlay="triggerPlay"
    ></flow-panel>
    <div class="play-model-log" v-if="modelLogShow">
      <div class="play-model-log-close" @click="closeModelLog">
        <i class="el-icon-circle-close"></i>
      </div>
      <p class="play-model-log-title">运行日志</p>
      <div class="play-model-log-content">这是运行日志</div>
    </div>
  </div>
</template>
<script>
import FlowPanel from "@/components/modelLayout/panel";
import mockData from "./mockData";
export default {
  components: {
    FlowPanel,
  },
  data() {
    return {
      dataSourceNode: [],
      baseModelNode: [],
      modelLogShow: false,
    };
  },
  mounted() {
    this.getData();
    this.getDataSourceNode();
    this.getBaseModelNode();
  },
  methods: {
    triggerPlay(data) {
      console.log(data);
      setTimeout(() => {
        this.modelLogShow = true;
      }, 1000);
    },
    getData() {
      setTimeout(() => {
        this.$refs.flowPanel.initData(mockData);
      }, 1000);
    },
    getDataSourceNode() {
      setTimeout(() => {
        this.dataSourceNode = [
          {
            id: "21",
            type: "dataSource",
            nodeType: "dataSource",
            name: "数据源1",
            ico: "el-icon-coin",
            // 自定义覆盖样式
            style: {},
          },
          {
            id: "22",
            type: "dataSource",
            nodeType: "dataSource",
            name: "数据源2",
            ico: "el-icon-coin",
            // 自定义覆盖样式
            style: {},
          },
          {
            id: "23",
            type: "dataSource",
            nodeType: "dataSource",
            name: "数据源3",
            ico: "el-icon-coin",
            // 自定义覆盖样式
            style: {},
          },
        ];
      }, 1000);
    },
    getBaseModelNode() {
      setTimeout(() => {
        this.baseModelNode = [
          {
            id: "31",
            type: "basicModel",
            nodeType: "basicModel",
            name: "基础模型1",
            ico: "el-icon-shopping-cart-full",
            // 自定义覆盖样式
            style: {},
            childDataSourceId: "21",
            attr: {
              algorithmParam: {
                jobName: "",
                launcherHost: "",
                jobId: "",
                ruleId: "",
                dataGovernanceHost: "",
                dataServerSeconds: "",
              },
              environmentVariable: {
                type: "Java",
                "num-executors": "",
                SPARK_HOME: "",
                "executor-memory": "",
                "executor-cores": "",
              },
            },
          },
          {
            id: "32",
            type: "basicModel",
            nodeType: "basicModel",
            name: "基础模型2",
            ico: "el-icon-shopping-cart-full",
            // 自定义覆盖样式
            style: {},
            childDataSourceId: "22",
            attr: {
              algorithmParam: {
                jobName: "",
                launcherHost: "",
                jobId: "",
                ruleId: "",
                dataGovernanceHost: "",
                dataServerSeconds: "",
              },
              environmentVariable: {
                type: "Python",
                "num-executors": "",
                SPARK_HOME: "",
                "executor-memory": "",
                "executor-cores": "",
              },
            },
          },
          {
            id: "33",
            type: "basicModel",
            nodeType: "basicModel",
            name: "基础模型3",
            ico: "el-icon-shopping-cart-full",
            // 自定义覆盖样式
            style: {},
            childDataSourceId: "23",
            attr: {
              algorithmParam: {
                jobName: "",
                launcherHost: "",
                jobId: "",
                ruleId: "",
                dataGovernanceHost: "",
                dataServerSeconds: "",
              },
              environmentVariable: {
                type: "Spark",
                "num-executors": "",
                SPARK_HOME: "",
                "executor-memory": "",
                "executor-cores": "",
              },
            },
          },
          {
            id: "34",
            type: "basicModel",
            nodeType: "basicModel",
            name: "基础模型4",
            ico: "el-icon-shopping-cart-full",
            // 自定义覆盖样式
            style: {},
          },
        ];
      }, 1000);
    },
    closeModelLog() {
      this.modelLogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.play-model {
  background-color: #fff;
  position: relative;
  &-log {
    position: absolute;
    top: 500px;
    left: 230px;
    width: calc(100% - 230px);
    height: 435px;
    overflow: auto;
    border: 1px solid #dadce0;
    background-color: #f0f2f5;
    &-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>