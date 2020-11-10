import { login, logout } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  removeUserInfo,
} from "@/utils/auth";
import { resetRouter } from "@/router";

const state = {
  token: getToken(),
  userInfo: {},
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = { ...userInfo };
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_USERINFO", data);
          setUserInfo(data);
          commit("SET_TOKEN", response.token);
          setToken(response.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resetRouter();
          removeUserInfo();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
