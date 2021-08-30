import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/users/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/users/logout",
    method: "post",
  });
}

export function userList(data) {
  return request({
    url: "/users/list",
    method: "get",
    params: data,
  });
}

export function addUser(data) {
  return request({
    url: "/users/add",
    method: "post",
    data
  });
}

export function delUser(data) {
  return request({
    url: "/users/del",
    method: "post",
    data
  });
}

// export function sendCode(data) {
//   return request({
//     url: "/users/sendCode",
//     method: "post",
//     data
//   });
// }

// export function codePhoneLogin(data) {
//   return request({
//     url: "/users/codePhoneLogin",
//     method: "post",
//     data
//   });
// }
