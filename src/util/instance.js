import axios from 'axios'
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

export default instance;