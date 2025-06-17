import React, { useCallback, useState } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Spin } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.css'
import { Link, useNavigate } from 'react-router-dom'

export type GlobalHeaderRightProps = {
  menu?: boolean;
};


const menuItems: MenuProps['items'] = [
  {
    label: (
      <Link to={'user'}>
        <UserOutlined /> 个人中心
      </Link>
    ),
    key: '0'
  },
  {
    label: (
      <Link to={'setting'}>
        <SettingOutlined />个人设置
      </Link>
    ),
    key: '7'
  },
  {
    label: (
      <Link to={'logout'}>
        <LogoutOutlined />退出登录
      </Link>
    ),
    key: 'logLinkLinkLinkLinkLink'
  },
  { type: 'divider' },
  {
    label: '3rd menu item（disabled）',
    key: '3',
    disabled: true
  }
]
const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [initialState, setInitialState] = useState('')
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState()
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  if (!currentUser) {
    return loading
  }

  /**
 * 退出登录，并且将当前的 url 保存
 */
  const loginOut = async () => {
    const query = new URLSearchParams(location.href)
    const redirect = query.get('redirect')
    // Note: There may be security issues, please note
    if (location.pathname !== '/user/login' && !redirect) {
      location.href = location.hash
      const query = new URLSearchParams()
      query.append('redirect', location.pathname)
      navigate('/user/login?' + query.toString(), {

      })
    }
  }
  const onClickMenuItem: MenuProps['onClick'] = (event) => {
    const { key } = event
    if (key === 'logout' && initialState) {
      loginOut()
    }
  }
  return (
    <Dropdown menu={{ items: menuItems, onClick: onClickMenuItem }}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{'admin'}</span>
        {/* <span className={`${styles.name} anticon`}>{currentUser.name}</span> */}
      </span>
    </Dropdown>
  )
}

export default AvatarDropdown
