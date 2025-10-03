import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  open: boolean
  setOpen: (open: boolean) => void

  profileCharacterEditModalOpen: boolean
  setProfileCharacterEditModalOpen: (profileCharacterEditModalOpen: boolean) => void
}

export const useProfileEditStore = create<StoreType>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),

  profileCharacterEditModalOpen: false,
  setProfileCharacterEditModalOpen: (profileCharacterEditModalOpen) => set({ profileCharacterEditModalOpen }),
}))
