import Mock from "mockjs"; // 引入mockjs

let loginData = {
  data: {
    name: "admin123",
  },
  token: "admin",
  code: 1000,
};

Mock.mock("/user/login", "post", loginData); // 根据数据模板生成模拟数据

let logoutData = {
  data: {
    name: "admin123",
  },
  token: "admin",
  code: 1000,
};
Mock.mock("/user/logout", "post", logoutData);
