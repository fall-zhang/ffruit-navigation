import axios from 'axios'
import { SESSION_ID } from './const'

const myRequest = axios.create({
  baseURL: 'api',
  timeout: 10000
})

myRequest.interceptors.request.use((req) => {
  const localToken = localStorage.getItem(SESSION_ID) || ''
  req.headers.set('token', localToken)
  return req
})

myRequest.interceptors.response.use(res => {
  const resToken = res.headers.token
  if (resToken) {
    localStorage.getItem(SESSION_ID)
  }
  return res
})
export default myRequest

export const http = myRequest

export function downloadFile (filePath:string) {
  http.get('/appRelease/' + filePath, {
    responseType: 'blob'
  }).then(res => {
    const dataURL = URL.createObjectURL(res.data)
    const link = document.createElement('a')
    link.href = dataURL
    link.target = '_blank'
    link.click()
    link.remove()
    URL.revokeObjectURL(dataURL)
  }).catch(err => {
    console.warn(err)
  })
}
