import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStore {
  searchTerms: string[];
  addSearchTerm: (term: string) => void;
  removeSearchTermByIndex: (index: number) => void;
  clearSearchTerms: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      searchTerms: [],
      addSearchTerm: (term: string) => {
        if (!term.trim()) return;
        const current = get().searchTerms;
        // 최근 검색어 맨 앞, 중복 제거, 최대 10개
        const updated = [term, ...current.filter((t) => t !== term)].slice(
          0,
          10
        );
        set({ searchTerms: updated });
      },
      removeSearchTermByIndex: (index: number) => {
        const current = get().searchTerms;
        set({ searchTerms: current.filter((_, i) => i !== index) });
      },
      clearSearchTerms: () => set({ searchTerms: [] })
    }),
    { name: "search-terms" }
  )
);
