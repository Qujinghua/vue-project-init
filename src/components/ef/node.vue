<template>
  <div
    ref="node"
    :style="nodeContainerStyle"
    @dblclick="dbClickNode"
    @click="clickNode"
    @mouseup="changeNodeSite"
    :class="nodeContainerClass"
    @contextmenu.prevent="rightMenuClick"
  >
    <!-- 最左侧的那条竖线 -->
    <!-- <div class="ef-node-left"></div> -->
    <!-- 节点类型的图标 -->
    <!-- <div class="ef-node-left-ico flow-node-drag">
      <i :class="nodeIcoClass"></i>
    </div> -->
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true">
      {{ node.name }}
    </div>
    <span class="ef-node-tip ef-node-tip-top flow-node-drag"></span>
    <span class="ef-node-tip ef-node-tip-right flow-node-drag"></span>
    <span class="ef-node-tip ef-node-tip-bottom flow-node-drag"></span>
    <span class="ef-node-tip ef-node-tip-left flow-node-drag"></span>
    <!-- 节点状态图标 -->
    <!-- <div class="ef-node-right-ico">
      <i
        class="el-icon-circle-check el-node-state-success"
        v-show="node.state === 'success'"
      ></i>
      <i
        class="el-icon-circle-close el-node-state-error"
        v-show="node.state === 'error'"
      ></i>
      <i
        class="el-icon-warning-outline el-node-state-warning"
        v-show="node.state === 'warning'"
      ></i>
      <i
        class="el-icon-loading el-node-state-running"
        v-show="node.state === 'running'"
      ></i>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    node: Object,
    activeElement: Object,
  },
  data() {
    return {};
  },
  //   directives: {
  //     rightMenu: {
  //       bind(el, binding, vnode, oldNode) {
  //         // console.log(el, binding, vnode, oldNode);
  //         console.log(el, binding, vnode, oldNode);
  //         let self = vnode.context;
  //         if (!binding) {
  //           return;
  //         }
  //         el.bind("contextmenu", function (e) {
  //           console.log(e);
  //           return false;
  //         });
  //         el.onmousedown = (e) => {
  //           //  鼠标按下，计算当前原始距离可视区的高度
  //           let disX = e.clientX;
  //           let disY = e.clientY;
  //           el.style.cursor = "move";
  //           if (e.button == 2) {
  //             // 鼠标右键
  //             let nodeParams = {
  //               rightMenuX: disX,
  //               rightMenuY: disY,
  //             };
  //             self.nodeRightMenu(nodeParams);
  //             return false;
  //           }

  //           document.onmouseup = function (e) {
  //             console.log(e);
  //             // self.rightMenuShow = false;
  //           };
  //         };
  //       },
  //     },
  //   },
  computed: {
    nodeContainerClass() {
      return {
        "ef-node-container": true,
        "ef-node-active":
          this.activeElement.type == "node"
            ? this.activeElement.nodeId === this.node.id
            : false,
        "node-start": this.node.nodeType == "start" ? true : false,
        "node-judge": this.node.nodeType == "judge" ? true : false,
        "node-end": this.node.nodeType == "end" ? true : false,
        "node-dataSource": this.node.nodeType == "dataSource" ? true : false,
        "node-basicModel": this.node.nodeType == "basicModel" ? true : false,
      };
    },
    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top,
        left: this.node.left,
      };
    },
    nodeIcoClass() {
      var nodeIcoClass = {};
      nodeIcoClass[this.node.ico] = true;
      // 添加该class可以推拽连线出来，viewOnly 可以控制节点是否运行编辑
      nodeIcoClass["flow-node-drag"] = this.node.viewOnly ? false : true;
      return nodeIcoClass;
    },
  },
  methods: {
    // 点击节点
    clickNode() {
      this.$emit("clickNode", this.node.id);
    },
    dbClickNode() {
      this.$emit("dbClickNode", this.node.id);
    },
    rightMenuClick() {
      //   this.$refs.node.onmousedown = (e) => {
      //     console.log(e.clientX, e.clientY);
      //     let nodeParams = {
      //       nodeId: this.node.id,
      //       rightMenuX: e.clientX,
      //       rightMenuY: e.clientY,
      //     };
      //     this.$emit("nodeRightMenu", nodeParams);
      //   };
    },
    // nodeRightMenu(params) {
    //   let nodeParams = { ...{ nodeId: this.node.id }, ...params };
    //   this.$emit("nodeRightMenu", nodeParams);
    // },
    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      if (
        this.node.left == this.$refs.node.style.left &&
        this.node.top == this.$refs.node.style.top
      ) {
        return;
      }
      this.$emit("changeNodeSite", {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top,
      });
    },
  },
};
</script>
