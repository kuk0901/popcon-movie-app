import { create } from "zustand";

interface ToastState {
  toast: string;
  showToast: (toast: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toast: "",
  showToast: (toast) => set({ toast: toast }),
  hideToast: () => set({ toast: "" })
}));
