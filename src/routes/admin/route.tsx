import {
  createFileRoute,
  Navigate,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/features/admin/layout/appbar/SiteHeader'
import { AdminSidebar } from '@/features/admin/layout/sidebar/AdminSidebar'
import { SiteFooter } from '@/features/admin/layout/foot/SiteFooter'
import { useAuthStore } from '@/stores/shared/authStore'

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    const { adminSession } = useAuthStore.getState()
    if (!adminSession?.auth_token) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function AdminLayoutContent() {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 p-3">
        <AdminSidebar />
        <SidebarInset className="w-0 h-0">
          <Outlet />
        </SidebarInset>
      </div>
      <SiteFooter />
    </>
  )
}

function RouteComponent() {
  const adminSession = useAuthStore((s) => s.adminSession)

  if (!adminSession?.auth_token) {
    return <Navigate to="/" />
  }

  return (
    <div className="[--header-height:calc(--spacing(38))]">
      <SidebarProvider className="flex flex-col">
        <AdminLayoutContent />
      </SidebarProvider>
    </div>
  )
}
