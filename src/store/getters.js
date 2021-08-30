const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  webListData: (state) => state.webList.webListData
};
export default getters;
