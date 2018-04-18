import { Notice } from 'iview'
import axios from 'axios'
import Store from '@/store/index'
import Router from '@/router/index'
import config from '@/config'


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

    Notice.error({
      title: '错误信息',
      desc: '数据请求失败，请稍后再试'
    })

  } else {

    const { data } = response;

    //失效,无效token拦截
    if (data.code == '403' || data.code == '500') {
      Store.dispatch('loginOut');

      Notice.error({
        title: '错误信息',
        desc: '登录信息失效，请重新登录！',
        onClose: () => {
          Router.push('/login')
        }
      })

    } else {
      return response;
    }

  }

})

export default instance;