import { create } from "zustand";

type Store = {
  isAuthOpen: boolean;
  setAuth: (auth: boolean) => void;
};

export const useAuthStore = create<Store>()((set) => ({
  isAuthOpen: false,
  setAuth: (auth) => set(() => ({ isAuthOpen: auth })),
}));
