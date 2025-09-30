import { getQuizComments } from '@/services/tables/quiz_comments'
import { QuizCommentType } from '@/types/quiz/quiz_comments'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  quizId: string
  setQuizId: (quizId: string) => void

  open: boolean
  setOpen: (open: boolean) => void

  comments: QuizCommentType[]
  setComments: (comments: QuizCommentType[]) => void
  addComments: (comment: QuizCommentType) => void
  fetchComments: (quizId: string) => void

  inputComment: string
  setInputComment: (inputComment: string) => void
  clearInputComment: () => void
}

export const useCommentDrawerStore = create<StoreType>((set) => ({
  quizId: '',
  setQuizId: (quizId) => set({ quizId }),

  open: false,
  setOpen: (open) => set({ open }),

  comments: [],
  setComments: (comments) => set({ comments }),
  addComments: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  
  fetchComments: async (quizId) => {
    const response = await getQuizComments(quizId)
    set({ comments: response.data || [] })
  },

  inputComment: '',
  setInputComment: (inputComment) => set({ inputComment }),
  clearInputComment: () => set({ inputComment: '' }),
}))
