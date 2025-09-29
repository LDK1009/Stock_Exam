import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCommentDrawerStore = create<StoreType>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
