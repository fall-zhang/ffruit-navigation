export function setPersistenceData (key:string, value:unknown, type = 'session') {
  let valToStr:string
  if (typeof value === 'string') {
    valToStr = value
  } else {
    valToStr = JSON.stringify(value)
  }
  if (type === 'session') {
    sessionStorage.setItem(key, valToStr)
  } else if (type === 'local') {
    localStorage.setItem(key, valToStr)
  }
}


export function getSessionData (key:string) {
  return sessionStorage.getItem(key)
}


export function clearPersistenceData (type = 'session') {
  if (type === 'session') {
    return sessionStorage.clear()
  } else if (type === 'local') {
    return localStorage.clear()
  }
}
