import axios from '@/util/instance'
import config from '@/config'
import _ from 'lodash'
import { Message } from 'iview'

export default {
  state: {
    mainLeftMenu: null, //主页面左侧菜单数据
    openTabs: [], //激活的左侧菜单页
    activeTab: null, //当前查看的左侧菜单页
  },
  getters: {
    mainLeftMenu(state) {
      return state.mainLeftMenu
    },
    menuItemList(state) {
      return state.menuItemList
    },
    openTabs(state) {
      return state.openTabs
    },
    activeTab(state) {
      return state.activeTab
    }
  },
  mutations: {
    changeMainLeftMenu(state, payload) {
      state.mainLeftMenu = payload
    },
    clearMainLeftMenuData(state) {
      state.mainLeftMenu = null
    },
    //所有可访问子菜单数据
    changeMenuItemList(state, payload) {
      state.menuItemList = payload
    },
    //更新激活的左侧菜单页数据 type: 0新增1删除2删除全部
    updateOpenTabs(state, { type, tabObj }) {
      let index = _.findIndex(state.openTabs, tabObj)

      switch (type) {
        case 0:
          if (index == -1) {
            state.openTabs.push(tabObj)
          }
          break
        case 1:
          if (index !== -1) {
            state.openTabs.splice(index, 1)

            if (state.openTabs.length !== 0) {

              let preTab = state.openTabs[state.openTabs.length - 1]

              if (preTab.name !== state.activeTab.name) state.activeTab = preTab

            } else {
              state.activeTab = null
            }
          }
          break
      }
    },
    //更新当前查看的左侧菜单页数据
    updateActiveTab(state, payload) {
      state.activeTab = payload
    }
  },
  actions: {
    async getMainLeftMenu({ dispatch, commit }, token) {

      try {

        const { data } = await axios.get(config.getMainLeftMenu, token)

        const { code, content } = data

        code == '200' ? commit('changeMainLeftMenu', content) : commit('clearMainLeftMenuData')

      } catch (error) {

        commit('clearMainLeftMenuData')

      }

    }
  }
}