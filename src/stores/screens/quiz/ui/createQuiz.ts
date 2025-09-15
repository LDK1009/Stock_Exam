import { produce } from 'immer'
import { create } from 'zustand'

type QuizDataType = {
  category: string
  difficulty: number | null
  // 고급
  step: '학습' | '실천' | '고찰' | '응용'
  type: '객관식' | 'OX'
  score: 10 | 20 | 30
  tags: string[]
  //
  question: string
  options: string[]
  answer: 1 | 2 | 3 | null
  explanation: string
}

type StoreType = {
  open: boolean
  setOpen: (open: boolean) => void

  quizData: QuizDataType

  setQuizDataProperty: <KEY extends keyof QuizDataType>(
    property: KEY,
    value: QuizDataType[KEY]
  ) => void

  setQuizDataOptionProperty: (index: number, value: string) => void

  clearQuizData: () => void
}

export const useCreateQuizStore = create<StoreType>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),

  quizData: {
    category: '',
    difficulty: null,
    step: '학습',
    type: '객관식',
    score: 10,
    tags: ['주식고사', '퀴즈', '사용자제작'],
    question: '',
    options: [],
    answer: null,
    explanation: '',
  },

  setQuizDataProperty: (property, value) =>
    set((state) => ({
      quizData: { ...state.quizData, [property]: value },
    })),

  setQuizDataOptionProperty: (index, value) =>
    set(
      produce((state) => {
        state.quizData.options[index] = value
      })
    ),

  clearQuizData: () =>
    set({
      quizData: {
        category: '',
        difficulty: null,
        step: '학습',
        type: '객관식',
        score: 10,
        tags: ['주식고사', '퀴즈', '사용자제작'],
        question: '',
        options: [],
        answer: null,
        explanation: '',
      },
    }),
}))
