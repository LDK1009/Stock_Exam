import { supabase } from '@/lib/supabaseClient'
import { QuizCommentInsertType } from '@/types/quiz/quiz_comments'
import { getUserId } from '../auth/auth'
import { decrementQuizCommentCount, incrementQuizCommentCount } from './quiz_stats'

////////// 퀴즈 댓글 가져오기
async function getQuizComments(quizId: string) {
  const response = await supabase.from('quiz_comments').select('*').eq('quizId', quizId)
  return response
}

////////// 퀴즈 댓글 추가하기
async function createQuizComment(params: QuizCommentInsertType) {
  const userId = await getUserId()
  await incrementQuizCommentCount(params.quizId)
  const response = await supabase
    .from('quiz_comments')
    .insert({ ...params, userId })
    .select()
  return response
}

////////// 퀴즈 댓글 삭제하기
async function deleteQuizComment(quizId: string) {
  const userId = await getUserId()
  await decrementQuizCommentCount(quizId)
  const response = await supabase
    .from('quiz_comments')
    .delete()
    .eq('quizId', quizId)
    .eq('userId', userId)
  return response
}

export { createQuizComment, deleteQuizComment, getQuizComments }

