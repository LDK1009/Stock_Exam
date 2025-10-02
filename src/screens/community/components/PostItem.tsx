import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { PostType } from '@/types/community/community'
import styled from '@emotion/native'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  post: PostType
}

const PostItem = ({ post }: PropsType) => {
  const { id, users, title, post_stats } = post
  const {viewCount, likeCount, commentCount} = post_stats || {};

  const { nickname } = users || {}

  return (
    <Container onPress={() => router.push(`/community/post/${id}`)}>
      <Author>{nickname}</Author>
      <Title numberOfLines={2}>{title}</Title>
      <Footer>
        <FooterText>조회 {viewCount}</FooterText>
        <FooterText>댓글 {commentCount}</FooterText>
        <FooterText>추천 {likeCount}</FooterText>
      </Footer>
    </Container>
  )
}

export default PostItem

const Container = styled(TouchableOpacity)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}

  width: 100%;

  row-gap: 8px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${theme.colors.background.paper};
`

const Author = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`

const Title = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
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
