import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}

export function sendCode(data) {
  return request({
    url: "/users/sendCode",
    method: "post",
    data
  });
}

export function codePhoneLogin(data) {
  return request({
    url: "/users/codePhoneLogin",
    method: "post",
    data
  });
}
