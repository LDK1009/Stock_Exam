import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { PostType } from '@/types/community/community'
import { formatDate } from '@/utils/time'
import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  post: PostType
}

const PostSection = ({ post }: PropsType) => {
  const { title, authorUid, createdAt, content } = post
  const [isContentExpanded, setIsContentExpanded] = useState(false)

  return (
    <Container contentContainerStyle={{ rowGap: 16 }}>
      {/* 제목 */}
      <Title>{title}</Title>
      {/* 헤더 */}
      <Header>
        {/* 작성자 */}
        <HeaderText>
          {authorUid?.slice(0, 6)}...{authorUid?.slice(-4)}
        </HeaderText>
        {/* 작성일 */}
        <HeaderText>{formatDate(new Date(createdAt || ''), '.')}</HeaderText>
      </Header>
      {/* 본문 */}
      <ContentArea>
        {/* 본문 */}
        <Content expanded={isContentExpanded}>{content}</Content>
        {/* 더보기 버튼 */}
        <ReadMoreButton onPress={() => setIsContentExpanded(!isContentExpanded)}>
          <LinearGradientContainer colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}>
              <ReadMoreButtonText>{isContentExpanded ? '접기' : '더보기'}</ReadMoreButtonText>
          </LinearGradientContainer>
        </ReadMoreButton>
      </ContentArea>
      {/* 댓글 */}
    </Container>
  )
}

export default PostSection

const Container = styled(ScrollView)`
  width: 100%;
`

const Title = styled(Text)`
  font-size: 20px;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const Header = styled(View)`
  ${mixinFlex('row', 'space-between', 'center')}
  width: 100%;
`

const HeaderText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`

type ContentProps = {
  expanded: boolean
}

const ContentArea = styled(View)`
  position: relative;
`

const Content = styled(Text)<ContentProps>`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};

  height: ${({ expanded }) => (expanded ? 'auto' : '300px')};
`

const ReadMoreButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}

  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 60px;

  /* filter: blur(4px); */
  /* -webkit-filter: blur(4px); */
`

const LinearGradientContainer = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  

`

const ReadMoreButtonText = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`
