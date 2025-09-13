import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizType } from '@/types/quiz'
import styled from '@emotion/native'
import '@emotion/react'
import React from 'react'
import { Text, View } from 'react-native'

type PropsType = {
  quiz: QuizType
}

const Quiz = ({ quiz }: PropsType) => {

  // 난이도 매핑
  const difficultyMap = {
    1: '쉬움',
    2: '보통',
    3: '어려움',
  }

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <HeaderText>{`${quiz.category}ㅣ${quiz.step}ㅣ${quiz.type}`}</HeaderText>
        <HeaderText>{`${difficultyMap[quiz.difficulty as keyof typeof difficultyMap]}ㅣ${quiz.score}점`}</HeaderText>
      </Header>
      {/* 질문 */}
      <QuestionText numberOfLines={2} ellipsizeMode='tail'>
        {quiz.question}
      </QuestionText>
      {/* 푸터 */}
      <Footer>
        <FooterText>조회 1.2k</FooterText>
        <FooterText>댓글 34</FooterText>
        <FooterText>추천 87</FooterText>
      </Footer>
    </Container>
  )
}

export default Quiz

const Container = styled(View)`
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
