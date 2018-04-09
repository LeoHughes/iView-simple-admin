import axios from '@/util/instance'
import qs from 'qs'
import config from '@/config'
import { mapRoutes } from '@/router/util'


export default {
  state: {
    authToken: localStorage.getItem(config.token) || null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null, //用户信息
    roles: null //权限信息
  },
  getters: {
    token(state) {
      return state.authToken
    },
    userInfo(state) {
      return state.userInfo
    },
    roles(state) {
      return state.roles
    }
  },
  mutations: {
    //变更token数据
    changeToken(state, payload) {
      state.authToken = payload
    },
    //变更用户信息数据
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    //变更用户权限数据
    changeRoles(state, payload) {
      state.roles = payload
    }
  },
  actions: {
    //根据用户名密码获取用户信息及token
    async login({ dispatch, commit }, { userName, passWord }) {

      try {

        const param = {
          userName,
          passWord
        }

        //发起登录请求
        const { data } = await axios.post(config.login, qs.stringify(param))

        const { code, content } = data

        //变更用户信息数据
        if (code == '200' && content) {

          commit('changeUserInfo', content)

          localStorage.setItem('userInfo', JSON.stringify(content))

          //将token存储于本地localstorage
          const { token } = content

          localStorage.setItem('authToken', token)

          commit('changeToken', token)

          //根据token获取权限数据
          await dispatch('getRoles', { token })

        } else {

          commit('changeUserInfo', null)

          commit('changeToken', null)

        }

      } catch (error) {

        commit('changeUserInfo', null)

        commit('changeToken', null)

      }

    },
    //获取权限信息
    async getRoles({ dispatch, commit }, { token }) {

      try {

        const { data } = await axios.get(config.getRoles, token)

        const { code, content } = data

        if (code == '200' && content) {

          commit('changeRoles', mapRoutes(content))

        } else {

          commit('changeRoles', null)

        }

      } catch (error) {

        commit('changeRoles', null)

      }

    }
  }
}