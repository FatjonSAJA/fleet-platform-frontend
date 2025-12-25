import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useLocaleStore } from '@/stores/shared/localeStore'

export function LocaleDropdown({ className }: { className?: string }) {
  const locale = useLocaleStore((state) => state.locale)
  const setLocale = useLocaleStore((state) => state.setLocale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'text-white/95 hover:text-white transition-colors inline-flex items-center gap-2 font-light',
            className,
          )}
        >
          {locale === 'en' ? 'English (US)' : 'Français (FR)'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <title>Dropdown</title>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => setLocale('en')}>
          English (US)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('fr')}>
          Français (FR)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
