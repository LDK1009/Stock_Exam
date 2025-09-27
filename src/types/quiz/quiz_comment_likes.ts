/**
 * quiz_comment_likes 테이블 타입 정의
 * 특정 댓글에 대한 사용자의 좋아요 기록
 */
export type QuizCommentLike = {
  id: string; // UUID
  commentId: string; // UUID, quiz_comments 테이블의 id 참조
  userId: string; // UUID, auth.users 테이블의 id 참조
  createdAt: string; // TIMESTAMP (ISO 8601 string)
};

/**
 * quiz_comment_likes 테이블 삽입용 타입 (id, createdAt 제외)
 */
export type QuizCommentLikeInsert = Omit<QuizCommentLike, 'id' | 'createdAt'>;

/**
 * quiz_comment_likes 테이블 업데이트용 타입 (id, createdAt 제외)
 */
export type QuizCommentLikeUpdate = Omit<QuizCommentLike, 'id' | 'createdAt'>;