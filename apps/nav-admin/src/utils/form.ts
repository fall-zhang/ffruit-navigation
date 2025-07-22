/**
 * 将 object 转换为 formData
 * @param obj
 * @returns FormData
 */
export function getObjFormData (obj:Record<string, any>) {
  const formData = new FormData()
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key])
  })
  return formData
}

/**
 * 将 object 转换为 query string
 * 返回值不包含 ?
 */
export function getObjQuery (obj:Record<string, string | number>) {
  const qs = new URLSearchParams()
  Object.keys(obj).forEach(key => {
    qs.append(key, String(obj[key]))
  })
  return qs.toString()
}
