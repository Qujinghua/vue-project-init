<template>
  <div>
    <el-input v-model="phone" placeholder="请输入手机号"></el-input>
    <el-button @click="getCode">获取验证码</el-button>
    <br />
    <el-input v-model="code" placeholder="请输入验证码"></el-input>
    <el-button @click="codePhoneLogin">创建</el-button>
  </div>
</template>
<script>
import { sendCode, codePhoneLogin } from "@/api/user";
export default {
  data() {
    return {
      phone: "",
      code: "",
    };
  },
  mounted() {},
  methods: {
    getCode() {
      let params = {
        phone: this.phone,
      };
      sendCode(params)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    codePhoneLogin() {
      let params = {
        phone: this.phone,
        code: this.code,
      };
      codePhoneLogin(params)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
