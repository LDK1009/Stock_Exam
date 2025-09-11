import { supabase } from '@/lib/supabaseClient'
import { useQuizStore } from '@/stores/quiz'
import { mixinContainer, mixinContentContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import Quiz from './components/Quiz'

const QuizScreen = () => {
  // 퀴즈 데이터
  const { quizList, setQuizzes } = useQuizStore()
  const [authInfo, setAuthInfo] = useState({
    isLoggedIn: false,
    userEmail: '',
    userName: '',
  })

  async function getQuiz() {
    const { data, error } = await supabase.from('quizzes').select('*')
    console.log(data, error)
    setQuizzes(data || [])
  }

  useEffect(() => {
    async function checkAuthAndFetchQuiz() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (!session || error) {
        setAuthInfo({
          isLoggedIn: false,
          userEmail: '',
          userName: '',
        })
      } else {
        setAuthInfo({
          isLoggedIn: true,
          userEmail: session.user.email || '',
          userName: session.user.user_metadata.name || '',
        })
        // 로그인된 경우 퀴즈 데이터 가져오기
        await getQuiz()
      }
    }

    checkAuthAndFetchQuiz()
  }, [])

  return (
    <Container>
      <AuthStatus>
        <AuthText>
          {authInfo.isLoggedIn
            ? `로그인됨 - ${authInfo.userName} (${authInfo.userEmail})`
            : '로그인되지 않음'}
        </AuthText>
      </AuthStatus>
      {/* 퀴즈 리스트 렌더링 */}
      {quizList.map((quiz) => {
        return <Quiz key={quiz.id} quiz={quiz} />
      })}
    </Container>
  )
}

export default QuizScreen

const AuthStatus = styled.View`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${theme.colors.background.paper};
  border-radius: 8px;
`

const AuthText = styled(Text)`
  color: ${theme.colors.core.white};
  font-size: ${theme.fontSizes.body}px;
  text-align: center;
`

const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinContentContainer(4, 3)}
  ${mixinFlex('column', 'flex-start', 'center')}

  padding-top:16px;
  padding-bottom: 0px;

  background-color: ${theme.colors.background.default};
`
