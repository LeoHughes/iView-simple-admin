import axios from '@/util/instance'
import qs from 'qs'
import config from '@/config'
import { mapRoutes } from '@/router/util'
import { stat } from 'fs';


export default {
  state: {
    authToken: localStorage.getItem(config.token) || null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null, //用户信息
    roles: null, //当前用户权限数据
    routerMap: null //可访问路由名称
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
    },
    routerMap(state) {
      return state.routerMap
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
    },
    //变更用户可访问路由数据
    changeRouterMap(state, payload) {
      state.routerMap = payload
    },
    //清空用户数据
    clearUserInfo(state) {
      state.authToken = null
      state.userInfo = null
    },
    //清空用户权限及可访问路由数据
    clearRolesAndRouterMap(state) {
      state.roles = null
      state.routerMap = null
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

          commit('clearUserInfo')

        }

      } catch (error) {

        commit('clearUserInfo')

      }

    },
    //获取权限信息
    async getRoles({ dispatch, commit }, { token }) {

      try {

        const { data } = await axios.get(config.getRoles, token)

        const { code, content } = data

        if (code == '200' && content) {

          commit('changeRoles', content)

          commit('changeRouterMap', mapRoutes(content))

        } else {

          commit('clearRolesAndRouterMap')

        }

      } catch (error) {

        commit('clearRolesAndRouterMap')

      }

    }
  }
}