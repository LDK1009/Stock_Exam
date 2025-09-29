import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizCommentType } from '@/types/quiz/quiz_comments'
import styled from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  comment: QuizCommentType
}

const CommentItem = ({ comment }: PropsType) => {
  const { userId, content } = comment

  return (
    <Container>
      <Author>{userId}</Author>
      <Content>{content}</Content>
      {/* 추천 버튼 */}
      <RecommendeContainer>
        <RecommendeButton>
          <MaterialIcons name='trending-up' size={16} color='white' />
        </RecommendeButton>
        <RecommendeCountText>32</RecommendeCountText>
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

const RecommendeContainer = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'flex-end', 'center')}
  column-gap: 4px;
`

const RecommendeButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 1px solid ${theme.colors.core.white};
`

const RecommendeCountText = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.5);
`
