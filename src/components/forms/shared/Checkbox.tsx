import { useStore } from '@tanstack/react-form'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { useFieldContext } from '@/hooks/forms/base/base.form-components'
import { ErrorMessages } from './ErrorMessages'

export function Checkbox({ label }: { label: string }) {
  const field = useFieldContext<boolean>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  const qaId = field.name
    ?.replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
    .replace(/\s+/g, '_')

  return (
    <div className="flex items-center gap-3 py-2">
      <ShadcnCheckbox
        id={field.name}
        data-qa-id={qaId ? `${qaId}_checkbox` : undefined}
        checked={field.state.value ?? false}
        onCheckedChange={(checked) => {
          field.handleChange(!!checked)
          field.handleBlur()
        }}
        className="size-5 rounded-full border-2 border-gray-400 data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400"
      />
      <label
        htmlFor={field.name}
        className="text-base font-medium text-gray-600 leading-none cursor-pointer"
      >
        {label}
      </label>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}
