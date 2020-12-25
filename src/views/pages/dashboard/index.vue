<template>
  <div>
    <flow-panel
      ref="flowPanel"
      :dataSourceNode="dataSourceNode"
      :baseModelNode="baseModelNode"
    ></flow-panel>
  </div>
</template>
<script>
import FlowPanel from "@/components/ef/panel";
import mockData from "./mockData";
export default {
  components: {
    FlowPanel,
  },
  data() {
    return {
      dataSourceNode: [],
      baseModelNode: [],
    };
  },
  mounted() {
    this.getData();
    this.getDataSourceNode();
    this.getBaseModelNode();
  },
  methods: {
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
          },
          {
            id: "32",
            type: "basicModel",
            nodeType: "basicModel",
            name: "基础模型2",
            ico: "el-icon-shopping-cart-full",
            // 自定义覆盖样式
            style: {},
          },
          {
            id: "33",
            type: "basicModel",
            nodeType: "basicModel",
            name: "基础模型3",
            ico: "el-icon-shopping-cart-full",
            // 自定义覆盖样式
            style: {},
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
  },
};
</script>