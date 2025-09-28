import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  quizId: number
}

const QuizDetailActionBar = ({ quizId }: PropsType) => {
  async function handleLikePress() {
    console.log('handleLikePress', { quizId })
  }

  async function handleCommentPress() {
    console.log('handleCommentPress', { quizId })
  }

  return (
    <Container>
      <ActionContainer onPress={handleLikePress}>
        <Feather name='heart' size={24} color={theme.colors.core.white} />
        <ActionText>10</ActionText>
      </ActionContainer>
      <ActionContainer onPress={handleCommentPress}>
        <Ionicons name='chatbubble-outline' size={24} color={theme.colors.core.white} />
        <ActionText>10</ActionText>
      </ActionContainer>
    </Container>
  )
}

export default QuizDetailActionBar

const Container = styled(View)`
  ${mixinFlex('row', 'flex-end', 'center')}
  column-gap: 16px;
  width: 100%;
`

const ActionContainer = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;
`

const ActionText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: 400;
  color: ${theme.colors.core.white};
`
