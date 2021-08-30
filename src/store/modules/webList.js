import { webList } from "@/api/webList";

const state = {
  webListData: [],
};

const mutations = {
  SET_WEB_LIST: (state, webListData) => {
    state.webListData = webListData;
  }
};

const actions = {
  setWebList({ commit }, searchParams) {
    return new Promise((resolve, reject) => {
      webList(searchParams)
        .then((response) => {
          commit("SET_WEB_LIST", response.data.list);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
