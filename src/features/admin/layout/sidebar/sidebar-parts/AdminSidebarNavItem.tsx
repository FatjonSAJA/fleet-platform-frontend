import { Link, useMatchRoute, useRouterState } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import type { NavMainItem } from '@/features/admin/layout/sidebar/types'
import { hasAccess } from '@/lib/api/auth/permissions'
import { useAuthStore } from '@/stores/shared/authStore'

type AdminSidebarNavItemProps = {
  item: NavMainItem
  depth: number
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AdminSidebarNavItem({
  item,
  depth,
  isOpen,
  onOpenChange,
}: AdminSidebarNavItemProps) {
  const user = useAuthStore((store) => store.adminSession)
  const matchRoute = useMatchRoute()

  const isFuzzy = depth === 0 && item.url !== '/admin'
  const isActive = useRouterState({
    select: () => !!matchRoute({ to: item.url, fuzzy: isFuzzy }),
  })

  const hasSubItems = !!item.items?.length

  if (!hasAccess(user, item.permissions)) {
    return null
  }

  if (depth === 0) {
    return (
      <Collapsible asChild open={isOpen} onOpenChange={onOpenChange}>
        <SidebarMenuItem>
          {hasSubItems ? (
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                className="py-6"
                data-active={isActive}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          ) : (
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              data-active={isActive}
              className="py-6"
            >
              <Link to={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )}
          {hasSubItems ? (
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <AdminSidebarNavItem
                    key={subItem.title}
                    item={subItem}
                    depth={depth + 1}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          ) : null}
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild data-active={isActive}>
        <Link to={item.url} className="py-4">
          <span>{item.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}
