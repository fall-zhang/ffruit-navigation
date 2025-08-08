import { FC, ReactNode, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterPage from './router/router'
import { useBrowserTheme } from './hooks/use-theme'

// import { useTheme } from 'next-themes'
type inferType<T> = T extends (x: infer P) => unknown ? P : T
const ThemeProvide:FC<{
  children:ReactNode
}> = ({ children }) => {
  const [state, setState] = useState('')
  const theme = useBrowserTheme()
  return <>
    {children}
  </>
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ThemeProvide>
      <RouterPage />
    </ThemeProvide>
  </StrictMode>
)

