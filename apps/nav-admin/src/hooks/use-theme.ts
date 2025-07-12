import { useEffect, useLayoutEffect, useState } from 'react'

let darkThemeMatch:MediaQueryList
type ThemeType = 'dark' | 'light' | 'auto'

type ThemeInfo = {
  theme: ThemeType
}

export const useBrowserTheme = () => {
  const [themeInfo, setThemeInfo] = useState<ThemeInfo>(() => {
    darkThemeMatch = matchMedia('(prefers-color-scheme: dark)')
    return {
      theme: darkThemeMatch.matches ? 'dark' : 'light'
    }
  })
  useEffect(() => {
    const changeTheme = (e:MediaQueryListEvent) => {
      setThemeInfo({
        theme: e.matches ? 'dark' : 'light'
      })
    }
    darkThemeMatch = matchMedia('(prefers-color-scheme: dark)')
    darkThemeMatch.addEventListener('change', changeTheme)
    return () => darkThemeMatch.removeEventListener('change', changeTheme)
  }, [])


  // 仅在初始化时执行
  useEffect(() => {
    if (themeInfo.theme === 'dark') {
      document.body.className = 'dark'
    } else {
      document.body.className = ''
    }
  }, [themeInfo])

  function setNewTheme (themeInfo:ThemeInfo) {
    if (themeInfo.theme === 'dark') {
      document.body.className = 'dark'
    } else if (themeInfo.theme === 'light') {
      document.body.className = ''
    } else {
      if (darkThemeMatch.matches) {
        document.body.className = 'dark'
      } else {
        document.body.className = ''
      }
    }
    setThemeInfo(themeInfo)
  }
  return {
    themeInfo,
    setThemeInfo: setNewTheme
  }
}
