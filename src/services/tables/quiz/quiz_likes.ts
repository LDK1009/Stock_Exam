import { supabase } from '@/lib/supabaseClient'
import { getUserId } from '../../auth/auth'
import { decrementQuizLikeCount, incrementQuizLikeCount } from './quiz_stats'

async function getUserQuizLikes() {
  try {
    const userId = await getUserId()
    const response = await supabase.from('quiz_likes').select('*').eq('userId', userId)
    return response
  } catch (error) {
    throw error
  }
}

async function createQuizLike(quizId: number) {
  try {
    await incrementQuizLikeCount(quizId)
    const userId = await getUserId()
    const response = await supabase.from('quiz_likes').insert({ quizId, userId }).select()

    return response
  } catch (error) {
    throw error
  }
}

async function deleteQuizLike(quizId: number) {
  try {
    await decrementQuizLikeCount(quizId)
    const userId = await getUserId()
    const response = await supabase
      .from('quiz_likes')
      .delete()
      .eq('quizId', quizId)
      .eq('userId', userId)
      .select()

    return response
  } catch (error) {
    throw error
  }
}

export { createQuizLike, deleteQuizLike, getUserQuizLikes }

