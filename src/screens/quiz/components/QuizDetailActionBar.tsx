import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizStatsType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  quiz_stats: QuizStatsType
}

const QuizDetailActionBar = ({ quiz_stats }: PropsType) => {
  async function handleLikePress() {
    console.log('handleLikePress', { quiz_stats })
  }

  async function handleCommentPress() {
    console.log('handleCommentPress', { quiz_stats })
  }

  const {  likeCount, commentCount } = quiz_stats

  return (
    <Container>
      <ActionContainer onPress={handleLikePress}>
        <Feather name='heart' size={24} color={theme.colors.core.white} />
        <ActionText>{likeCount}</ActionText>
      </ActionContainer>
      <ActionContainer onPress={handleCommentPress}>
        <Ionicons name='chatbubble-outline' size={24} color={theme.colors.core.white} />
        <ActionText>{commentCount}</ActionText>
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
