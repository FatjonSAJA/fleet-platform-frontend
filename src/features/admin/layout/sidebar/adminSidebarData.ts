import { Car, NotepadText } from 'lucide-react'
import type { SidebarData } from '@/features/admin/layout/sidebar/types'
import { and } from '@/lib/api/auth/permissions'

export const adminSidebarData: SidebarData = {
  navMain: [
    {
      title: `Dashboard`,
      url: '/admin',
      icon: NotepadText,
      items: [],
      permissions: and('admin'),
    },
    {
      title: `Cars`,
      url: '/admin/cars',
      icon: Car,
      permissions: and('admin'),
      items: [
        {
          title: `Manage Cars`,
          url: '/admin/cars',
        },
      ],
    },
    // {
    //   title: `Drivers`,
    //   url: "/admin/drivers",
    //   icon: User,
    //   permissions: and("Admin"),
    //   items: [
    //     {
    //       title: `Manage Drivers`,
    //       url: "/admin/drivers",
    //     },
    //   ],
    // },
    // {
    //   title: `Reports`,
    //   url: "/admin/reports",
    //   icon: User,
    //   permissions: and("Admin"),
    //   items: [
    //     {
    //       title: `Manage Reports`,
    //       url: "/admin/reports",
    //     },
    //   ],
    // },
  ],
  navSecondary: [],
}
