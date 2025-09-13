import { QuizSortType } from '@/types/quiz'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  // 검색어 입력값
  inputValue: string
  setInputValue: (value: string) => void
  clearInputValue: () => void

  // 검색 필터
  searchValue: string
  category: string
  difficulty: string
  type: string

  // 정렬 필터
  sort: QuizSortType

  // 필터 설정
  setSearchValue: (value: string) => void
  setCategory: (value: string) => void
  setDifficulty: (value: string) => void
  setType: (value: string) => void
  setSort: (value: QuizSortType) => void

  // 필터 초기화
  clearFilters: () => void
}

export const useQuizFilterStore = create<StoreType>((set) => ({
  // 검색어 입력값 초기값
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value || '' }),
  clearInputValue: () => set({ inputValue: '' }),

  // 필터 초기값
  searchValue: '',
  category: '전체',
  difficulty: '',
  type: '',

  // 정렬 필터 초기값
  sort: '인기순',

  // 필터 설정 함수
  setSearchValue: (value) => set({ searchValue: value || '' }),
  setCategory: (value) => set({ category: value }),
  setDifficulty: (value) => set({ difficulty: value }),
  setType: (value) => set({ type: value }),

  // 정렬 필터 설정 함수
  setSort: (value) => set({ sort: value }),

  // 필터 초기화 함수
  clearFilters: () =>
    set({
      searchValue: '',
      category: '',
      difficulty: '',
      type: '',
      sort: '인기순',
    }),
}))
