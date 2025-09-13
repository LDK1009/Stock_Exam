import { QuizListType } from '@/types/quiz/quiz'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  quizList: QuizListType
  setQuizList: (quizzes: QuizListType) => void
}

export const useQuizStore = create<StoreType>((set) => ({
  quizList: [],
  setQuizList: (quizzes) => set({ quizList: quizzes }),
}))
