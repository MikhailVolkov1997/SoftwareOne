import axios from 'axios'
import config from '../config'

export const http = axios.create({
  baseURL: config.API_URL
})

http.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Basic ${Buffer.from(
      `oleksi:sHs7&%s5B0^5`,
      'utf8'
    ).toString('base64')}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)
