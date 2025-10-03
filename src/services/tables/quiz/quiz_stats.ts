import { supabase } from '@/lib/supabaseClient'

async function createQuizStats(quizId: number) {
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

async function incrementQuizViewCount(quizId: number) {
  try {
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('viewCount')
      .eq('quizId', quizId)
      .single()

    const response = await supabase
      .from('quiz_stats')
      .update({ viewCount: (current?.viewCount || 0) + 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

async function incrementQuizLikeCount(quizId: number) {
  try {
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('likeCount')
      .eq('quizId', quizId)
      .single()

    const response = await supabase
      .from('quiz_stats')
      .update({ likeCount: (current?.likeCount || 0) + 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

async function decrementQuizLikeCount(quizId: number) {
  try {
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('likeCount')
      .eq('quizId', quizId)
      .single()

    const response = await supabase
      .from('quiz_stats')
      .update({ likeCount: (current?.likeCount || 0) - 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

async function incrementQuizCommentCount(quizId: number) {
  try {
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('commentCount')
      .eq('quizId', quizId)
      .single()

    const response = await supabase
      .from('quiz_stats')
      .update({ commentCount: (current?.commentCount || 0) + 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

async function decrementQuizCommentCount(quizId: number) {
  try {
    const { data: current } = await supabase
      .from('quiz_stats')
      .select('commentCount')
      .eq('quizId', quizId)
      .single()

    const response = await supabase
      .from('quiz_stats')
      .update({ commentCount: (current?.commentCount || 0) - 1 })
      .eq('quizId', quizId)

    return response
  } catch (error) {
    throw error
  }
}

export { createQuizStats, decrementQuizCommentCount, decrementQuizLikeCount, incrementQuizCommentCount, incrementQuizLikeCount, incrementQuizViewCount }

