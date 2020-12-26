<template>
  <div class="flow-menu" ref="tool">
    <div v-for="menu in menuList" :key="menu.id">
      <span class="ef-node-pmenu" @click="menu.open = !menu.open"
        ><i
          :class="{
            'el-icon-caret-bottom': menu.open,
            'el-icon-caret-right': !menu.open,
          }"
        ></i
        >&nbsp;{{ menu.name }}</span
      >
      <ul v-show="menu.open" class="ef-node-menu-ul">
        <draggable
          @end="end"
          @start="move"
          v-model="menu.children"
          :options="draggableOptions"
        >
          <li
            v-for="subMenu in menu.children"
            class="ef-node-menu-li"
            :class="'ef-node-menu-li-' + subMenu.type"
            :key="subMenu.id"
            :id="subMenu.id"
            :type="subMenu.type"
          >
            <i :class="subMenu.ico"></i> {{ subMenu.name }}
          </li>
        </draggable>
      </ul>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

var mousePosition = {
  left: -1,
  top: -1,
};

export default {
  props: {
    dataSourceNode: Array,
    baseModelNode: Array,
  },
  data() {
    return {
      activeNames: "1",
      // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: "tt",
        // 不使用H5原生的配置
        forceFallback: true,
        // 拖拽的时候样式
        // fallbackClass: 'flow-node-draggable'
      },
      // 默认打开的左侧菜单的id
      defaultOpeneds: ["1", "2"],
      menuList: [
        {
          id: "1",
          type: "group",
          name: "流程节点",
          ico: "el-icon-video-play",
          open: true,
          children: [
            {
              id: "11",
              type: "start",
              nodeType: "start",
              name: "开始",
              ico: "el-icon-help",
              // 自定义覆盖样式
              style: {},
            },
            {
              id: "12",
              type: "judge",
              nodeType: "judge",
              name: "判定",
              ico: "el-icon-time",
              // 自定义覆盖样式
              style: {},
            },
            {
              id: "13",
              type: "end",
              nodeType: "end",
              name: "结束",
              ico: "el-icon-c-scale-to-original",
              // 自定义覆盖样式
              style: {},
            },
          ],
        },
        {
          id: "2",
          type: "group",
          name: "数据源",
          ico: "el-icon-video-pause",
          open: true,
          children: [],
        },
        {
          id: "3",
          type: "group",
          name: "基础模型",
          ico: "el-icon-video-pause",
          open: true,
          children: [
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
          ],
        },
        {
          id: "4",
          type: "group",
          name: "运行环境",
          ico: "el-icon-video-pause",
          open: true,
          children: [
            {
              id: "41",
              type: "functionLanguage",
              nodeType: "functionLanguage",
              name: "Java",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {},
            },
            {
              id: "42",
              type: "functionLanguage",
              nodeType: "functionLanguage",
              name: "Python",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {},
            },
            {
              id: "43",
              type: "functionLanguage",
              nodeType: "functionLanguage",
              name: "Spark",
              ico: "el-icon-shopping-cart-full",
              // 自定义覆盖样式
              style: {},
            },
          ],
        },
      ],
      nodeMenu: {},
    };
  },
  watch: {
    dataSourceNode: {
      handler(val) {
        this.menuList[1].children = val;
      },
      deep: true,
      immediate: true,
    },
    baseModelNode: {
      handler(val) {
        this.menuList[2].children = val;
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    draggable,
  },
  created() {
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function (event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        mousePosition.left = event.layerX;
        mousePosition.top = event.clientY - 50;
        event.preventDefault();
        event.stopPropagation();
      };
    }
  },
  methods: {
    // 根据类型获取左侧菜单对象
    getMenuByType(id) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children;
        for (let j = 0; j < children.length; j++) {
          if (children[j].id === id) {
            return children[j];
          }
        }
      }
    },
    // 拖拽开始时触发
    move(evt, a, b, c) {
      console.log(a, b, c);
      var id = evt.item.attributes.id.nodeValue;
      this.nodeMenu = this.getMenuByType(id);
    },
    // 拖拽结束时触发
    end(evt, e) {
      console.log(e);
      this.$emit("addNode", evt, this.nodeMenu, mousePosition);
    },
    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") > -1) {
        return true;
      }
      return false;
    },
  },
};
</script>
