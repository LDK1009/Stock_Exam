import { supabase } from '@/lib/supabaseClient'
import { QuizCommentInsertType } from '@/types/quiz/quiz_comments'
import { getUserId } from '../../auth/auth'
import { decrementQuizCommentCount, incrementQuizCommentCount } from './quiz_stats'

async function getQuizComments(quizId: number) {
  const response = await supabase.from('quiz_comments').select('*').eq('quizId', quizId)
  return response
}

async function createQuizComment(params: QuizCommentInsertType) {
  const userId = await getUserId()
  await incrementQuizCommentCount(params.quizId)
  const response = await supabase
    .from('quiz_comments')
    .insert({ ...params, userId })
    .select()
  return response
}

async function deleteQuizComment(quizId: number) {
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

