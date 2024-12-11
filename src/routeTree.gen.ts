/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as SeedImport } from './routes/$seed'
import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const DailyLazyImport = createFileRoute('/daily')()

// Create/Update Routes

const DailyLazyRoute = DailyLazyImport.update({
  path: '/daily',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/daily.lazy').then((d) => d.Route))

const SeedRoute = SeedImport.update({
  path: '/$seed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$seed': {
      id: '/$seed'
      path: '/$seed'
      fullPath: '/$seed'
      preLoaderRoute: typeof SeedImport
      parentRoute: typeof rootRoute
    }
    '/daily': {
      id: '/daily'
      path: '/daily'
      fullPath: '/daily'
      preLoaderRoute: typeof DailyLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  SeedRoute,
  DailyLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$seed",
        "/daily"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$seed": {
      "filePath": "$seed.tsx"
    },
    "/daily": {
      "filePath": "daily.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
