import axios from "@/util/instance";
import qs from "qs";
import config from "@/config";

export default {
  state: {
    messages: [], //当前用户消息提醒数据
    messageCount: 0 //提醒总数
  },
  getters: {
    messages(state) {
      return state.messages;
    },
    messageCount(state) {
      return state.messageCount;
    }
  },
  mutations: {
    changeMessages(state, { count, messages }) {
      state.messages = messages;
    },
    changeMessagesCount(state, count) {
      state.messageCount = count;
    },
    clearMessages(state) {
      state.messages = [];
      state.messageCount = 0;
    }
  },
  actions: {
    async getUnReadMessagesCount({ dispatch, commit }) {
      try {

        const { data } = await axios.get(config.getUnReadMessagesCount);

        const { code, content } = data;

        code == "200" ?
          commit("changeMessagesCount", content) :
          commit("clearMessages");

      } catch (error) {

        commit("clearMessages");

      }
    },
    async getMessages({ dispatch, commit }, param) {
      try {

        const { data } = await axios.post(config.getMessages, qs.stringify(param));

        const { code, content } = data;

        code == "200" ?
          commit("changeMessages", content) :
          commit("clearMessages");

      } catch (error) {

        commit("clearMessages");

      }
    }
  }
};