import { Message } from 'iview'
import axios from '@/util/instance'
import qs from 'qs'
import config from '@/config'

export default {
  state: {
    messages: [], //当前用户消息提醒数据
  },
  getters: {
    messages(state) {
      return state.messages
    }
  },
  mutations: {
    changeMessages(state, payload) {
      state.messages = payload
    }
  },
  actions: {
    async getMessages({ dispatch, commit }, { token, type }) {

      try {

        const param = {
          token,
          type
        }

        const { content } = await axios.post(config.getMessages, qs.stringify(param))

        console.log(content);

      } catch (error) {



      }



    }
  }
}