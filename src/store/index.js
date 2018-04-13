import Vue from 'vue'
import Vuex from 'vuex'

/**Main Page Modules */
import MainModule from '@/store/modules/MainModule'

/**UserModules */
import UserModule from '@/store/modules/User/UserModule'
import MessageModule from '@/store/modules/User/MessageModule'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main: MainModule,
    user: UserModule,
    message: MessageModule,
  }
})