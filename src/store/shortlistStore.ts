import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShortlistProfile } from "@/types";

interface ShortlistState {
  profiles: ShortlistProfile[];
  isOpen: boolean;
  addProfile: (profile: ShortlistProfile) => boolean; // returns true if added, false if duplicate
  removeProfile: (userId: string) => void;
  isInShortlist: (userId: string) => boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  clearAll: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      profiles: [],
      isOpen: false,

      addProfile: (profile) => {
        const exists = get().profiles.some((p) => p.user_id === profile.user_id);
        if (exists) return false;
        set((state) => ({ profiles: [...state.profiles, profile] }));
        return true;
      },

      removeProfile: (userId) => {
        set((state) => ({
          profiles: state.profiles.filter((p) => p.user_id !== userId),
        }));
      },

      isInShortlist: (userId) => {
        return get().profiles.some((p) => p.user_id === userId);
      },

      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      closeDrawer: () => set({ isOpen: false }),
      clearAll: () => set({ profiles: [] }),
    }),
    {
      name: "influencer-shortlist",
      // Only persist profiles, not UI state
      partialize: (state) => ({ profiles: state.profiles }),
    }
  )
);
