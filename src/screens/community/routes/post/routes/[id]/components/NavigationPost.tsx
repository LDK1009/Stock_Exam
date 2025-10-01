import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { PostType } from '@/types/community/community'
import styled from '@emotion/native'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  post: PostType
  navigate: 'prev' | 'next'
}

const NavigationPost = ({ post, navigate }: PropsType) => {
  const { title } = post

  const handleNavigate = () => {
    if (navigate === 'prev') {
    } else {
    }
  }

  return (
    <Container onPress={handleNavigate}>
      {/* 이전 아이콘 */}
      {navigate === 'prev' && (
        <FontAwesome name='arrow-circle-o-left' size={24} color='rgba(255, 255, 255, 0.5)' />
      )}

      {/* 게시물 */}
      <PostContainer navigate={navigate}>
        <Title navigate={navigate} numberOfLines={1}>
          {title}
        </Title>
        {/* 조회, 댓글, 추천 수 */}
        <CountContainer>
          <CountText>조회 {32}</CountText>
          <CountText>댓글 {32}</CountText>
          <CountText>추천 {32}</CountText>
        </CountContainer>
      </PostContainer>

      {/* 다음 아이콘 */}
      {navigate === 'next' && (
        <FontAwesome name='arrow-circle-o-right' size={24} color='rgba(255, 255, 255, 0.5)' />
      )}
    </Container>
  )
}

export default NavigationPost

type CommonProps = {
  navigate: 'prev' | 'next'
}

const Container = styled(TouchableOpacity)`
  width: 100%;
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 16px;
`

const PostContainer = styled(View)<CommonProps>`
  ${({ navigate }) =>
    navigate === 'prev'
      ? mixinFlex('column', 'flex-start', 'flex-start')
      : mixinFlex('column', 'flex-start', 'flex-end')}
  flex:1;

  background-color: ${theme.colors.background.paper};
  padding: 8px 16px;
  border-radius: 8px;
  row-gap: 4px;
`

const Title = styled(Text)<CommonProps>`
  width: 100%;
  text-align: ${({ navigate }) => (navigate === 'prev' ? 'left' : 'right')};

  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};
`

const CountContainer = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 8px;
`

const CountText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.5);
`
