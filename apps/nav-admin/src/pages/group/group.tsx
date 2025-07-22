import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <h3>分组管理</h3>
  )
}

export default NoFoundPage
