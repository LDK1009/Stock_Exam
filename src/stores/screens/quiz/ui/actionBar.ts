import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  // 유저가 좋아요 눌렀던 퀴즈 아이디 리스트
  userLikedList: number[]
  setUserLikedList: (userLikedList: number[]) => void

  // 현재 좋아요 누른 퀴즈 아이디
  userCurrentLikeList: number[]
  setUserCurrentLikeList: (userCurrentLikeList: number[]) => void
}

export const useActionBarStore = create<StoreType>((set) => ({
  // 유저가 좋아요 누른 퀴즈 아이디 리스트
  userLikedList: [],
  setUserLikedList: (userLikedList) => set({ userLikedList }),

  // 현재 좋아요 누른 퀴즈 아이디
  userCurrentLikeList: [],
  setUserCurrentLikeList: (userCurrentLikeList) => set({ userCurrentLikeList }),
  
}))
