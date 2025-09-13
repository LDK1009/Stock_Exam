import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  open: boolean
  setOpen: (open: boolean) => void

  selectedQuizIndex: number
  setSelectedQuizIndex: (index: number) => void
}

export const useQuizPlayerStore = create<StoreType>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),

  selectedQuizIndex: 0,
  setSelectedQuizIndex: (index) => set({ selectedQuizIndex: index }),
}))
