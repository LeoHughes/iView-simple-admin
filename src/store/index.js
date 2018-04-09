import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './modules/UserModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: UserModule
  }
})