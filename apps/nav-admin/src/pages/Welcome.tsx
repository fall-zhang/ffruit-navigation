import React, { ReactNode } from 'react'
import { Card, Alert, Typography } from 'antd'

export default (): React.ReactNode => {
  return (
    <Card>
      <Alert
        message={'更快更强的重型组件，已经发布。'}
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24
        }}
      />
    </Card>
  )
}
