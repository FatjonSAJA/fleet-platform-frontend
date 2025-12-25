import { useState } from 'react'
import { useCars, useDeleteCar } from '@/hooks/api/cars/useCars'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { DeleteConfirmation } from './DeleteConfirmation'

export function CarsPage() {
  const { data: cars, isLoading } = useCars()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const deleteMutation = useDeleteCar()

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id)
    setDeletingId(null)
  }

  const navigate = useNavigate()
  if (isLoading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cars</h1>
        <Button onClick={() => navigate({ to: '/admin/cars/new' })}>
          <Plus className="mr-2 h-4 w-4" /> Add Car
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars?.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.make}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.license_plate}</TableCell>
              <TableCell>
                {car.is_available ? 'Available' : 'Unavailable'}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate({
                      to: `/admin/cars/${car.id}`,
                      state: {
                        backgroundPath: location.pathname + location.search,
                      },
                    })
                  }
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeletingId(car.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deletingId && (
        <DeleteConfirmation
          onConfirm={() => handleDelete(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  )
}
