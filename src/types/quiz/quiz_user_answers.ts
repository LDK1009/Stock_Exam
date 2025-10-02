export type QuizUserAnswerType = {
  id: number 
  userId: string 
  quizId: number 
  isCorrect: boolean 
  selectedAnswer?: number | null 
  attemptCount: number 
  createdAt: string
  updatedAt: string
}

export type QuizUserAnswerInsertType = Omit<QuizUserAnswerType, 'id' | 'createdAt' | 'updatedAt'>

export type QuizUserAnswerUpdateType = Omit<
  QuizUserAnswerType,
  'id' | 'userId' | 'quizId' | 'createdAt' | 'updatedAt'
>
