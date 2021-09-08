import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "首页",
    redirect: "/title-key-desc",
    component: () => import("@/views/pages/index.vue"),
    children: [
      // {
      //   path: "/dashboard",
      //   name: "仪表盘",
      //   icon: "el-icon-s-data",
      //   component: () => import("@/views/pages/dashboard/index.vue"),
      // },
      {
        path: "/title-key-desc",
        name: "标题/描述/关键字",
        icon: "el-icon-s-help",
        component: () => import("@/views/pages/title-key-desc/index.vue"),
      },
      // {
      //   path: "/header-img",
      //   name: "商标管理",
      //   icon: "el-icon-s-flag",
      //   component: () => import("@/views/pages/header-img/index.vue"),
      // },
      {
        path: "/main-img",
        name: "主图管理",
        icon: "el-icon-picture",
        component: () => import("@/views/pages/main-img/index.vue"),
      },
      {
        path: "/news-center",
        name: "新闻中心",
        icon: "el-icon-news",
        component: () => import("@/views/pages/news-center/index.vue"),
      },
      {
        path: "/game-classify",
        name: "游戏分类",
        icon: "el-icon-aim",
        component: () => import("@/views/pages/game-classify/index.vue"),
      },
      {
        path: "/game-detail",
        name: "游戏详情",
        icon: "el-icon-tickets",
        component: () => import("@/views/pages/game-detail/index.vue"),
      },
      {
        path: "/footer-bar",
        name: "底栏管理",
        icon: "el-icon-location",
        component: () => import("@/views/pages/footer-bar/index.vue"),
      },
      {
        path: "/basic-info",
        name: "系统管理",
        icon: "el-icon-s-operation",
        redirect: "/basic-info/system",
        component: () => import("@/views/pages/basic-info/index.vue"),
        children: [
          {
            path: "/basic-info/user",
            name: "管理员",
            component: () => import("@/views/pages/basic-info/user/index.vue"),
          },
        ],
      },
      // {
      //   path: "/setup",
      //   name: "设置",
      //   icon: "el-icon-setting",
      //   redirect: "/setup/system",
      //   component: () => import("@/views/pages/setup/index.vue"),
      //   children: [
      //     {
      //       path: "/setup/system",
      //       name: "系统设置",
      //       component: () => import("@/views/pages//setup/system/index.vue"),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/pages/login/index.vue"),
    hidden: true,
  },
];

if (window.localStorage.getItem('username') === 'super_top_admin') {
  routes[0].children.unshift(
    {
      path: "/web-list",
      name: "网站列表",
      icon: "el-icon-more",
      component: () => import("@/views/pages/web-list/index.vue"),
    }
  )
}

const router = new VueRouter({
  routes,
});

export function resetRouter() {
  const newRouter = router;
  router.matcher = newRouter.matcher; // reset router
}

export default router;
