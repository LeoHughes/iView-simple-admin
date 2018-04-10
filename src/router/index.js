/**
 * 全局路由拦截器
 */
import Vue from 'vue';
import Router from 'vue-router';
import { LoadingBar } from 'iview'
import routes from '@/router/routes'
import store from '@/store/index'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes
})


/**
 * 全局前置路由守卫
 */
router.beforeEach(async(to, from, next) => {

  LoadingBar.start()

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限

    if (store.getters.token) { // 通过state获取当前的登录状态

      if (!store.getters.roles || store.getters.roles.length === 0) { //刷新页面缺失权限数据则通过token重新拉取

        const token = localStorage.getItem('authToken')

        await store.dispatch('getRoles', { token })

        if (!store.getters.routerMap) {

          next({
            path: '/login',
            redirect: to.fullPath
          })

          return

        }

      }

      if (store.getters.routerMap.includes(to.name)) {

        next()

      } else {

        next('/403')

      }

    } else {

      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })

    }

  } else {

    next()

  }
})


/**
 * 全局后置路由守卫
 */
router.afterEach((to, from) => {
  LoadingBar.finish()
})


export default router