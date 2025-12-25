import { useNavigate } from '@tanstack/react-router'
import { ChevronDownIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/shared/authStore'

export function NavUser() {
  const adminSession = useAuthStore((state) => state.adminSession)
  const setAdminSession = useAuthStore((state) => state.setAdminSession)
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 px-2 py-0 hover:bg-accent hover:text-accent-foreground"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage
              // src={adminSession?.avatar}
              alt={adminSession?.username}
            />
            <AvatarFallback className="text-xs">
              {adminSession?.email
                ?.split('@')[0]
                .split('.')
                .map((part) => part[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="hidden md:inline text-sm font-medium leading-none">
            {adminSession?.username || adminSession?.email}
          </p>
          <ChevronDownIcon className="h-3 w-3 ml-1" />
          <span className="sr-only">
            <div>User menu</div>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => navigate({ to: '/admin' })}>
          <div>My Profile</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: '/admin' })}>
          <div>Account Settings</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setAdminSession(null)}>
          <div>Log out</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
