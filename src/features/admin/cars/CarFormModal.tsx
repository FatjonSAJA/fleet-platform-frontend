import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Car } from '@/types'

const FUEL_TYPES = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
]

const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automatic' },
]

interface CarFormModalProps {
  car: Car | null
  onSave: (data: Omit<Car, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onClose: () => void
}

export function CarFormModal({ car, onSave, onClose }: CarFormModalProps) {
  const [formData, setFormData] = useState({
    make: car?.make ?? '',
    model: car?.model ?? '',
    color: car?.color ?? '',
    fuel_type: car?.fuel_type ?? '',
    transmission: car?.transmission ?? '',
    engine_size: car?.engine_size ?? '',
    mileage: car?.mileage ?? '',
    year: car?.year ?? new Date().getFullYear(),
    license_plate: car?.license_plate ?? '',
    is_available: car?.is_available ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(formData as any)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {car ? 'Edit Car' : 'Add Car'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Make</Label>
            <Input
              value={formData.make}
              onChange={(e) =>
                setFormData({ ...formData, make: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Model</Label>
            <Input
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Color</Label>
            <Input
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Fuel Type</Label>
            <select
              value={formData.fuel_type}
              onChange={(e) =>
                setFormData({ ...formData, fuel_type: e.target.value })
              }
              required
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <option value="">Select Fuel Type</option>
              {FUEL_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Transmission</Label>
            <select
              value={formData.transmission}
              onChange={(e) =>
                setFormData({ ...formData, transmission: e.target.value })
              }
              required
              className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <option value="">Select transmission</option>
              {TRANSMISSION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Engine Size</Label>
            <Input
              value={formData.engine_size}
              onChange={(e) =>
                setFormData({ ...formData, engine_size: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Mileage</Label>
            <Input
              value={formData.mileage}
              onChange={(e) =>
                setFormData({ ...formData, mileage: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <div>
            <Label>License Plate</Label>
            <Input
              value={formData.license_plate}
              onChange={(e) =>
                setFormData({ ...formData, license_plate: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
