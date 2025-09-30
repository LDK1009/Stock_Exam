////////// quiz_comments 테이블 타입 정의
type QuizCommentType = {
  id: string // UUID
  quizId: string // UUID, quizzes 테이블의 id 참조
  userId: string // UUID, auth.users 테이블의 id 참조
  content: string // TEXT
  parentId?: string | null // UUID, 자기 자신(quiz_comments)의 id 참조 (대댓글용), nullable
  createdAt: string // TIMESTAMP (ISO 8601 string)
  updatedAt: string // TIMESTAMP (ISO 8601 string)
}

////////// quiz_comments 테이블 삽입용 타입 (id, createdAt, updatedAt 제외)
type QuizCommentInsertType = {
  quizId: string
  userId: string
  parentId?: string | null
  content: string
}

////////// quiz_comments 테이블 업데이트용 타입 (id, createdAt 제외)
type QuizCommentUpdateType = {
  quizId: string
  userId: string
}

export type { QuizCommentInsertType, QuizCommentType, QuizCommentUpdateType }

