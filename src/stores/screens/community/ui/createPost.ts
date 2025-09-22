import { CommunityCategoryType } from '@/types/community/community'
import { create } from 'zustand'

type StoreType = {
  open: boolean
  setOpen: (open: boolean) => void

  category: CommunityCategoryType | null
  setCategory: (value: CommunityCategoryType) => void

  title: string
  setTitle: (value: string) => void

  content: string
  setContent: (value: string) => void
}

export const useCreatePostStore = create<StoreType>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),

  category: null,
  setCategory: (value) => set({ category: value }),

  title: '',
  setTitle: (value) => set({ title: value }),

  content: '',
  setContent: (value) => set({ content: value }),
}))
