import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterPage from './router/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterPage />
  </StrictMode>
)
