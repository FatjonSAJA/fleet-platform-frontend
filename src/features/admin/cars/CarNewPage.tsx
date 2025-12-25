import { useNavigate } from '@tanstack/react-router'
import { CarFormModal } from './CarFormModal'
import { useCreateCar } from '@/hooks/api/cars/useCars'
import type { Car } from '@/types'

export function CarNewPage() {
  const create = useCreateCar()
  const navigate = useNavigate()

  const handleSave = async (
    data: Omit<Car, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    await create.mutateAsync(data)
    navigate({ to: '/admin/cars/' })
  }

  return (
    <CarFormModal
      car={null}
      onSave={handleSave}
      onClose={() => navigate({ to: '/admin/cars/' })}
    />
  )
}
