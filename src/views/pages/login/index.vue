<template>
  <div class="login-container">
    <el-form
      v-if="showChoiceWeb == false"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-User-center"></i>
        </span>
        <el-input
          ref="username"
          size="medium"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-Password"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          size="medium"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.native="checkCapslock"
          @blur="capsTooltip = false"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i
            :class="
              passwordType === 'password'
                ? 'el-icon-Unvisible'
                : 'el-icon-Visible'
            "
          ></i>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
    <div class="choice-web" v-else>
      <p>请选择要进入的网站后台</p>
      <div class="web-list">
        <div
          class="list-item"
          :class="{ active: item.id === nowSelectWeb.id }"
          v-for="item in webListData"
          :key="item.id"
          @click="choiceWebItem(item)"
        >
          {{ item.web_url }}
        </div>
      </div>
      <div class="handle-btn">
        <el-button type="primary" @click="handleChoiceWeb">进入后台</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { webList } from "@/api/webList";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      webListData: [],
      showChoiceWeb: false,
      nowSelectWeb: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              // this.$router.push({
              //   path: this.redirect || "/",
              //   query: this.otherQuery,
              // });
              this.loading = false;
              this.setIntoWeb();
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setIntoWeb() {
      this.showChoiceWeb = true;
      let params = {
        page: 1,
        size: 1000,
      };
      webList(params)
        .then((data) => {
          if (data.data.list.length) {
            this.webListData = data.data.list;
            data.data.list.length &&
              (this.nowSelectWeb = { ...data.data.list[0] });
            window.localStorage.setItem("web_id", this.nowSelectWeb.web_id);
            window.localStorage.setItem("web_url", this.nowSelectWeb.web_url);
          } else {
            this.$router.push({
              path: this.redirect || "/",
              query: this.otherQuery,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    choiceWebItem(item) {
      this.nowSelectWeb = { ...item };
    },
    handleChoiceWeb() {
      window.localStorage.setItem("web_id", this.nowSelectWeb.web_id);
      window.localStorage.setItem("web_url", this.nowSelectWeb.web_url);
      this.$router.push({
        path: this.redirect || "/",
        query: this.otherQuery,
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>
<style lang="scss">
.login-container {
  width: 100%;
  min-height: 100%;
  background-color: #2d3a4b;
  position: relative;
  .login-form,
  .choice-web {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 400px;
    height: 300px;
    .el-form-item {
      position: relative;
      .show-pwd {
        position: absolute;
        top: 3px;
        right: 10px;
        z-index: 1;
      }
      .el-input {
        input {
          padding-left: 30px;
        }
      }
    }
  }
  .choice-web {
    width: 700px;
    height: 455px;
    background-color: #fff;
    border-radius: 3px;
    & > p {
      text-align: center;
      font-size: 20px;
    }
    .web-list {
      padding: 0 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .list-item {
        width: calc(50% - 30px);
        height: 40px;
        border-radius: 3px;
        line-height: 38px;
        border: 1px solid #dcdfe6;
        padding: 0 10px;
        cursor: pointer;
        margin-bottom: 20px;
        &.active {
          background-color: #409eff;
          border: 1px solid #409eff;
          color: #fff;
        }
      }
    }
    .handle-btn {
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
