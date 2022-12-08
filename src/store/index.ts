import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    header: {},
    footer: {},
    page: {},
    blogPost: {}
  },
  getters: {
    header: state => state.header,
    footer: state => state.footer,
    page: state => state.page,
    blogPost: state => state.blogPost
  },
  mutations: {
    settingHeader(state, data) {
      state.header = data;
    },
    settingFooter(state, data) {
      state.footer = data;
    },
    settingPage(state, data) {
      state.page = data;
    },
    settingBlogpost(state, data) {
      state.blogPost = data;
    }
  },
  actions: {
    setHeader({ commit }, payload) {
      commit('settingHeader', payload);
    },
    setFooter({ commit }, payload) {
      commit('settingFooter', payload);
    },
    setPage({ commit }, payload) {
      commit('settingPage', payload);
    },
    setBlogpost({ commit }, payload) {
      commit('settingBlogpost', payload);
    }
  }
});

export default store;