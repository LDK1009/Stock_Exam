import CommonText from '@/components/display/CommonText'
import { supabase } from '@/lib/supabaseClient'
import { useQuizStore } from '@/stores/quiz'
import { mixinContainer, mixinContentContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'

const QuizScreen = () => {
  // 대량 삽입 퀴즈 데이터
  const [quizData, setQuizData] = useState([
    {
      category: '재무상태표',
      step: '학습',
      type: '객관식',
      difficulty: '쉬움',
      score: 10,
      question: '재무상태표가 보여주는 정보는?',
      options: ['기업의 미래 성장률', '자산, 부채, 자본의 상태', '주가 변동'],
      tags: ['재무상태표', '자산', '부채'],
      answer: 2,
      explanation: '재무상태표는 특정 시점의 자산, 부채, 자본 상태를 나타낸다.',
    },
    {
      category: '손익계산서',
      step: '학습',
      type: '객관식',
      difficulty: '쉬움',
      score: 10,
      question: '손익계산서가 보여주는 것은?',
      options: ['자산과 부채의 내역', '자본의 변동 추세', '일정 기간의 경영 성과'],
      tags: ['손익계산서', '성과', '회계'],
      answer: 3,
      explanation: '손익계산서는 일정 기간 동안의 수익, 비용, 이익을 보여준다.',
    },
    {
      category: '현금흐름표',
      step: '학습',
      type: '객관식',
      difficulty: '보통',
      score: 20,
      question: '현금흐름표에서 확인할 수 있는 것은?',
      options: ['자본의 규모', '현금 유입과 유출', '자산의 시가'],
      tags: ['현금흐름표', '현금', '재무제표'],
      answer: 2,
      explanation: '현금흐름표는 일정 기간 동안의 현금의 유입과 유출을 보여준다.',
    },
    {
      category: '재무비율',
      step: '학습',
      type: '객관식',
      difficulty: '쉬움',
      score: 10,
      question: 'ROE는 무엇을 의미하는가?',
      options: ['자산회전율', '매출총이익률', '자기자본이익률'],
      tags: ['ROE', '재무비율', '수익성'],
      answer: 3,
      explanation: 'ROE는 자기자본 대비 순이익으로, 주주의 투자 효율성을 보여준다.',
    },
    {
      category: '자본변동표',
      step: '학습',
      type: '객관식',
      difficulty: '어려움',
      score: 30,
      question: '자본변동표가 보여주는 것은?',
      options: ['부채의 증가율', '자산의 감가상각 내역', '자본 항목의 변동 내역'],
      tags: ['자본변동표', '자본', '재무제표'],
      answer: 3,
      explanation: '자본변동표는 일정 기간 동안 자본 항목이 어떻게 변했는지 보여준다.',
    },
    {
      category: '투자판단',
      step: '학습',
      type: '객관식',
      difficulty: '보통',
      score: 20,
      question: 'PER이 의미하는 것은?',
      options: ['부채비율', '주가수익비율', '자산회전율'],
      tags: ['PER', '밸류에이션', '투자판단'],
      answer: 2,
      explanation:
        'PER은 주가를 주당순이익으로 나눈 값으로, 기업의 이익 대비 주가 수준을 보여준다.',
    },
    {
      category: '재무상태표',
      step: '학습',
      type: '객관식',
      difficulty: '쉬움',
      score: 10,
      question: '자산 = 부채 + 자본 이라는 공식은 무엇을 의미하는가?',
      options: ['현금흐름 공식', '영업이익 계산식', '회계의 기본 등식'],
      tags: ['회계등식', '재무상태표', '기초개념'],
      answer: 3,
      explanation: '자산은 부채와 자본의 합으로 이루어져 있다는 회계의 기본 원리를 나타낸다.',
    },
    {
      category: '손익계산서',
      step: '학습',
      type: '객관식',
      difficulty: '어려움',
      score: 30,
      question: '영업이익은 어떻게 계산되는가?',
      options: ['순이익 - 이자비용', '자본총계 - 부채총계', '매출총이익 - 판관비'],
      tags: ['영업이익', '손익계산서', '수익성'],
      answer: 3,
      explanation: '영업이익은 매출총이익에서 판매비와 관리비를 차감한 값이다.',
    },
    {
      category: '현금흐름표',
      step: '학습',
      type: '객관식',
      difficulty: '보통',
      score: 20,
      question: '재무활동현금흐름에 해당하는 것은?',
      options: ['외상매출 회수', '차입금 상환', '재고자산 매입'],
      tags: ['재무활동현금흐름', '현금흐름표', '차입'],
      answer: 2,
      explanation: '재무활동현금흐름에는 차입과 상환, 배당 등이 포함된다.',
    },
    {
      category: '분석원칙',
      step: '학습',
      type: '객관식',
      difficulty: '쉬움',
      score: 10,
      question: '재무제표를 해석할 때 중요한 것은?',
      options: ['여러 해의 추세와 비교', '애널리스트 목표주가', '당일 주가 흐름'],
      tags: ['재무분석', '투자원칙', '추세분석'],
      answer: 1,
      explanation: '재무제표는 단일 수치가 아니라 여러 해의 추세를 비교해야 정확히 해석할 수 있다.',
    },
  ])

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

  async function postQuizzes() {
    const { data, error } = await supabase.from('quizzes').insert(quizData)
    if(!error) {
      console.log('퀴즈 데이터 추가 성공')
    } else {
      console.log('퀴즈 데이터 추가 실패')
    }
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
      {/* {quizList.map((quiz) => {
        return <Quiz key={quiz.id} quiz={quiz} />
      })} */}
      <Button title='퀴즈 데이터 추가' onPress={postQuizzes} />
      <CommonText>{JSON.stringify(quizData)}</CommonText>
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
