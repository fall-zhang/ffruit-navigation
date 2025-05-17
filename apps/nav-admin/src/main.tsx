import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.less'
import RouterPage from './router/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterPage />
  </StrictMode>
)
