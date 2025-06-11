export function throttle(fn:any, delay:number) {
  let previous = 0
  // 使用闭包返回一个函数并且用到闭包函数外面的变量previous
  return (...args:any[])=> {
    const now = new Date().getTime()
    if(now - previous > delay) {
      fn(args)
      previous = now
    }
  }
}

export function isMobileSize() {
  const width = window.innerWidth || document.body.clientWidth
  return width < 568
}

export function titleCase(str:string) {
  console.log('🚀 ~ titleCase ~ str:', str)
  const newStr = str.slice(0,1).toUpperCase() +str.slice(1).toLowerCase()
  return newStr
}
