import { QuizListType } from '@/types/quiz'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  quizList: QuizListType
  setQuizzes: (quizzes: QuizListType) => void
}

export const useQuizStore = create<StoreType>((set) => ({
  quizList: [],
  setQuizzes: (quizzes) => set({ quizList: quizzes }),
}))
