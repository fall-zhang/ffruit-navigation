/* eslint-disable no-param-reassign */
import axios from 'axios'
// import Storage from './localStorage'

const errorHandle = (status:number) => {
  switch (status) {
    case 401:
      location.replace('/login')
      break
    default:
      break
  }
}

const request = axios.create({
  baseURL: process.env.root,
  timeout: 6000
})

request.interceptors.request.use((config) => {
  if (process) {
    const token = localStorage.get('TOKEN')
    if (token) {
      config.headers.Authorization = token
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (process) {
    errorHandle(error.response.status)
  }
  return Promise.reject(error.response?.data?.message)
})

export default request
