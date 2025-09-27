/**
 * user_quiz_answers 테이블 타입 정의
 * 유저의 퀴즈 답변 기록 및 정답 여부 정보
 */
export type UserQuizAnswer = {
  id: string; // UUID, Primary Key
  userId: string; // UUID, auth.users 테이블의 id 참조
  quizId: string; // UUID, quizzes 테이블의 id 참조
  isCorrect: boolean; // BOOLEAN, 정답 여부
  selectedAnswer?: number | null; // INTEGER, 사용자가 선택한 답 (0, 1, 2, 3 등), nullable
  createdAt: string; // TIMESTAMP (ISO 8601 string), 레코드 생성 시간
  updatedAt: string; // TIMESTAMP (ISO 8601 string), 레코드 마지막 업데이트 시간
};

/**
 * user_quiz_answers 테이블 삽입용 타입 (id, answeredAt, createdAt, updatedAt 제외)
 */
export type UserQuizAnswerInsert = Omit<UserQuizAnswer, 'id' | 'answeredAt' | 'createdAt' | 'updatedAt'>;

/**
 * user_quiz_answers 테이블 업데이트용 타입 (id, userId, quizId, answeredAt, createdAt 제외)
 */
export type UserQuizAnswerUpdate = Omit<UserQuizAnswer, 'id' | 'userId' | 'quizId' | 'answeredAt' | 'createdAt'>;
