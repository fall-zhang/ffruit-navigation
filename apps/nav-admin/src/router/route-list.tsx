/**
 * useRoute 创建的路由
 */
import React, { FC, ReactNode, Suspense } from 'react'
import { useRoutes, BrowserRouter, RouteObject, Navigate } from 'react-router-dom'

// import ContactMe from '@/pages/contact/contact'
// import pageRoutes from './pageRoutes'
// 这里面使用的是 createRoutesFromChildren createBrowserRouter 生成的路由
// import type { RouteObject } from 'react-router-dom'
import LoginPage from '@/pages/user/Login'
import AuditPage from '@/pages/nav/Audit'
import ListPage from '@/pages/nav/List'
import CategoryPage from '@/pages/nav/Category'

export const routeList:RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />
  },
  // name: '审核列表',
  { path: '/nav/audit', element: <AuditPage/> },
  //  name: '导航列表',
  { path: '/nav/list', element: <ListPage /> },
  // name: '分类列表',
  { path: '/nav/category', element: <CategoryPage /> },
  // name: '标签列表',
  {
    path: '/nav/tag',
    async lazy () {
      const Component = (await import('@/pages/nav/Tag')).default
      return { Component }
    }
  },

  {
    path: '/',
    async lazy () {
      const Component = (await import('@/pages/dashboard/dashboard')).default
      return { Component }
    }
  },
  { path: '/', element: <Navigate to="/nav/audit"></Navigate> },
  { element: './404' }


]
