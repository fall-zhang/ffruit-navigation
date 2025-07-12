import { FC, ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterPage from './router/router'
import { useBrowserTheme } from './hooks/use-theme'
// import { useTheme } from 'next-themes'

const ThemeProvide:FC<{
  children:ReactNode
}> = ({ children }) => {
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

