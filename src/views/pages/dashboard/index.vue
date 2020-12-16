<template>
  <div>
    <flow-panel ref="flowPanel" :processData="processData"></flow-panel>
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
      processData: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      setTimeout(() => {
        this.$refs.flowPanel.initData(mockData);
      }, 1000);
    },
  },
};
</script>