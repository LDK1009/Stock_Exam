import { create } from 'zustand'

type StoreType = {
  // 좋아요 목록
  userLikedList: number[]
  // 좋아요 목록 설정
  setUserLikedList: (userLikedList: number[]) => void

  // 좋아요 목록 추가
  addUserLikedList: (postId: number) => void
  // 좋아요 목록 제거
  removeUserLikedList: (postId: number) => void
}

export const usePostDetailFooterStore = create<StoreType>((set) => ({
  // 좋아요 목록
  userLikedList: [],

  // 좋아요 목록 설정
  setUserLikedList: (userLikedList) => set({ userLikedList }),

  // 좋아요 목록 추가
  addUserLikedList: (postId) => {
    set((state) => ({ userLikedList: [...state.userLikedList, postId] }))
  },
  // 좋아요 목록 제거
  removeUserLikedList: (postId) => {
    set((state) => ({ userLikedList: state.userLikedList.filter((id) => id !== postId) }))
  },
}))
