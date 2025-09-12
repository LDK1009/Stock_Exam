import { mixinContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import CategoryBar from './components/CategoryBar'
import QuizList from './components/QuizList'
import SearchBar from './components/SearchBar'

const QuizScreen = () => {
  return (
    <Container>
      <SearchBar />
      <CategoryBar />
      <QuizList />
    </Container>
  )
}

export default QuizScreen

////////// 스타일링
const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinFlex('column', 'flex-start', 'center')}
  padding: 32px 16px;
  padding-bottom: 0px;
  row-gap: 24px;
  background-color: ${theme.colors.background.default};
`
