"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useToastStore } from "@/stores/useToastStore";
import { useShallow } from "zustand/shallow";

export default function ToastRenderer({ ids }: Readonly<{ ids: string[] }>) {
  const toasts = useToastStore(
    useShallow((state) => ids.map((id) => state.toasts[id]))
  );
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    ids.forEach((id, idx) => {
      const toastState = toasts[idx];
      if (toastState?.message) {
        toast(toastState.message, {
          toastId: id,
          type: toastState.type || "default",
          onClose: () => removeToast(id)
        });
        removeToast(id);
      }
    });
  }, [JSON.stringify(toasts), JSON.stringify(ids), removeToast]);

  return null;
}
