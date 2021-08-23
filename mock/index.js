import Mock from "mockjs"; // 引入mockjs

let loginData = {
  data: {
    name: "admin123",
  },
  token: "admin",
  code: 200,
};

Mock.mock("/api/user/login", "post", loginData); // 根据数据模板生成模拟数据

let logoutData = {
  data: {
    name: "admin123",
  },
  token: "admin",
  code: 200,
};
Mock.mock("/api/user/logout", "post", logoutData);
