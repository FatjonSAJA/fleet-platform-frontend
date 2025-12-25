import { createFileRoute } from '@tanstack/react-router'
import { CarEditPage } from '@/features/admin/cars/CarEditPage'

export const Route = createFileRoute('/admin/cars/$carId')({
  component: CarEditPage,
})
