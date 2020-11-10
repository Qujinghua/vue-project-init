import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "首页",
    redirect: "/dashboard",
    component: () => import("@/views/pages/index.vue"),
    children: [
      {
        path: "/dashboard",
        name: "仪表板",
        icon: "el-icon-s-data",
        component: () => import("@/views/pages/dashboard/index.vue"),
      },
      {
        path: "/basic-info",
        name: "基础信息",
        icon: "el-icon-s-operation",
        redirect: "/basic-info/system",
        component: () => import("@/views/pages/basic-info/index.vue"),
        children: [
          {
            path: "/basic-info/system",
            name: "系统信息",
            component: () =>
              import("@/views/pages/basic-info/system/index.vue"),
          },
          {
            path: "/basic-info/user",
            name: "用户信息",
            component: () => import("@/views/pages/basic-info/user/index.vue"),
          },
        ],
      },
      {
        path: "/setup",
        name: "设置",
        icon: "el-icon-setting",
        redirect: "/setup/system",
        component: () => import("@/views/pages/setup/index.vue"),
        children: [
          {
            path: "/setup/system",
            name: "系统设置",
            component: () => import("@/views/pages//setup/system/index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/pages/login/index.vue"),
    hidden: true,
  },
];

const router = new VueRouter({
  routes,
});

export function resetRouter() {
  const newRouter = router;
  router.matcher = newRouter.matcher; // reset router
}

export default router;
