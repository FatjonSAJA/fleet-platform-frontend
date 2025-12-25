import { SidebarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/stores/shared/sidebarStore'

export function SidebarToggleButton() {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar)

  return (
    <Button
      className="h-8 w-8"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
    >
      <SidebarIcon />
    </Button>
  )
}
