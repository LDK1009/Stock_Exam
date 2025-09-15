import { supabase } from '@/lib/supabaseClient'
import { QuizType } from '@/types/quiz/quiz'

async function createQuiz(quizData: QuizType) {
  try {
    const response = await supabase.from('quizzes').insert(quizData).select()

    console.log(response)
    return response
  } catch (error) {
    throw error
  }
}

export { createQuiz }

