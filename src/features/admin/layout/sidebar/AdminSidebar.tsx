import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { adminSidebarData } from '@/features/admin/layout/sidebar/adminSidebarData'
import { AdminSidebarNavMain } from './sidebar-parts/AdminSidebarNavMain'
import { AdminSidebarNavSecondary } from './sidebar-parts/AdminSidebarNavSecondary'

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      {...props}
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
    >
      <SidebarContent>
        <AdminSidebarNavMain items={adminSidebarData.navMain} />
        <AdminSidebarNavSecondary
          items={adminSidebarData.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
    </Sidebar>
  )
}
