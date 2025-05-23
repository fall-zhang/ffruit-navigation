import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined
} from '@ant-design/icons'
import { Alert, Space, message, Tabs } from 'antd'
import React, { useState } from 'react'
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form'
// import {Link, history, useModel} from 'umi';
import { Link, useNavigate } from 'react-router-dom'
import Footer from '@/components/Footer'
import styles from './index.module.less'
import { login } from '@/apis/api'
import { setPersistenceData } from '@/utils/persistence'
import { CURRENT_USER, TOKEN } from '@/constants'


const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const [initialState, setInitialState] = useState<{
    currentUser:any
  }>()
  const navigate = useNavigate()
  const goto = () => {
    if (!history) return
    setTimeout(() => {
      const { query } = history.state
      const { redirect } = query as {
        redirect: string;
      }
      navigate(redirect || '/')
    }, 10)
  }


  const handleSubmit = async (values: any) => {
    setSubmitting(true)

    try {
      // 登录
      const res: any = await login({ username: values.username as string, password: values.password as string })

      if (res?.data) {
        const defaultloginSuccessMessage = '登录成功！'
        message.success(defaultloginSuccessMessage)
        setInitialState({
          currentUser: {
            name: values.username,
            access: 'admin'
          }
        })
        goto()
        setPersistenceData(TOKEN, res.data)
        setPersistenceData(CURRENT_USER, { name: values.username })
        return
      } // 如果失败去设置用户错误信息

      message.error(res?.msg)
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！'
      message.error(defaultLoginFailureMessage)
    }

    setSubmitting(false)
  }

  return (<div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <img alt="logo" className={styles.logo} src="/logo-icon.png"/>
            <span className={styles.title}>鲜果导航</span>
          </Link>
        </div>
        <div className={styles.desc}>{'鲜果导航，专注独特资源导航'}</div>
      </div>

      <div className={styles.main}>
        <ProForm
          initialValues={{
            autoLogin: true
          }}
          submitter={{
            searchConfig: {
              submitText: '登录'
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: submitting,
              size: 'large',
              style: {
                width: '100%'
              }
            }
          }}
          onFinish={handleSubmit}
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>
              }}
              placeholder={'输入用户名'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！'
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>
              }}
              placeholder={'输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！'
                }
              ]}
            />
          </>
        </ProForm>
      </div>
    </div>
    <Footer/>
  </div>
  )
}

export default Login
