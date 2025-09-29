import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  open: boolean
  setOpen: (open: boolean) => void
  
  isFirst: boolean
  setIsFirst: (isFirst: boolean) => void

  selectedQuizIndex: number
  setSelectedQuizIndex: (index: number) => void
}

export const useQuizPlayerStore = create<StoreType>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),

  isFirst: true,
  setIsFirst: (isFirst) => set({ isFirst }),

  selectedQuizIndex: 0,
  setSelectedQuizIndex: (index) => set({ selectedQuizIndex: index }),
}))
