/**
 * useRoute 创建的路由
 */
import { useRoutes, BrowserRouter, RouteObject, Navigate } from 'react-router-dom'

// import ContactMe from '@/pages/contact/contact'
// import pageRoutes from './pageRoutes'
// 这里面使用的是 createRoutesFromChildren createBrowserRouter 生成的路由
// import type { RouteObject } from 'react-router-dom'
import LoginPage from '@/pages/login'

export const routeList:RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />
  },
  // name: '审核列表',
  // { path: '/nav/audit', element: <AuditPage/> },
  //  name: '导航列表',
  // { path: '/nav/list', element: <ListPage /> },
  // name: '分类列表',
  // { path: '/nav/category', element: <CategoryPage /> },
  // name: '标签列表',
  {
    path: '/',
    async lazy () {
      const Component = (await import('@/layout/AppLayout')).default
      return { Component }
    },
    children: [
      {
      // name: '看板列表',
        path: '/board',
        async lazy () {
          const Component = (await import('@/pages/board/index')).default
          return { Component }
        }
      },
      {
      // name: '导航管理',
        path: '/navigator',
        async lazy () {
          const Component = (await import('@/pages/nav-list/nav-list')).default
          return { Component }
        }
      },
      {
      // name: '分组管理',
        path: '/group',
        async lazy () {
          const Component = (await import('@/pages/group/group')).default
          return { Component }
        }
      },
      {
      // name: '标签管理',
        path: '/tags',
        async lazy () {
          const Component = (await import('@/pages/tags/tags')).default
          return { Component }
        }
      },
      {
      // name: '示例表格',
        path: '/example-table',
        async lazy () {
          const Component = (await import('@/pages/example-table/data-table')).default
          return { Component }
        }
      },
      { path: '/', element: <Navigate to="/board"></Navigate> }
    ]
  },
  { element: './404' }
]
