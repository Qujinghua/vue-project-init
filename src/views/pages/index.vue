<template>
  <el-container class="el-container">
    <el-aside class="el-menu-vertical-demo" :collapse="isCollapse">
      <div class="breadcrumb-container">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :class="{ 'el-menu-vertical-close': isCollapse }"
          router
          :collapse="isCollapse"
        >
          <el-menu-item index="0" class="el-menu-logo">
            <a href="javascript:;">
              <!-- <img :src="logo" /> -->
              LOGO
            </a>
          </el-menu-item>
          <div
            class="breadcrumb-container-menu"
            v-for="menuItem in menuLists"
            :key="menuItem.path"
          >
            <el-submenu
              v-if="menuItem.children && menuItem.children.length > 0"
              :index="menuItem.path"
            >
              <template slot="title">
                <i :class="menuItem.icon"></i>
                <span>{{ menuItem.name }}</span>
              </template>
              <div v-for="menuItem2 in menuItem.children" :key="menuItem2.path">
                <el-submenu
                  v-if="menuItem2.children && menuItem2.children.length > 0"
                  :index="menuItem2.path"
                >
                  <template slot="title">
                    <i :class="menuItem2.icon"></i>
                    <span>{{ menuItem2.name }}</span>
                  </template>
                  <el-menu-item
                    v-for="menuItem3 in menuItem2.children"
                    :key="menuItem3.path"
                    :index="menuItem3.path"
                    >{{ menuItem3.name }}</el-menu-item
                  >
                </el-submenu>
                <el-menu-item :index="menuItem2.path">
                  <span slot="title">{{ menuItem2.name }}</span>
                </el-menu-item>
              </div>
            </el-submenu>
            <el-menu-item v-else :index="menuItem.path">
              <i :class="menuItem.icon"></i>
              <span slot="title">{{ menuItem.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header class="el-header">
        <div class="el-header-collapse" @click="collapseChange">
          <i class="el-icon-menu"></i>
        </div>
        <div class="el-header-right">
          <div class="el-header-right-user">
            <el-dropdown>
              <el-link type="text" :underline="false">
                <i class="el-icon-user-solid"></i>
                <span>{{ userInfo.name || userName }}</span>
              </el-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">
                  <span style="text-align: center; display: block">
                    退出登录
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main class="el-main">
        <div class="el-main-breadcrumb">
          <el-breadcrumb
            v-if="lists.length > 1"
            separator-class="el-icon-arrow-right"
          >
            <el-breadcrumb-item
              v-for="item in lists"
              :key="item.name"
              :to="{ path: item.path }"
            >
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="el-main-info">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
function generateRoutes(routes) {
  let res = [];
  for (const router of routes) {
    if (router.hidden) {
      continue;
    }
    if (router.children) {
      const tempRoutes = generateRoutes(router.children);
      if (tempRoutes.length >= 1) {
        router.children = tempRoutes;
        res.push(router);
      }
    } else {
      res.push(router);
    }
  }
  return res;
}
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    defaultActive() {
      return this.$route.path;
    },
    logo() {
      return this.isCollapse
        ? "../../assets/logo.png"
        : "../../assets/logo.png";
    },
    menuLists() {
      return generateRoutes(this.$router.options.routes[0].children);
    },
    userName() {
      return window.localStorage.getItem("name");
    },
    lists() {
      const routers = this.$route.matched.map((_) => {
        return {
          name: _.name,
          path: _.path,
        };
      });
      console.log(routers);
      routers.shift();
      return routers;
    },
  },
  methods: {
    collapseChange() {
      this.isCollapse = !this.isCollapse;
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>
<style lang="scss">
.el-menu--collapse > .el-menu-item span,
.el-menu--collapse > .el-submenu > .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-container {
  height: 100vh;
  .breadcrumb-container {
    height: 100%;
    .el-menu-vertical-demo {
      height: 100%;
    }
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    height: 56px;
    background: #fff;
    padding: 0;
    border-bottom: 1px solid #e6e6e6;
    &-collapse {
      color: #b3b3b3;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      border-right: 1px solid #e6e6e6;
    }
    &-right {
      display: flex;
      align-items: center;
      &-user {
        width: 100px;
        text-align: center;
        .el-link--inner {
          i {
            margin-top: -1px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .el-main {
    padding-top: 24px;
    background-color: #f0f2f5;
    &-breadcrumb {
      height: 50px;
      display: flex;
      align-items: center;
      background-color: #fff;
      padding-left: 24px;
      .el-breadcrumb {
        font-size: 14px;
      }
    }
    &-info {
      padding: 24px;
      & > div {
        background-color: #fff;
      }
    }
  }
}
</style>
