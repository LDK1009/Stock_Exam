export type QuizCommentLikeType = {
  id: number;
  commentId: number;
  userId: string;
  createdAt: string;
};

export type QuizCommentLikeInsertType = Omit<QuizCommentLikeType, 'id' | 'createdAt'>;

export type QuizCommentLikeUpdateType = Omit<QuizCommentLikeType, 'id' | 'createdAt'>;