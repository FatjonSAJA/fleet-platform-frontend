import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'
import { FormErrorAlert } from '@/components/forms/shared/FormErrorAlert'
import { Button } from '@/components/ui/button'
import { useLogin } from '@/hooks/api/auth/useAuth.ts'
import { useBaseForm } from '@/hooks/forms/base/base.form'
import type { SessionType } from '@/lib/utils/session-type'

interface LoginFormContentProps {
  sessionType: SessionType
  onSuccess?: () => void
}

export function LoginFormContent({
  sessionType,
  onSuccess,
}: LoginFormContentProps) {
  const login = useLogin(sessionType)

  const form = useBaseForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      try {
        await login.mutateAsync({
          email: value.email,
          password: value.password,
        })
        if (onSuccess) {
          onSuccess()
        }
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-5 md:space-y-6"
    >
      <div className="space-y-2">
        <form.AppField
          name="email"
          validators={{
            onChange: z.string().min(1, `Email or Username is required`),
          }}
        >
          {(field) => (
            <field.InputBoxField
              type="text"
              name={field.name}
              placeholder={`Email or Username`}
              className="h-11 md:h-12 border-gray-300 focus:border-[#52BAD5] focus:ring-[#52BAD5]/20 rounded-sm text-sm md:text-base placeholder:text-gray-400"
            />
          )}
        </form.AppField>
      </div>

      <div className="space-y-2">
        <form.AppField
          name="password"
          validators={{
            onChange: z.string().min(1, `Password is required`),
          }}
        >
          {(field) => (
            <field.InputBoxField
              type="password"
              name={field.name}
              placeholder={`Password`}
              className="h-11 md:h-12 border-gray-300 focus:border-[#52BAD5] focus:ring-[#52BAD5]/20 rounded-sm text-sm md:text-base placeholder:text-gray-400"
            />
          )}
        </form.AppField>
      </div>

      <div className="flex items-center space-x-2">
        <form.AppField name="rememberMe">
          {(field) => <field.Checkbox label={`Remember me`} />}
        </form.AppField>
      </div>

      <FormErrorAlert
        error={login.error}
        show={login.isError}
        fallbackMessage={
          <div>Login failed. Please check your credentials and try again.</div>
        }
        data-qa-id="login_error_alert"
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="w-full h-11 md:h-12 text-sm md:text-base"
            data-qa-id="sign_in_btn"
            disabled={!canSubmit || isSubmitting || login.isPending}
          >
            {isSubmitting || login.isPending ? (
              <>
                <span className="animate-spin mr-2">
                  <LoaderCircle />
                </span>
                <div>Signing in...</div>
              </>
            ) : (
              <div>SIGN IN</div>
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
