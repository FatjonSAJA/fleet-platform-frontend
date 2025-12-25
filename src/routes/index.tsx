import { createFileRoute, Navigate } from '@tanstack/react-router'
import { AdminLoginForm } from '@/features/admin/auth/LoginForm.tsx'
import { useAuthStore } from '@/stores/shared/authStore'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const adminSession = useAuthStore((state) => state.adminSession)

  if (adminSession) {
    return <Navigate to="/admin" />
  }
  return <AdminLoginForm />
}
