import { supabase } from '@/lib/supabaseClient'
import Quiz from '@/screens/quiz/components/Quiz'
import { useQuizStore } from '@/stores/quiz'
import { mixinContainer, mixinContentContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'

const QuizScreen = () => {
  const { quizList, setQuizzes } = useQuizStore()

  async function getQuiz() {
    const { data, error } = await supabase.from('quizzes').select('*')
    console.log(data, error)
    setQuizzes(data || [])
  }

  useEffect(() => {
    async function fetchQuiz() {
      await getQuiz()
    }

    fetchQuiz()
  }, [])

  return (
    <Container>
      {quizList.map((quiz) => {
        return <Quiz key={quiz.id} quiz={quiz} />
      })}
    </Container>
  )
}

export default QuizScreen

const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinContentContainer(4, 3)}
  ${mixinFlex('column', 'flex-start', 'center')}

  padding-top:16px;
  padding-bottom: 0px;

  background-color: ${theme.colors.background.default};
`
