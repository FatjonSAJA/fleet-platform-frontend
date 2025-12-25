import {
  Outlet,
  HeadContent,
  notFound,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import { getSessionTypeFromPath } from '@/lib/utils/session-type'
import { useAuthStore } from '@/stores/shared/authStore'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type { User } from '@/lib/api/auth/types'
import type { QueryClient } from '@tanstack/react-query'
import { hasAccess, type PermissionRule } from '@/lib/api/auth/permissions'
interface MyRouterContext {
  queryClient: QueryClient
  title: undefined | string
  header: undefined | string
  permissionRule: PermissionRule | undefined
}
import { AlertProvider } from '@/components/ui/alert-provider'

export const Route = createRootRouteWithContext<MyRouterContext>()({
  context: () => {
    return {
      title: undefined,
      header: undefined,
      permissionRule: undefined,
    }
  },
  beforeLoad(ctx) {
    const { permissionRule } = ctx.context
    if (!permissionRule) {
      return
    }
    const sessionType = getSessionTypeFromPath(window.location.pathname)

    if (!sessionType) {
      return
    }
    const { adminSession, fleetSession, rentSession } = useAuthStore.getState()
    let session: User | null | undefined
    switch (sessionType) {
      case 'admin':
        session = adminSession
        break
      case 'fleet':
        session = fleetSession
        break
      case 'rent':
        session = rentSession
        break
      default:
        throw notFound()
    }
    if (!hasAccess(session, permissionRule)) {
      throw notFound()
    }
  },
  component: () => {
    return (
      <>
        <HeadContent />
        <Outlet />
        <AlertProvider />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
            formDevtoolsPlugin(),
          ]}
        />
      </>
    )
  },
})
