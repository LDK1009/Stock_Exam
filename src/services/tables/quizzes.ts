import { supabase } from '@/lib/supabaseClient'
import { QuizType } from '@/types/quiz/quiz'
import { createQuizStats } from './quiz_stats'

async function createQuiz(quizData: QuizType) {
  try {
    // 퀴즈 생성
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert(quizData)
      .select()
      .single()

    if (quizError) throw quizError

    // 퀴즈 스탯 생성
    await createQuizStats(quiz.id.toString())

    return { data: quiz, error: null }
  } catch (error) {
    throw error
  }
}

export { createQuiz }

