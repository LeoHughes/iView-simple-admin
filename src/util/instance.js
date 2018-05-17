import { Notice } from 'iview'
import axios from 'axios'
import Store from '@/store/index'
import Router from '@/router/index'
import config from '@/config'

const notice = function({ desc = '数据请求失败，请稍后再试', cb = null }) {

  Notice.destroy();

  Notice.error({
    title: '错误信息',
    desc: desc,
    duration: 3,
    onClose: cb
  })
}

const token = localStorage.getItem(config.token)

const instance = axios.create({
  baseURL: config.server,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    [config.token]: token || ''
  }
})

//响应数据拦截
instance.interceptors.response.use(response => {

  if (response.status !== 200) {

    notice();

  } else {

    const { data } = response;

    //失效,无效token拦截
    if (data.code == '403' || data.code == '500') {
      Store.dispatch('loginOut');

      notice({
        desc: '登录信息失效，请重新登录！',
        cb: () => {
          Router.push('/login')
        }
      })

    } else {

      return response;

    }

  }

}, error => {

  notice({
    desc: '网络请求响应超时，请稍后再试！',
    cb: () => {
      window.location.reload();
    }
  })

})

export default instance;