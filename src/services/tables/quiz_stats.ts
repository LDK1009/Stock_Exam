import { supabase } from '@/lib/supabaseClient'

// 퀴즈 스탯 생성
async function createQuizStats(quizId: string) {
  try {
    const response = await supabase
      .from('quiz_stats')
      .insert({
        quizId,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      })
      .select()

    return response
  } catch (error) {
    throw error
  }
}

////////// 퀴즈 조회수 증가
async function incrementQuizViewCount(quizId: string) {
  try {
    // 현재 조회수 가져오기
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('viewCount')
      .eq('quizId', quizId)
      .single()

    // 조회수 1 증가
    const response = await supabase
      .from('quiz_stats')
      .update({ viewCount: (current?.viewCount || 0) + 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

////////// 퀴즈 추천수 증가
async function incrementQuizLikeCount(quizId: number) {
  try {
    // 현재 추천수 가져오기
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('likeCount')
      .eq('quizId', quizId)
      .single()

    // 추천수 1 증가
    const response = await supabase
      .from('quiz_stats')
      .update({ likeCount: (current?.likeCount || 0) + 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

////////// 퀴즈 추천수 감소
async function decrementQuizLikeCount(quizId: number) {
  try {
    // 현재 추천수 가져오기
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('likeCount')
      .eq('quizId', quizId)
      .single()

    // 추천수 1 감소
    const response = await supabase
      .from('quiz_stats')
      .update({ likeCount: (current?.likeCount || 0) - 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

export { createQuizStats, decrementQuizLikeCount, incrementQuizLikeCount, incrementQuizViewCount }

