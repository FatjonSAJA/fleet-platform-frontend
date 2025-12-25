import { create } from "zustand";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface SidebarState {
  open: boolean;
  openMobile: boolean;
  isMobile: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  setOpenMobile: (value: boolean | ((prev: boolean) => boolean)) => void;
  setIsMobile: (value: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  open: true,
  openMobile: false,
  isMobile: false,
  setOpen: (value) =>
    set((state) => {
      const newOpen = typeof value === "function" ? value(state.open) : value;
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${newOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      return { open: newOpen };
    }),
  setOpenMobile: (value) =>
    set((state) => ({
      openMobile: typeof value === "function" ? value(state.openMobile) : value,
    })),
  setIsMobile: (value) => set({ isMobile: value }),
  toggleSidebar: () => {
    const { isMobile, open, openMobile } = get();
    if (isMobile) {
      set({ openMobile: !openMobile });
    } else {
      const newOpen = !open;
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${newOpen}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      set({ open: newOpen });
    }
  },
}));
