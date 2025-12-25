import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { create } from "zustand";

export type AlertType = "error" | "warning" | "success" | "info";

export type AlertConfig = {
  title: string;
  children?: ReactNode;
  type?: AlertType;
  icon?: LucideIcon;
  iconColor?: string;
  timer?: number;
  customClass?: string;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  confirmButtonClass?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type AlertState = {
  alert: AlertConfig | null;
  isOpen: boolean;
  show: (config: AlertConfig) => void;
  close: () => void;
  confirm: () => void;
  cancel: () => void;
};

export const useAlertStore = create<AlertState>((set, get) => ({
  alert: null,
  isOpen: false,
  show: (config) =>
    set({
      alert: config,
      isOpen: true,
    }),
  close: () =>
    set({
      alert: null,
      isOpen: false,
    }),
  confirm: () => {
    const { alert, close } = get();
    if (alert?.onConfirm) {
      alert.onConfirm();
    }
    close();
  },
  cancel: () => {
    const { alert, close } = get();
    if (alert?.onCancel) {
      alert.onCancel();
    }
    close();
  },
}));
