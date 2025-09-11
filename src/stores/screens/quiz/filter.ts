import { create } from 'zustand'

// 정렬 옵션 타입
type OrderByOption = 'createdAt:desc' | 'createdAt:asc' | 'difficulty:desc' | 'difficulty:asc'

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
  orderBy: OrderByOption

  // 필터 설정
  setSearchValue: (value: string) => void
  setCategory: (value: string) => void
  setDifficulty: (value: string) => void
  setType: (value: string) => void
  setOrderBy: (value: OrderByOption) => void

  // 필터 초기화
  clearFilters: () => void
}

export const useQuizFilterStore = create<StoreType>((set) => ({
  // 검색어 입력값 초기값
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value || "" }),
  clearInputValue: () => set({ inputValue: "" }),

  // 필터 초기값
  searchValue: "",
  category: "",
  difficulty: "",
  type: "",
  orderBy: "createdAt:desc",

  // 필터 설정 함수
  setSearchValue: (value) => set({ searchValue: value || "" }),
  setCategory: (value) => set({ category: value }),
  setDifficulty: (value) => set({ difficulty: value }),
  setType: (value) => set({ type: value }),
  setOrderBy: (value) => set({ orderBy: value }),

  // 필터 초기화 함수
  clearFilters: () => set({
    searchValue: "",
    category: "",
    difficulty: "",
    type: "",
    orderBy: "createdAt:desc"
  })
}))
