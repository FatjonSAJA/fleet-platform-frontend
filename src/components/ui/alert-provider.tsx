'use client'

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
} from 'lucide-react'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import type { AlertType } from '@/stores/shared/alertStore.ts'
import { useAlertStore } from '@/stores/shared/alertStore.ts'

const alertIcons: Record<AlertType, LucideIcon> = {
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
}

const alertIconColors: Record<AlertType, string> = {
  error: 'text-red-500',
  warning: 'text-amber-500',
  success: 'text-green-500',
  info: 'text-primary',
}

export function AlertProvider() {
  const { alert, isOpen, close, confirm, cancel } = useAlertStore(
    useShallow((state) => ({
      alert: state.alert,
      isOpen: state.isOpen,
      close: state.close,
      confirm: state.confirm,
      cancel: state.cancel,
    })),
  )

  useEffect(() => {
    if (isOpen && alert?.timer) {
      const timeoutId = setTimeout(() => {
        close()
      }, alert.timer)

      return () => clearTimeout(timeoutId)
    }
  }, [isOpen, alert, close])

  if (!alert) {
    return null
  }

  const Icon = alert.icon || (alert.type ? alertIcons[alert.type] : null)
  const iconColor =
    alert.iconColor || (alert.type ? alertIconColors[alert.type] : '')

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <AlertDialogContent
        className={cn('sm:max-w-md p-6', alert.customClass)}
        data-qa-id="alert-dialog"
      >
        <AlertDialogHeader className="items-center text-center space-y-3 sm:space-y-4">
          {Icon && <Icon className={cn('size-16 sm:size-20', iconColor)} />}
          <AlertDialogTitle className="text-xl sm:text-2xl font-semibold text-foreground">
            {alert.title}
          </AlertDialogTitle>
          {alert.children && (
            <AlertDialogDescription className="text-sm sm:text-base text-muted-foreground">
              {alert.children}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row sm:justify-center gap-2 sm:gap-3 mt-2">
          {alert.showCancelButton && (
            <AlertDialogCancel
              onClick={cancel}
              data-qa-id="alert-dialog-cancel"
            >
              {alert.cancelButtonText || <>No</>}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={confirm}
            className={alert.confirmButtonClass}
            data-qa-id="alert-dialog-confirm"
          >
            {alert.confirmButtonText || <>OK</>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
