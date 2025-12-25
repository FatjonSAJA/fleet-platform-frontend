import { createFileRoute } from '@tanstack/react-router'
import { CarNewPage } from '@/features/admin/cars/CarNewPage'

export const Route = createFileRoute('/admin/cars/new')({
  component: CarNewPage,
})
