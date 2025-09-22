import { CommunityCategoryType } from '@/types/community/community'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  category: CommunityCategoryType

  setCategory: (value: CommunityCategoryType) => void

  // 필터 초기화
  initCategory: () => void
}

export const useCommunityFilterStore = create<StoreType>((set) => ({
  // 카테고리 초기값
  category: '자유게시판',
  setCategory: (value) => set({ category: value }),
  initCategory: () => set({ category: '자유게시판' }),
}))
