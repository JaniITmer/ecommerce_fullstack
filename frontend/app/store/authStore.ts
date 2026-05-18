import {create} from "zustand";
import { persist } from 'zustand/middleware';
import {User} from "../types";

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => {
        set({ user });
        if (user) {
          localStorage.setItem('token', user.token);
        } else {
          localStorage.removeItem('token');
        }
      },

      logout: () => {
        set({ user: null });
        localStorage.removeItem('token');
      },

      isAdmin: () => {
        return get().user?.role === 'Admin';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);