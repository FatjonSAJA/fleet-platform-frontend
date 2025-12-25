export interface Car {
  id: number
  image_url: string | null
  make: string
  model: string
  year: number
  color?: string
  license_plate?: string
  fuel_type?: 'petrol' | 'diesel' | 'electric' | string
  transmission?: 'manual' | 'automatic' | string
  engine_size?: string
  mileage?: number
  price?: string
  is_available: boolean
  created_at?: string
  updated_at?: string
}

export interface Driver {
  id: number
  first_name: string
  last_name: string
  address: string
  license_number: string
  phone: string
  email: string
  date_of_birth: string
  is_active: boolean
  user: number | null
}
