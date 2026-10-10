import { delay, http, HttpResponse } from 'msw'
import type { DjangoApiErrorResponse } from '@/lib/api/types'
import type { LoginRequest } from '@/lib/api/auth/types'
import {
  buildMockAuthUser,
  MOCK_LOGIN_DELAY_MS,
  MOCK_LOGIN_PASSWORD,
} from '../fixtures/auth.fixtures'

export const authHandlers = [
  http.post('*/auth/login/', async ({ request }: { request: Request }) => {
    const credentials = (await request.json()) as LoginRequest

    await delay(MOCK_LOGIN_DELAY_MS)

    if (!credentials.email || !credentials.password) {
      return HttpResponse.json<DjangoApiErrorResponse>(
        {
          success: false,
          message: 'Email and password are required.',
          code: 'validation_error',
        },
        { status: 400 },
      )
    }

    if (credentials.password !== MOCK_LOGIN_PASSWORD) {
      return HttpResponse.json<DjangoApiErrorResponse>(
        {
          success: false,
          message: 'Invalid email or password.',
          code: 'invalid_credentials',
        },
        { status: 401 },
      )
    }

    return HttpResponse.json(buildMockAuthUser(credentials), { status: 200 })
  }),
]
