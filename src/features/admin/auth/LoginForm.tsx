import { useNavigate } from '@tanstack/react-router'
import { LoginFormContent } from './LoginFormContent'

export function AdminLoginForm() {
  const navigate = useNavigate()

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-100 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/assets/images/auth/login-bg.jpg")` }}
    >
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-[2px] pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 w-full max-w-md flex flex-col shadow-2xl rounded-lg overflow-hidden bg-white/95">
        <div className="bg-linear-to-br from-[#52BAD5] to-[#45a5bf] p-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-1 tracking-tight">
            Admin
          </h2>
          <p className="text-base text-white/95 font-light tracking-wide">
            Fleet & Rent Management Platform
          </p>
        </div>

        {/* Left Side - Login Form */}
        <div className="w-full p-6 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8 md:mb-10">
              <h1 className="text-4xl md:text-5xl font-light text-gray-600 mb-1">
                Hello!
              </h1>
              <p className="text-gray-400 text-sm md:text-base">Welcome</p>
            </div>

            <LoginFormContent
              sessionType="admin"
              onSuccess={() => navigate({ to: '/admin' })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
