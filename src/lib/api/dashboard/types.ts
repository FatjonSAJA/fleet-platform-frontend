import type { Car, Driver } from '@/types'

export interface DashboardStatus {
  total_cars: number
  available_cars: number
  total_drivers: number
  active_drivers: number
}

export interface DashboardResponse {
  status: DashboardStatus
  recent_cars: Car[]
  recent_drivers: Driver[]
}
