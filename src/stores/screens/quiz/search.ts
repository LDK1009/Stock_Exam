import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  inputValue: string
  setInputValue: (value: string) => void

  searchValue: string
  setSearchValue: (value: string) => void

  clearInputValue: () => void
}

export const useQuizSearchStore = create<StoreType>((set) => ({
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value || "" }),

  searchValue: "",
  setSearchValue: (value) => set({ searchValue: value || "" }),

  clearInputValue: () => set({ inputValue: "" }),
}))
