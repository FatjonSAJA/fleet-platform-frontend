import { apiClient } from '../client'
import type { DashboardResponse } from './types'

export async function dashboard(): Promise<DashboardResponse> {
  const response = await apiClient.get<DashboardResponse>('/dashboard')
  return response.data
}
