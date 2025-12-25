import { useParams, useNavigate } from '@tanstack/react-router'
import { useCar, useUpdateCar } from '@/hooks/api/cars/useCars'
import { CarFormModal } from './CarFormModal'
import type { Car } from '@/types'
import { Route as CarRoute } from '@/routes/admin/cars/$carId'

export function CarEditPage() {
  // const params = useParams()
  // const carId = Number(params.carId)
  const params = useParams(CarRoute) as { carId?: string }
  const carId = Number(params.carId)
  const { data: car, isLoading } = useCar(carId)
  const update = useUpdateCar(carId)
  const navigate = useNavigate()

  if (isNaN(carId)) return <div>Invalid car id</div>
  if (isLoading) return <div>Loading...</div>
  if (!car) return <div>Not found</div>

  const handleSave = async (
    data: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>,
  ) => {
    await update.mutateAsync(data)
    navigate({ to: '/admin/cars/' })
  }

  return (
    <CarFormModal
      car={car}
      onSave={handleSave}
      onClose={() => navigate({ to: '/admin/cars/' })}
    />
  )
}
