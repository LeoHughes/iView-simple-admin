import axios from '@/util/instance'
import config from '@/config'

import { Message } from 'iview'

export default {
  state: {
    mainLeftMenu: null, //主页面左侧菜单数据
  },
  getters: {
    mainLeftMenu(state) {
      return state.mainLeftMenu
    }
  },
  mutations: {
    changeMainLeftMenu(state, payload) {
      state.mainLeftMenu = payload
    },
    clearMainLeftMenuData(state) {
      state.mainLeftMenu = null
    }
  },
  actions: {
    async getMainLeftMenu({ dispatch, commit }, token) {

      try {

        const { data } = await axios.get(config.getMainLeftMenu, token)

        const { code, content } = data

        if (code == '200') {

          commit('changeMainLeftMenu', content)

        }

      } catch (error) {

        Message.info('出错了,请稍后再试')

        commit('clearMainLeftMenuData')

      }

    }
  }
}