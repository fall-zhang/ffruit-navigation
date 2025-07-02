import { Route, Navigate, createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
// 同步方式加载所有路由页面
import { routeList } from './route-list'

const BaseRoute = createBrowserRouter(routeList)
export default function () {
  return <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <RouterProvider router={BaseRoute}>
    </RouterProvider>
  </ErrorBoundary>
}
