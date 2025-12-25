import { createFileRoute } from '@tanstack/react-router'
import { and, not } from '@/lib/api/auth/permissions'
import { DashboardForm } from '@/features/admin/dashboard/DashboardForm'

export const Route = createFileRoute('/admin/')({
  head: () => ({
    meta: [
      {
        title: 'Dashboard Reporting',
      },
      {
        name: 'description',
        content: 'Dashboard Reporting',
      },
    ],
  }),
  context: () => {
    return {
      title: 'Admin Fleet Rental Platform',
      header: 'Admin Fleet Rental Platform',
      permissionRule: and(not('admin')),
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardForm />
}
