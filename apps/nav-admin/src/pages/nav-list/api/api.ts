import { http } from '@/lib/request'
import { getObjFormData } from '@/utils/form'

type ParamData = Record<string, any>

/**
 * 获取表格
 */
export function getNavTable (param:ParamData) {
  return http.get('/nav', param)
}

/**
 * 添加表格数据
 */
export function postNavTable (param:ParamData) {
  const formData = getObjFormData(param)
  return http.post('/nav', formData)
}

/**
 * 更新表格数据
 */
export function patchNavTable (param:ParamData) {
  const formData = getObjFormData(param)
  return http.patch('/nav', formData)
}

export function removeReleaseVersion (id:string) {
  return http.delete('/release/' + id, {
    responseType: 'arraybuffer'
  })
}
