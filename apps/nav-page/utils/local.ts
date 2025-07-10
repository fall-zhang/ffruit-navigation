
const prefix = 'FFRUIT_STORE_'

export const setLocal = (key:string, value:Record<string, any>) => {
  localStorage.setItem(prefix + key, JSON.stringify(value))
}

export const getLocal = (key:string, defaultVal?:unknown) => {
  const localData = localStorage.getItem(prefix + key)
  if (localData && localData !== 'undefined') {
    return JSON.parse(localData)
  }
  return defaultVal
}

export const removeLocal = (key:string) => {
  localStorage.removeItem(prefix + key)
}

export const clearLocal = () => {
  localStorage.clear()
}
