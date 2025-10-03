import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizCommentType } from '@/types/quiz/quiz_comments'
import styled from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

type PropsType = {
  comment: QuizCommentType
}

const CommentItem = ({ comment }: PropsType) => {
  const { content, users } = comment
  const { nickname } = users || {}

  async function handleRecommendePress() {
    Toast.show({
      type: 'info',
      text1: '준비중인 기능입니다.',
    })
  }

  const isLiked = false

  return (
    <Container>
      <Author>{nickname}</Author>
      <Content>{content}</Content>
      {/* 추천 버튼 */}
      <RecommendeContainer onPress={handleRecommendePress}>
        <RecommendeButton isLiked={isLiked} onPress={handleRecommendePress}>
          <MaterialIcons
            name='trending-up'
            size={16}
            color={isLiked ? theme.colors.core.white : 'rgba(255,255,255,0.5)'}
          />
        </RecommendeButton>
        <RecommendeCountText isLiked={isLiked}>0</RecommendeCountText>
      </RecommendeContainer>
    </Container>
  )
}

export default CommentItem

const Container = styled(View)`
  width: 100%;
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 8px;
`

const Author = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`

const Content = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};
`

const RecommendeContainer = styled(TouchableOpacity)`
  width: 100%;
  ${mixinFlex('row', 'flex-end', 'center')}
  column-gap: 4px;
`

type RecommendeButtonProps = {
  isLiked: boolean
}

const RecommendeButton = styled(TouchableOpacity)<RecommendeButtonProps>`
  ${mixinFlex('row', 'center', 'center')}
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isLiked }) => (isLiked ? theme.colors.core.white : 'rgba(255,255,255,0.5)')};
`

type RecommendeCountTextProps = {
  isLiked: boolean
}

const RecommendeCountText = styled(Text)<RecommendeCountTextProps>`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${({ isLiked }) => (isLiked ? theme.colors.core.white : 'rgba(255,255,255,0.5)')};
`
