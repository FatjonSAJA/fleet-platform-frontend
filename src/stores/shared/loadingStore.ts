import { create } from "zustand";

interface LoadingState {
  activeRequests: number;
  isLoading: boolean;
  startRequest: () => void;
  endRequest: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  activeRequests: 0,
  isLoading: false,
  startRequest: () =>
    set((state) => ({
      activeRequests: state.activeRequests + 1,
      isLoading: true,
    })),
  endRequest: () =>
    set((state) => {
      const newCount = Math.max(0, state.activeRequests - 1);
      return {
        activeRequests: newCount,
        isLoading: newCount > 0,
      };
    }),
}));
