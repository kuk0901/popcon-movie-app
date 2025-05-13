import { TypeOptions } from "react-toastify";
import { create } from "zustand";

export interface Toast {
  message: string;
  type: TypeOptions;
}

interface ToastState {
  toasts: { [id: string]: Toast };
  addToast: (id: string, message: string, type?: TypeOptions) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: {},
  addToast: (id, message, type = "default") =>
    set((state) => ({
      toasts: {
        ...state.toasts,
        [id]: { message, type }
      }
    })),
  removeToast: (id) =>
    set((state) => {
      const newToasts = { ...state.toasts };
      delete newToasts[id];
      return { toasts: newToasts };
    })
}));
