import axios from 'axios'

export const http = axios.create({
  credentials: 'same-origin',
  baseURL: 'https://52.243.97.180:8089/servicesNS/nobody/apmTest2/api/sets'
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
