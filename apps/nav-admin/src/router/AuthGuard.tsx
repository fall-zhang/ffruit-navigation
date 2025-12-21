import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getSessionData } from '@/utils/persistence'
import { SESSION_TOKEN_KEY } from '@/const'

const AuthGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const token = getSessionData(SESSION_TOKEN_KEY)
  const location = useLocation()

  if (!token) {
    // 未登录，重定向到登录页，并携带来源地址
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}

export default AuthGuard
