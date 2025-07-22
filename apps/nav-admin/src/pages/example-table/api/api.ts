import { http } from '@/lib/request'
import { getObjFormData } from '@/utils/form'
import { toast } from 'sonner'

type ParamData = Record<string, any>

/**
 * 获取表格
 */
export function getReleaseTable (param:ParamData) {
  return http.get('/release', param)
}

/**
 * 添加表格数据
 */
export function postReleaseTable (param:ParamData) {
  const formData = getObjFormData(param)
  return http.post('/release', formData)
}

/**
 * 更新表格数据
 */
export function patchReleaseTable (param:ParamData) {
  const formData = getObjFormData(param)
  return http.patch('/release', formData)
}

/**
 * 下载文件
 */
export function downloadReleaseVersion (filePath:string) {
  http.get('/release/' + filePath, {
    responseType: 'arraybuffer'
  }).then(res => {
    const fileBlob = new Blob([res.data])
    const dataURL = URL.createObjectURL(fileBlob)
    const link = document.createElement('a')
    link.href = dataURL
    link.target = '_blank'
    link.download = filePath
    link.click()
    link.remove()
    URL.revokeObjectURL(dataURL)
  }).catch(err => {
    toast('文件下载失败，原因', err)
    console.warn(err)
  })
}

export function removeReleaseVersion (id:string) {
  return http.delete('/release/' + id, {
    responseType: 'arraybuffer'
  })
}
