import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import type { User } from "@/lib/api/auth/types";

type AuthState = {
  adminSession?: User | null;
  fleetSession?: User | null;
  rentSession?: User | null;
  setAdminSession: (s?: User | null) => void;
  setFleetSession: (s?: User | null) => void;
  setRentSession: (s?: User | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persistNSync(
    (set) => ({
      adminSession: null,
      fleetSession: null,
      rentSession: null,
      setAdminSession: (s) => set({ adminSession: s }),
      setFleetSession: (s) => set({ fleetSession: s }),
      setRentSession: (s) => set({ rentSession: s }),
    }),
    {
      name: "auth-storage",
      storage: "localStorage",
      initDelay: 0,
    },
  ),
);
