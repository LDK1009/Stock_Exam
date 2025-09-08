import CommonText from '@/components/display/CommonText'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizType } from '@/types/quiz'
import styled from '@emotion/native'
import '@emotion/react'
import React from 'react'
import { View } from 'react-native'

type PropsType = {
  quiz: QuizType
}

const Quiz = ({ quiz }: PropsType) => {
  return (
    <Container>
      <CommonText size='title' color='default'>
        {quiz.question}
      </CommonText>
      <CommonText size='title' color='default'>
        {quiz.question}
      </CommonText>
    </Container>
  )
}

export default Quiz

const Container = styled(View)`
  width: 100%;
  height: auto;
  padding: 16px;
  background-color: ${theme.colors.background.paper};
  border-radius: ${`${theme.border.radius.md}px`};
  ${mixinFlex('column', 'flex-start', 'flex-start')}
`
