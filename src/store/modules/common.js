import * as types from '../mutation-types';

const state = {
  roleData: {},
};

const getters = {
  roleData: state => state.roleData, // 获取当前的list
};

const actions = {
  // 获取正在上映的电影
  setRole({ commit }, data) {
    commit('setRole', data);
  },
};

const mutations = {
  setRole(state, data) {
    state.roleData = data; // 改变当前的list
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
