import { apiClient } from '../client'
import type { Car } from '@/types'

export async function listCars(): Promise<Car[]> {
  const response = await apiClient.get<Car[]>('/cars/')
  return response.data
}

export async function getCar(id: number): Promise<Car> {
  const response = await apiClient.get<Car>(`/cars/${id}/`)
  return response.data
}

export async function createCar(
  data: Omit<Car, 'id' | 'created_at' | 'updated_at'>,
): Promise<Car> {
  const response = await apiClient.post<Car>('/cars/', data)
  return response.data
}

export async function updateCar(
  id: number,
  data: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>,
): Promise<Car> {
  const response = await apiClient.patch<Car>(`/cars/${id}/`, data)
  return response.data
}

export async function deleteCar(id: number): Promise<void> {
  await apiClient.delete(`/cars/${id}/`)
}
