/**
 * quiz_stats 테이블 타입 정의
 * 퀴즈의 조회수, 추천수, 댓글 수 등 통계 정보
 */
export type QuizStatType = {
  quizId: string; // UUID, quizzes 테이블의 id 참조 (Primary Key)
  viewCount?: number | null; // INTEGER, nullable
  likeCount?: number | null; // INTEGER, nullable
  commentCount?: number | null; // INTEGER, nullable
  createdAt: string; // TIMESTAMP (ISO 8601 string)
  updatedAt: string; // TIMESTAMP (ISO 8601 string)
};

/**
 * quiz_stats 테이블 삽입용 타입 (createdAt, updatedAt 제외)
 */
export type QuizStatInsertType = Omit<QuizStatType, 'createdAt' | 'updatedAt'>;

/**
 * quiz_stats 테이블 업데이트용 타입 (quizId, createdAt 제외)
 */
export type QuizStatUpdateType = Omit<QuizStatType, 'quizId' | 'createdAt'>;
