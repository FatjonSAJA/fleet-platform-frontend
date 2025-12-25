import { AlertCircle, XCircle } from 'lucide-react'
import { ApiError } from '@/lib/api/exceptions'
import { cn } from '@/lib/utils'
import type {
  ErrorVariant,
  FormErrorAlertProps,
} from './form-error-alert.types.ts'

const variantStyles: Record<ErrorVariant, string> = {
  error: 'text-red-800 bg-red-100 border-red-200',
  warning: 'text-amber-800 bg-amber-100 border-amber-200',
}

const variantIcons: Record<ErrorVariant, typeof AlertCircle> = {
  error: XCircle,
  warning: AlertCircle,
}

export function FormErrorAlert({
  error,
  show = true,
  fallbackMessage,
  variant = 'error',
  className,
  title,
  showIcon = true,
  showCode = false,
  'data-qa-id': dataQaId = 'form_error_alert',
}: FormErrorAlertProps) {
  if (!show || !error) {
    return null
  }

  const errorMessage = typeof error === 'string' ? error : error.message || null

  const errorCode = error instanceof ApiError ? error.code : null

  const displayMessage = errorMessage || fallbackMessage || (
    <div>An unexpected error occurred. Please try again.</div>
  )

  const Icon = variantIcons[variant]

  return (
    <div
      role="alert"
      aria-live="polite"
      data-qa-id={dataQaId}
      className={cn(
        'p-3 text-sm rounded-md border',
        variantStyles[variant],
        className,
      )}
    >
      <div className="flex items-start gap-2">
        {showIcon && (
          <Icon className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
        )}
        <div className="flex-1">
          {title && <div className="font-medium mb-1">{title}</div>}
          <div>{displayMessage}</div>
          {showCode && errorCode && (
            <div className="mt-1 text-xs opacity-75">
              <div>Code: {errorCode}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export type {
  ErrorVariant,
  FormErrorAlertProps,
} from './form-error-alert.types.ts'
