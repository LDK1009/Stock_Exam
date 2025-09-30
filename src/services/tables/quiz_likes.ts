import { supabase } from '@/lib/supabaseClient'
import { getUserId } from '../auth/auth'
import { decrementQuizLikeCount, incrementQuizLikeCount } from './quiz_stats'

////////// 퀴즈 좋아요 내역 가져오기
async function getUserQuizLikes() {
  try {
    const userId = await getUserId()
    const response = await supabase.from('quiz_likes').select('*').eq('userId', userId)
    return response
  } catch (error) {
    throw error
  }
}

////////// 퀴즈 좋아요 생성
async function createQuizLike(quizId: number) {
  try {
    // 추천수 1 증가
    await incrementQuizLikeCount(quizId)
    // 사용자 ID 가져오기
    const userId = await getUserId()
    // 좋아요 생성
    const response = await supabase.from('quiz_likes').insert({ quizId, userId }).select()

    return response
  } catch (error) {
    throw error
  }
}

////////// 퀴즈 좋아요 삭제
async function deleteQuizLike(quizId: number) {
  try {
    // 추천수 1 감소
    await decrementQuizLikeCount(quizId)
    // 사용자 ID 가져오기
    const userId = await getUserId()
    // 좋아요 삭제
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

