import { supabase } from '@/lib/supabaseClient'
import { QuizUserAnswerInsertType } from '@/types/quiz/quiz_user_answers'

// 퀴즈 답변 저장
async function saveQuizAnswer(answerData: QuizUserAnswerInsertType) {
  try {
    const response = await supabase
      .from('user_quiz_answers')
      .insert(answerData)
      .select()

    return response
  } catch (error) {
    throw error
  }
}

// 유저의 퀴즈 답변 조회
async function getUserQuizAnswer(userId: string, quizId: string) {
  try {
    const response = await supabase
      .from('user_quiz_answers')
      .select('*')
      .eq('userId', userId)
      .eq('quizId', quizId)
      .single()

    return response
  } catch (error) {
    throw error
  }
}

// 유저의 퀴즈 답변 목록 조회
async function getUserQuizAnswers(userId: string, limit = 50) {
  try {
    const response = await supabase
      .from('user_quiz_answers')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(limit)

    return response
  } catch (error) {
    throw error
  }
}

// 유저의 정답률 조회
async function getUserCorrectRate(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_quiz_answers')
      .select('isCorrect')
      .eq('userId', userId)

    if (error) throw error

    const total = data.length
    const correct = data.filter(answer => answer.isCorrect).length
    const correctRate = total > 0 ? (correct / total) * 100 : 0

    return { total, correct, correctRate }
  } catch (error) {
    throw error
  }
}

export {
  getUserCorrectRate, getUserQuizAnswer,
  getUserQuizAnswers, saveQuizAnswer
}

