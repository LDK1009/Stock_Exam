import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  tab: '맞춘 문제' | '틀린 문제'

  setTab: (value: '맞춘 문제' | '틀린 문제') => void
}

export const useLearningOverviewStore = create<StoreType>((set) => ({
  // 카테고리 초기값
  tab: '맞춘 문제',
  setTab: (value) => set({ tab: value }),
}))
