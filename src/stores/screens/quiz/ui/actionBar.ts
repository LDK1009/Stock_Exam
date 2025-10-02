import { getUserQuizLikes } from '@/services/tables/quiz_likes'
import { create } from 'zustand'

type StoreType = {
  userLikedList: number[]
  setUserLikedList: (userLikedList: number[]) => void
  fetchUserLikedList: () => Promise<void>
  addUserLikedList: (quizId: number) => void
  removeUserLikedList: (quizId: number) => void
}

export const useActionBarStore = create<StoreType>((set) => ({
  userLikedList: [],
  setUserLikedList: (userLikedList) => set({ userLikedList }),
  fetchUserLikedList: async () => {
    const { data: userLikedList } = await getUserQuizLikes()
    set({ userLikedList: userLikedList?.map((item) => item.quizId) || [] })
  },
  addUserLikedList: (quizId) => {
    set((state) => ({ userLikedList: [...state.userLikedList, quizId] }))
  },
  removeUserLikedList: (quizId) => {
    set((state) => ({ userLikedList: state.userLikedList.filter((id) => id !== quizId) }))
  },
}))
