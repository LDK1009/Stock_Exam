type QuizCommentType = {
  id: number
  quizId: number
  userId: string
  content: string
  parentId?: number | null
  createdAt: string
  updatedAt: string
}

type QuizCommentInsertType = {
  quizId: number
  userId: string
  parentId?: number | null
  content: string
}

type QuizCommentUpdateType = {
  quizId: number
  userId: string
}

export type { QuizCommentInsertType, QuizCommentType, QuizCommentUpdateType }

