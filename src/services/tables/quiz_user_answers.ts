import { supabase } from '@/lib/supabaseClient'
import { QuizUserAnswerInsertType, QuizUserAnswerUpdateType } from '@/types/quiz/quiz_user_answers'

// 퀴즈 답변 생성
async function createQuizUserAnswer(answerData: QuizUserAnswerInsertType) {
  try {
    const response = await supabase.from('quiz_user_answers').insert(answerData).select()

    return response
  } catch (error) {
    throw error
  }
}

// 퀴즈 답변 업데이트
async function updateQuizUserAnswer(id: string, updateData: QuizUserAnswerUpdateType) {
  try {
    const response = await supabase
      .from('quiz_user_answers')
      .update(updateData)
      .eq('id', id)
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
      .from('quiz_user_answers')
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
      .from('quiz_user_answers')
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
      .from('quiz_user_answers')
      .select('isCorrect')
      .eq('userId', userId)

    if (error) throw error

    const total = data.length
    const correct = data.filter((answer) => answer.isCorrect).length
    const correctRate = total > 0 ? (correct / total) * 100 : 0

    return { total, correct, correctRate }
  } catch (error) {
    throw error
  }
}

export {
  createQuizUserAnswer, getUserCorrectRate, getUserQuizAnswer,
  getUserQuizAnswers, updateQuizUserAnswer
}

