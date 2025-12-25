import { useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar'
import type { NavMainItem } from '@/features/admin/layout/sidebar/types'
import { AdminSidebarNavItem } from './AdminSidebarNavItem'

type AdminSidebarNavMainProps = {
  items: NavMainItem[]
}

export function AdminSidebarNavMain({ items }: AdminSidebarNavMainProps) {
  const { pathname } = useLocation()
  const [openItem, setOpenItem] = useState<string | null>(null)

  useEffect(() => {
    const activeItem = items.find(
      (item) => pathname.startsWith(item.url) && item.items?.length,
    )
    if (activeItem) {
      setOpenItem(activeItem.title)
    }
  }, [pathname, items])

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <AdminSidebarNavItem
            key={item.title}
            item={item}
            depth={0}
            isOpen={openItem === item.title}
            onOpenChange={(open) => {
              if (open) {
                setOpenItem(item.title)
              } else if (openItem === item.title) {
                setOpenItem(null)
              }
            }}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
