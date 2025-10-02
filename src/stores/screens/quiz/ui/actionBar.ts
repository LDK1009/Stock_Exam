import { getUserQuizLikes } from '@/services/tables/quiz_likes'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  // 유저가 좋아요 눌렀던 퀴즈 아이디 리스트
  userLikedList: string[]
  setUserLikedList: (userLikedList: string[]) => void
  fetchUserLikedList: () => Promise<void>
  addUserLikedList: (quizId: string) => void
  removeUserLikedList: (quizId: string) => void
}

export const useActionBarStore = create<StoreType>((set) => ({
  // 유저가 좋아요 누른 퀴즈 아이디 리스트
  userLikedList: [],
  setUserLikedList: (userLikedList) => set({ userLikedList }),
  fetchUserLikedList: async () => {
    const { data: userLikedList } = await getUserQuizLikes()
    set({ userLikedList: userLikedList?.map((item) => item.quizId.toString()) || [] })
  },
  addUserLikedList: (quizId) => {
    set((state) => ({ userLikedList: [...state.userLikedList, quizId] }))
  },
  removeUserLikedList: (quizId) => {
    set((state) => ({ userLikedList: state.userLikedList.filter((id) => id !== quizId) }))
  },
}))
