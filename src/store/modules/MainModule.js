import axios from "@/util/instance";
import config from "@/config";
import _ from "lodash";

export default {
  state: {
    mainLeftMenu: null, //主页面左侧菜单数据
    openTabs: [{
      path: "/",
      name: "Home",
      title: '主页'
    }], //激活的左侧菜单页
    activeTab: {
      path: "/",
      name: "Home",
      title: '主页'
    } //当前查看的左侧菜单页
  },
  getters: {
    mainLeftMenu(state) {
      return state.mainLeftMenu;
    },
    openTabs(state) {
      return state.openTabs;
    },
    activeTab(state) {
      return state.activeTab;
    }
  },
  mutations: {
    changeMainLeftMenu(state, payload) {
      state.mainLeftMenu = payload;
    },
    clearMainLeftMenuData(state) {
      state.mainLeftMenu = null;
    },
    //更新激活的左侧菜单页数据 type: 0新增1删除2删除全部
    updateOpenTabs(state, { type, tabObj }) {
      let index = _.findIndex(state.openTabs, tabObj);

      switch (type) {
        case 0:
          if (index == -1) {
            state.openTabs.push(tabObj);
          }
          break;
        case 1:
          if (index !== -1) {
            state.openTabs.splice(index, 1);

            if (_.findIndex(state.openTabs, state.activeTab) == -1) {
              let preTab = state.openTabs[state.openTabs.length - 1];

              if (preTab.name !== state.activeTab.name) {
                state.activeTab = preTab;
              }
            }
          }
          break;
        case 2:
          state.openTabs = [].concat(state.openTabs[0]);
          break;
      }
    },
    //更新当前查看的左侧菜单页数据
    updateActiveTab(state, payload) {
      state.activeTab = payload;
    }
  },
  actions: {
    async getMainLeftMenu({ dispatch, commit }, token) {
      try {
        const { data } = await axios.get(config.getMainLeftMenu, token);

        const { code, content } = data;

        code == "200" ?
          commit("changeMainLeftMenu", content) :
          commit("clearMainLeftMenuData");
      } catch (error) {
        commit("clearMainLeftMenuData");
      }
    }
  }
};