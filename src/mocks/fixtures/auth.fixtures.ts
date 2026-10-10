import type { LoginRequest, User } from '@/lib/api/auth/types'

export const MOCK_LOGIN_DELAY_MS = 450
export const MOCK_LOGIN_PASSWORD = 'admin123'

export function buildMockAuthUser(credentials: LoginRequest): User {
  return {
    id: 1,
    email: credentials.email,
    username: credentials.email.split('@')[0] || 'admin',
    auth_token: 'mock-admin-token',
    groups: [{ name: 'admin' }],
  }
}
