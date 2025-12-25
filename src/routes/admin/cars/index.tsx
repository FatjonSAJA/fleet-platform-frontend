import { createFileRoute } from '@tanstack/react-router'
import { CarsPage } from '@/features/admin/cars/CarsPage'

export const Route = createFileRoute('/admin/cars/')({
  component: CarsPage,
})
