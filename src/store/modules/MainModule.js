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
    //更新激活的左侧菜单页数据 type: 0新增1删除2删除全部
    updateOpenTabs(state, { type, tabObj }) {

      switch (type) {
        case 0:
          if (_.findIndex(state.openTabs, tabObj) == -1) {
            state.openTabs.push(tabObj)
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