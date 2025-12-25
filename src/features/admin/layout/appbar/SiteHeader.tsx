import { Link } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { LocaleDropdown } from '@/features/shared/LocaleDropdown'
import { LoadingBar } from '@/features/shared/layout/LoadingBar'
import logo from '/assets/images/logo.png'
import { HeaderBreadcrumb } from './HeaderBreadcrumb'
import { HeaderTitle } from './HeaderTitle'
import { NavUser } from './NavUser'
// import { SidebarToggleButton } from './SidebarToggleButton'

function HeaderTopBar() {
  return (
    <div className="flex h-18 w-full items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        {/* <SidebarToggleButton /> */}
      </div>
      <HeaderActions />
    </div>
  )
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <LocaleDropdown className="text-black/95 hover:text-black" />
      {/* <NotificationMenu
        unreadCount={notificationCount}
        notifications={notifications}
        onMarkAsRead={markRead}
      /> */}
      <NavUser />
    </div>
  )
}

function HeaderBottomBar() {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b bg-linear-to-l from-[#3fcce5] to-[#52a9f1] px-14">
      <div className="flex items-center gap-5">
        <Link to="/admin">
          <img src={logo} alt="Logo" />
        </Link>
        <Separator
          orientation="vertical"
          className="h-12! w-[0.3px]! bg-white ml-5"
        />
        <HeaderTitle />
      </div>
      <HeaderBreadcrumb />
    </div>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <LoadingBar />
      <HeaderTopBar />
      <HeaderBottomBar />
    </header>
  )
}
