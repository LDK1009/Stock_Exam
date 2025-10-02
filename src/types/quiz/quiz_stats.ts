export type QuizStatType = {
  quizId: number;
  viewCount?: number | null;
  likeCount?: number | null;
  commentCount?: number | null;
  createdAt: string; 
  updatedAt: string;
};

export type QuizStatInsertType = Omit<QuizStatType, 'createdAt' | 'updatedAt'>;

export type QuizStatUpdateType = Omit<QuizStatType, 'quizId' | 'createdAt'>;
