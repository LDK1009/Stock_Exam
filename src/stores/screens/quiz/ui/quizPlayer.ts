import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  ////////// 모달 관리
  open: boolean
  setOpen: (open: boolean) => void
  
  ////////// 첫 퀴즈 여부 관리
  isFirst: boolean
  setIsFirst: (isFirst: boolean) => void

  ////////// 선택한 퀴즈 인덱스 관리
  selectedQuizIndex: number
  setSelectedQuizIndex: (index: number) => void
}

export const useQuizPlayerStore = create<StoreType>((set) => ({
  ////////// 모달 관리
  open: false,
  setOpen: (open) => set({ open }),

  ////////// 첫 퀴즈 여부 관리
  isFirst: true,
  setIsFirst: (isFirst) => set({ isFirst }),

  ////////// 선택한 퀴즈 인덱스 관리
  selectedQuizIndex: 0,
  setSelectedQuizIndex: (index) => set({ selectedQuizIndex: index }),
}))
