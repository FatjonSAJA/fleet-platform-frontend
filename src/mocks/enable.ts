import { env } from '@/env'

export async function enableMocking() {
  if (!import.meta.env.DEV || !env.VITE_USE_MOCK_API) {
    return
  }

  const { worker } = await import('./browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}
