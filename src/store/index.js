import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from '@/store/modules/UserModule'
import MenuModule from '@/store/modules/MenuModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: UserModule,
    menu: MenuModule
  }
})