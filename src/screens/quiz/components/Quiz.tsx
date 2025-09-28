import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import '@emotion/react'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  quiz: QuizType
  index: number
}

const Quiz = ({ quiz, index }: PropsType) => {
  const { setOpen: setOpenQuizPlayer } = useQuizPlayerStore()
  const { setSelectedQuizIndex } = useQuizPlayerStore()

  // 난이도 매핑
  const difficultyMap = {
    1: '쉬움',
    2: '보통',
    3: '어려움',
  }

  // 퀴즈 클릭 핸들러
  function QuizPressHandler() {
    setOpenQuizPlayer(true)
    setSelectedQuizIndex(index)
  }


  ///// 퀴즈 데이터 비구조화할당
  const { category, step, type, difficulty, score, question } = quiz

  ///// 퀴즈 반응 통계
  const { viewCount, likeCount, commentCount } = quiz.quiz_stats || {
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
  }

  return (
    <Container onPress={QuizPressHandler}>
      {/* 헤더 */}
      <Header>
        <HeaderText>{`${category}ㅣ${step}ㅣ${type}`}</HeaderText>
        <HeaderText>{`${difficultyMap[difficulty as keyof typeof difficultyMap]}ㅣ${score}점`}</HeaderText>
      </Header>
      {/* 질문 */}
      <QuestionText numberOfLines={2} ellipsizeMode='tail'>
        {question}
      </QuestionText>
      {/* 푸터 */}
      <Footer>
        <FooterText>조회 {viewCount}</FooterText>
        <FooterText>댓글 {commentCount}</FooterText>
        <FooterText>추천 {likeCount}</FooterText>
      </Footer>
    </Container>
  )
}

export default Quiz

const Container = styled(TouchableOpacity)`
  width: 100%;
  height: auto;
  padding: ${`${theme.spacing.md}px`};

  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: ${`${theme.spacing.sm}px`};

  border-radius: ${`${theme.border.radius.md}px`};
  background-color: ${theme.colors.background.paper};
`

const Header = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'space-between', 'flex-start')}
`

const HeaderText = styled(Text)`
  font-size: ${`${theme.fontSizes.meta}px`};
  color: rgba(255, 255, 255, 0.7);
`

const QuestionText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  color: ${theme.colors.core.white};
`

const Footer = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'flex-start', 'center')}
  column-gap: 10px;
`

const FooterText = styled(Text)`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
`
