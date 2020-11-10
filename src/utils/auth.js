import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setUserInfo(data) {
  Object.keys(data).forEach((el) => {
    window.localStorage.setItem(el, data[el]);
  });
}

export function removeUserInfo() {
  window.localStorage.clear();
}
