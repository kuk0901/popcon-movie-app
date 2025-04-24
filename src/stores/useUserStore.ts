import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import DOMPurify from "dompurify";

interface UserState {
  userId: string;
  name: string;
}

interface UserActions {
  setUser: (user: Partial<UserState>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        userId: "",
        name: "",
        setUser: (user) =>
          set((state) => ({
            ...state,
            name: DOMPurify.sanitize(user.name || state.name),
            userId: user.userId || state.userId
          })),
        resetUser: () => set({ userId: "", name: "" })
      }),
      { name: "user-store" }
    ),
    { name: "UserStore" }
  )
);
