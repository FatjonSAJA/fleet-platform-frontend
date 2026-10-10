import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as authApi from '@/lib/api/auth/auth'
import type { LoginRequest } from '@/lib/api/auth/types'
import type { SessionType } from '@/lib/utils/session-type'
import { useAuthStore } from '@/stores/shared/authStore'

export function useLogin(sessionType: SessionType = 'admin') {
  const queryClient = useQueryClient()
  const setAdminSession = useAuthStore((state) => state.setAdminSession)
  const setFleetSession = useAuthStore((state) => state.setFleetSession)
  const setRentSession = useAuthStore((state) => state.setRentSession)

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: async (session) => {
      console.log('Login successful?', session)

      switch (sessionType) {
        case 'admin':
          setAdminSession(session)
          break
        case 'fleet':
          setFleetSession(session)
          break
        case 'rent':
          setRentSession(session)
          break
      }

      queryClient.invalidateQueries()
    },
    onError: (error) => {
      console.error(`${sessionType} login failed:`, error)
    },
  })
}

export function useLogout(sessionType: SessionType = 'admin') {
  const queryClient = useQueryClient()
  const setAdminSession = useAuthStore((state) => state.setAdminSession)
  const setFleetSession = useAuthStore((state) => state.setFleetSession)
  const setRentSession = useAuthStore((state) => state.setRentSession)

  return useMutation({
    onSuccess: () => {
      switch (sessionType) {
        case 'admin':
          setAdminSession(null)
          break
        case 'fleet':
          setFleetSession(null)
          break
        case 'rent':
          setRentSession(null)
          break
      }

      queryClient.clear()
    },
  })
}
