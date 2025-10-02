export type QuizLikeType = {
  id: number;
  quizId: number;
  userId: string;
  createdAt: string;
};

export type QuizLikeInsertType = Omit<QuizLikeType, 'id' | 'createdAt'>;

export type QuizLikeUpdateType = Omit<QuizLikeType, 'id' | 'createdAt'>;
