import { useStore } from '@tanstack/react-form'
import type { AutocompleteOption } from '@/components/ui/autocomplete'
import { Autocomplete } from '@/components/ui/autocomplete'
import { useFieldContext } from '@/hooks/forms/base/base.form-components'
import { ErrorMessages } from './ErrorMessages'

export function AutocompleteField({
  options,
  placeholder,
  disabled,
  emptyMessage,
  onSearch,
  debounceMs = 300,
  isLoading = false,
  clearable = true,
  showSearchIcon = true,
}: {
  options: AutocompleteOption[]
  placeholder?: string
  disabled?: boolean
  emptyMessage?: string
  onSearch?: (query: string) => void
  debounceMs?: number
  isLoading?: boolean
  clearable?: boolean
  showSearchIcon?: boolean
  className?: string
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  const qaIdBase = field.name
    ?.replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
    .replace(/\s+/g, '_')

  return (
    <div className="space-y-1.5">
      <Autocomplete
        value={field.state.value}
        onValueChange={(value) => {
          field.handleChange(value)
          field.handleBlur()
        }}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        emptyMessage={emptyMessage}
        onSearch={onSearch}
        debounceMs={debounceMs}
        isLoading={isLoading}
        clearable={clearable}
        showSearchIcon={showSearchIcon}
        data-qa-id={qaIdBase}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}
